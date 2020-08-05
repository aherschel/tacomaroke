import React from "react";
import ReactDOM from "react-dom";
import { GenreHistory } from "..";

describe("GenreHistory", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GenreHistory genreHistory={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
