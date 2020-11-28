import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AppHeader from "../AppHeader";

describe("AppHeader", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <AppHeader />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
