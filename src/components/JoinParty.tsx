import React, { useState } from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { Party, joinParty } from "../api/PartyClient";

type ComponentState = "NotStarted" | "Joining" | "Joined" | "Failed";

const JoinParty = () => {
  const [partyName, setPartyName] = useState("");
  const [joinedParty, setJoinedParty] = useState<Party | undefined>();
  const [componentState, setState] = useState<ComponentState>("NotStarted");

  const handlePartyNameChange = (event: any) => {
    setPartyName(event.target.value);
  };

  const join = async () => {
    setState("Joining");
    try {
      const party = await joinParty(partyName);
      setJoinedParty(party);
      setState("Joined");
    } catch (e) {
      setState("Failed");
    }
  };

  switch (componentState) {
    case "NotStarted":
      return (
        <>
          <Row>
            <Col />
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Party Id"
                  aria-label="PartyId"
                  aria-describedby="basic-addon1"
                  onChange={handlePartyNameChange}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">-roke</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col>
              <Button variant="outline-primary" onClick={join}>
                Join
              </Button>
            </Col>
            <Col />
          </Row>
        </>
      );
    case "Joining":
      return <p>Joining {partyName}</p>;
    case "Joined":
      return <p>Joined {joinedParty!!.name}</p>;
    case "Failed":
      return <p>Failed to join party with name {partyName}</p>;
    default:
      return <div />;
  }
};

export default JoinParty;
