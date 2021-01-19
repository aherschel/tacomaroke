import React from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Analytics } from "aws-amplify";
import { genres, Genre } from "../api/genres";
import { Party, partyClient, Round } from "../api/PartyClient";
import GenreRandomizer from "./GenreRandomizer";
import GenrePicker from "./GenrePicker";
import GenreHistory from "./GenreHistory";
import SongSuggestions from "./SongSuggestions";
import genreClient from "../api/GenreClient";

const getCurrentGenreFromRounds = (rounds?: Round[]): Genre | undefined => {
  if (rounds && rounds.length > 0) {
    return genreClient.getGenreByCode(rounds[0].genreCode);
  }
  return undefined;
};

const getGenreHistoryFromRounds = (rounds?: Round[]): Genre[] => {
  if (rounds) {
    return rounds
      .slice(1)
      .map((round) => genreClient.getGenreByCode(round.genreCode));
  }
  return [];
};

type GenreControllerProps = {
  isController: boolean;
  party: Party;
};

const GenreController = (props: GenreControllerProps) => {
  const { isController, party } = props;

  const onGenreUpdated = async (genre: Genre, wasManual: boolean) => {
    Analytics.record({
      name: wasManual ? "genreSelected" : "genreRandomized",
      attributes: { genreName: genre.name },
    });
    const updatedRounds: Round[] = party.rounds
      ? [{ genreCode: genre.name }, ...party.rounds]
      : [{ genreCode: genre.name }];
    await partyClient.updateRounds(party.id, updatedRounds);
  };

  const currentGenre = getCurrentGenreFromRounds(party.rounds);
  const genreHistory = getGenreHistoryFromRounds(party.rounds);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            {isController && (
              <Tabs defaultActiveKey="random" id="genre-selection-mode">
                <Tab eventKey="random" title="Random">
                  <br />
                  <GenreRandomizer
                    genres={genres}
                    onGenreUpdated={(genre) => onGenreUpdated(genre, false)}
                  />
                </Tab>
                <Tab eventKey="selection" title="Selection">
                  <br />
                  <GenrePicker
                    genres={genres}
                    onGenreUpdated={(genre) => onGenreUpdated(genre, true)}
                  />
                </Tab>
              </Tabs>
            )}
            <GenreHistory
              currentGenre={currentGenre}
              genreHistory={genreHistory}
            />
          </Col>
          {currentGenre && (
            <Col>
              <SongSuggestions genre={currentGenre} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default GenreController;
