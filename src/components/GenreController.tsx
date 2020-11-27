import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Analytics, API, graphqlOperation } from "aws-amplify";
import { GenrePicker, GenreRandomizer, GenreHistory, SongSuggestions } from ".";
import { genres, Genre, getGenreByCode } from "../genres";
import { Party, updateGenre } from "../api/PartyClient";
import { onUpdatePartySession } from "../graphql/subscriptions";

type GenreControllerProps = {
  isController: boolean;
  remoteParty: Party | undefined;
};

const GenreController = (props: GenreControllerProps) => {
  const { isController, remoteParty } = props;
  const [currentGenre, setCurrentGenre] = useState<Genre | undefined>();
  const [genreHistory, setGenreHistory] = useState<Genre[]>([]);

  useEffect(() => {
    if (remoteParty && !isController) {
      const subscription = API.graphql(
        graphqlOperation(onUpdatePartySession)
      ).subscribe({
        next: (data: any) => {
          const updatedPartySession = data.value.data.onUpdatePartySession;
          if (
            updatedPartySession.id === remoteParty.id &&
            updatedPartySession.genreCode
          ) {
            const genre = getGenreByCode(updatedPartySession.genreCode);
            if (currentGenre) {
              setGenreHistory(genreHistory.concat(currentGenre));
            }
            setCurrentGenre(genre);
          }
        },
      });

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
    return undefined;
  }, [remoteParty, isController, currentGenre, genreHistory]);

  const onGenreUpdated = async (
    genre: Genre,
    wasManual: boolean,
    recordMetrics: boolean
  ) => {
    if (recordMetrics) {
      Analytics.record({
        name: wasManual ? "genreSelected" : "genreRandomized",
        attributes: { genreName: genre.name },
      });
    }
    if (currentGenre) {
      setGenreHistory(genreHistory.concat(currentGenre));
    }
    if (remoteParty) {
      await updateGenre(remoteParty.id!!, genre.name);
    }
    setCurrentGenre(genre);
  };

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
                    onGenreUpdated={(genre) =>
                      onGenreUpdated(genre, false, true)
                    }
                  />
                </Tab>
                <Tab eventKey="selection" title="Selection">
                  <br />
                  <GenrePicker
                    genres={genres}
                    onGenreUpdated={(genre) =>
                      onGenreUpdated(genre, true, true)
                    }
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
