import React from "react";
import { Jumbotron } from "react-bootstrap";
import { GenrePicker } from "../components";

const SongPage = () => {
  return (
    <>
      <br />
      <Jumbotron>
        <h1>Pick A Song</h1>
        <p>Pick a category using the tool below.</p>
      </Jumbotron>
      <GenrePicker />
    </>
  );
};

export default SongPage;
