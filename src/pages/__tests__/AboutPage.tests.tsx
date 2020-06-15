import React from "react";
import ReactDOM from "react-dom";
import { AboutPage } from "..";

describe("AboutPage", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AboutPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
