import React, { useState } from "react";
import { Jumbotron, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import {
  GenrePicker,
  GenreRandomizer,
  GenreHistory,
  SongSuggestions,
} from "../components";
import { genres, Genre } from "../genres";

const SongPage = () => {
  const [currentGenre, setCurrentGenre] = useState<Genre | undefined>();
  const [genreHistory, setGenreHistory] = useState<Genre[]>([]);

  const onGenreUpdated = (genre: Genre) => {
    if (currentGenre) {
      setGenreHistory(genreHistory.concat(currentGenre));
    }
    setCurrentGenre(genre);
  };

  return (
    <>
      <br />
      <Jumbotron>
        <h1>Pick A Song</h1>
        <p>Pick a category using the tool below.</p>
      </Jumbotron>
      <Container fluid>
        <Row>
          <Col>
            <Tabs defaultActiveKey="random" id="genre-selection-mode">
              <Tab eventKey="random" title="Random">
                <br />
                <GenreRandomizer
                  genres={genres}
                  genre={currentGenre}
                  onGenreUpdated={onGenreUpdated}
                />
              </Tab>
              <Tab eventKey="selection" title="Selection">
                <br />
                <GenrePicker
                  genres={genres}
                  onGenreUpdated={onGenreUpdated}
                />
              </Tab>
            </Tabs>
            <GenreHistory genreHistory={genreHistory} />
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

export default SongPage;
