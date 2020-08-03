import React from "react";
import ReactDOM from "react-dom";
import { SongPage } from "..";

describe("SongPage", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SongPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
