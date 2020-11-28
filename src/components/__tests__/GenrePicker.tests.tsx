import React from "react";
import ReactDOM from "react-dom";
import GenrePicker from "../GenrePicker";

describe("GenrePicker", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GenrePicker genres={[]} onGenreUpdated={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
