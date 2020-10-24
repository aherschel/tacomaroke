import React from "react";
import { Jumbotron } from "react-bootstrap";
import { GenreController } from "../components";

const SongPage = () => {
  return (
    <>
      <br />
      <Jumbotron>
        <h1>Pick A Song</h1>
        <p>Pick a category using the tool below.</p>
      </Jumbotron>
      <GenreController />
    </>
  );
};

export default SongPage;
