import React, { useState } from "react";
import {
  Collapse,
  Jumbotron,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import HostParty from "../components/HostParty";
import JoinParty from "../components/JoinParty";

type PartyState = "NotStarted" | "Host" | "Attendee";

const PartyPage = () => {
  const [partyState, setPartyState] = useState<PartyState>("NotStarted");
  const [hasStarted, setStarted] = useState(false);

  const setState = (state: PartyState) => {
    setPartyState(state);
    setStarted(true);
  };

  let partyView = <div />;

  if (partyState === "NotStarted") {
    partyView = (
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
  } else if (partyState === "Host") {
    partyView = (
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
  } else if (partyState === "Attendee") {
    partyView = (
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
  }

  return (
    <>
      <br />
      <Collapse in={!hasStarted}>
        <Jumbotron>
          <h1>Party Play</h1>
          <p>Either Start or join a party!</p>
        </Jumbotron>
      </Collapse>
      {partyView}
    </>
  );
};

export default PartyPage;
