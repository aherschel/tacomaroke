import React, { useState } from "react";
import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import { JoinParty, HostParty } from "../components";

type PartyState = "NotStarted" | "Host" | "Attendee";

const PartyPage = () => {
  const [partyState, setPartyState] = useState<PartyState>("NotStarted");

  return (
    <>
      <br />
      <Jumbotron>
        <h1>Party Play</h1>
        <p>Either Start or join a party!</p>
      </Jumbotron>
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
                        setPartyState("Host");
                      }}
                    >
                      Start Party
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setPartyState("Attendee");
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
            return <HostParty />;
          case "Attendee":
            return <JoinParty />;
          default:
            return <div />;
        }
      })()}
    </>
  );
};

export default PartyPage;
