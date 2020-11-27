import React, { useState } from "react";
import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import { JoinParty, HostParty } from "../components";

type PartyState = "NotStarted" | "Host" | "Attendee";

const PartyPage = () => {
  const [partyState, setPartyState] = useState<PartyState>("NotStarted");
  const [hasStarted, setStarted] = useState(false);

  const setState = (state: PartyState) => {
    setPartyState(state);
    setStarted(true);
  };

  return (
    <>
      <br />
      {!hasStarted && (
        <Jumbotron>
          <h1>Party Play</h1>
          <p>Either Start or join a party!</p>
        </Jumbotron>
      )}
      {(function () {
        switch (partyState) {
          case "NotStarted":
            return (
              <Container fluid>
                <Row>
                  <Col />
                  <Col>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setState("Host");
                      }}
                    >
                      Start Party
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setState("Attendee");
                      }}
                    >
                      Join Party
                    </Button>
                  </Col>
                  <Col />
                </Row>
              </Container>
            );
          case "Host":
            return (
              <>
                <Container fluid>
                  <Row>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setState("NotStarted");
                      }}
                    >
                      Start Over
                    </Button>
                  </Row>
                </Container>
                <HostParty />
              </>
            );
          case "Attendee":
            return (
              <>
                <Container fluid>
                  <Row>
                    <Col>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setState("NotStarted");
                        }}
                      >
                        Start Over
                      </Button>
                    </Col>
                  </Row>
                </Container>
                <JoinParty />
              </>
            );
          default:
            return <div />;
        }
      })()}
    </>
  );
};

export default PartyPage;
