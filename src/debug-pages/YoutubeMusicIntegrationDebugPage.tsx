import React from "react";
import { Jumbotron } from "react-bootstrap";

const YoutubeMusicIntegrationDebugPage = () => {
  return (
    <>
      <br />
      <Jumbotron>
        <h1>
          <img
            alt="youtube music logo"
            width="60"
            height="60"
            src="https://user-images.githubusercontent.com/868109/63057127-5d3e8780-be9e-11e9-9488-bf280a5ff1ed.png"
          />{" "}
          Youtube Music Test Integration
        </h1>
        <p>
          This page is a test harness to test integration with the youtube music
          playlist and playback apis.
        </p>
      </Jumbotron>
    </>
  );
};

export default YoutubeMusicIntegrationDebugPage;
