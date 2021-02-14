import React from "react";
import { Jumbotron } from "react-bootstrap";

const PageNotFoundPage = () => {
  return (
    <>
      <br />
      <Jumbotron>
        <h1>Page Not Found</h1>
        <p>
          The link you entered was invalid, and no page could be rendered. 
        </p>
      </Jumbotron>
    </>
  );
};

export default PageNotFoundPage;
