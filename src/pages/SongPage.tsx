import React, { useState } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import { GenrePicker, GenreHistory, SongSuggestions } from "../components";
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
            <GenrePicker
              genres={genres}
              genre={currentGenre}
              onGenreUpdated={onGenreUpdated}
            />
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
