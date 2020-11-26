import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { joinParty, listParties, Party } from "../api/PartyClient";
import { isPartyListEnabled } from "../FeatureFlags";
import { onCreatePartySession } from "../graphql/subscriptions";
import GenreController from "./GenreController";

type ComponentState = "NotStarted" | "Joining" | "Joined" | "Failed";

const JoinParty = () => {
  const [partyName, setPartyName] = useState("");
  const [joinedParty, setJoinedParty] = useState<Party | undefined>();
  const [componentState, setState] = useState<ComponentState>("NotStarted");
  const [openParties, setOpenParties] = useState<Party[] | undefined>();

  useEffect(() => {
    const loadParties = async () => {
      const parties = await listParties();
      setOpenParties(parties);
    };
    loadParties();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreatePartySession)
    ).subscribe({
      next: (data: any) => {
        const createdPartySession: Party = data.value.data.onCreatePartySession;
        if (openParties) {
          setOpenParties([...openParties, createdPartySession]);
        }
      },
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [openParties]);

  const handlePartyNameChange = (event: any) => {
    setPartyName(event.target.value);
  };

  const join = async () => {
    setState("Joining");
    try {
      const party = await joinParty(partyName);
      console.log(`Joined party: ${JSON.stringify(party)}`);
      setJoinedParty(party);
      setState("Joined");
    } catch (e) {
      console.error(`Failed to join party ${partyName}, caught: ${e.message}`);
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
          {isPartyListEnabled && openParties && (
            <Row>
              <Col>
                <ul>
                  {openParties.map((party) => (
                    <h5>{JSON.stringify(party)}</h5>
                  ))}
                </ul>
              </Col>
            </Row>
          )}
        </>
      );
    case "Joining":
      return <p>Joining {partyName}</p>;
    case "Joined":
      return (
        <>
          <h5>Joined {joinedParty!!.city}-roke</h5>
          <GenreController isController={false} remoteParty={joinedParty} />
        </>
      );
    case "Failed":
      return <p>Failed to join party with name {partyName}</p>;
    default:
      return <div />;
  }
};

export default JoinParty;
