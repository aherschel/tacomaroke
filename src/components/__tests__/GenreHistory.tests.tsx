import React from "react";
import ReactDOM from "react-dom";
import GenreHistory from "../GenreHistory";

describe("GenreHistory", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <GenreHistory currentGenre={undefined} genreHistory={[]} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
