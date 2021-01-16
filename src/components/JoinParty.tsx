import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import { Party, partyClient } from "../api/PartyClient";
import { isPartyListEnabled } from "../FeatureFlags";
import { onCreatePartySession } from "../graphql/subscriptions";
import GenreController from "./GenreController";
import PartyList from "./PartyList";

type ComponentState = "NotStarted" | "Joining" | "Joined" | "Failed";

const JoinParty = () => {
  const [partyName, setPartyName] = useState("");
  const [joinedParty, setJoinedParty] = useState<Party | undefined>();
  const [componentState, setState] = useState<ComponentState>("NotStarted");
  const [isLoading, setLoading] = useState(true);
  const [openParties, setOpenParties] = useState<Party[] | undefined>();
  const [name, setName] = useState("");

  useEffect(() => {
    const loadParties = async () => {
      try {
        const parties = await partyClient.listParties();
        setOpenParties(parties);
      } finally {
        setLoading(false);
      }
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
      const party = await partyClient.joinPartyByName(partyName);
      console.log(`Joined party: ${JSON.stringify(party)}`);
      setJoinedParty(party);
      setState("Joined");
    } catch (e) {
      console.error(`Failed to join party ${partyName}, caught: ${e.message}`);
      setState("Failed");
    }
  };

  const onPartySelected = async (partyId: string) => {
    setState("Joining");
    try {
      await partyClient.addSinger(partyId, name);
      const party = await partyClient.joinPartyById(partyId);
      console.log(`Joined party: ${JSON.stringify(party)}`);
      setJoinedParty(party);
      setState("Joined");
    } catch (e) {
      console.error(`Failed to join party ${partyName}, caught: ${e.message}`);
      setState("Failed");
    }
  };

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (!openParties) {
    return <p>Failed to load parties.</p>;
  }

  switch (componentState) {
    case "NotStarted":
      return (
        <>
          {!isPartyListEnabled && (
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
          )}
          {isPartyListEnabled && (
            <>
              <br />
              <h3>Select a party to join below.</h3>
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  minLength={3}
                  maxLength={18}
                  placeholder="Name"
                  aria-label="Username"
                  onChange={onNameChange}
                />
              </InputGroup>
              <PartyList
                parties={openParties}
                onPartySelected={onPartySelected}
                disabled={name.length < 3 || name.length > 18}
              />
            </>
          )}
        </>
      );
    case "Joining":
      return (
        <>
          <br />
          <h3>Joining {partyName}-roke</h3>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </>
      );
    case "Joined":
      return (
        <>
          <br />
          <h3>Joined {joinedParty!!.city}-roke</h3>
          <p>
            The party creator will be able to select new genres, which will show
            up below.
          </p>
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
