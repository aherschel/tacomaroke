import React from "react";
import ReactDOM from "react-dom";
import { SongSuggestions } from "..";

describe("SongSuggestions", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SongSuggestions genre={{ name: "Test" }} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
