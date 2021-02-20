import React, { useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Analytics } from "aws-amplify";
import { genres, GenreConfig } from "../api/lastFmStaticGenres";
import GenreRandomizer from "./GenreRandomizer";
import GenrePicker from "./GenrePicker";
import GenreHistory from "./GenreHistory";
import SongSuggestions from "./SongSuggestions";

const GenreController = () => {
  const [currentGenre, setCurrentGenre] = useState<GenreConfig | undefined>();
  const [genreHistory, setGenreHistory] = useState<GenreConfig[]>([]);

  const onGenreUpdated = async (genre: GenreConfig, wasManual: boolean) => {
    Analytics.record({
      name: wasManual ? "genreSelected" : "genreRandomized",
      attributes: { genreName: genre.name },
    });
    if (currentGenre) {
      setGenreHistory(genreHistory.concat(currentGenre));
    }
    setCurrentGenre(genre);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
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
