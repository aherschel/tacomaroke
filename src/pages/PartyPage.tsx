import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { SessionState } from "../API";
import { Party, partyClient } from "../api/PartyClient";
import CreateOrJoinParty from "../components/CreateOrJoinParty";
import PartyLobby from "../components/PartyLobby";
import PartyPlay from "../components/PartyPlay";
import { onUpdatePartySessionById } from "../graphql/subscriptions";

const PartyPage = () => {
  const [partyId, setPartyId] = useState<string | undefined>();
  const [party, setParty] = useState<Party | undefined>();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const loadParty = async (updatedPartyId: string) => {
      const loadedParty = await partyClient.getPartyById(updatedPartyId);
      setParty(loadedParty);
    };

    if (partyId) {
      loadParty(partyId);

      const subscription = API.graphql(
        graphqlOperation(onUpdatePartySessionById, { id: partyId })
      ).subscribe({
        next: (data: any) => {
          const updatedParty = data.value.data.onUpdatePartySessionById;
          setParty(updatedParty);
        },
      });

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
    return undefined;
  }, [partyId]);

  const onEnterPartyLobby = (newParty: Party, newIsHost: boolean) => {
    setPartyId(newParty.id);
    setIsHost(newIsHost);
  };

  const restartButton = (
    <>
      <br />
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            onClick={() => {
              setPartyId(undefined);
              setParty(undefined);
            }}
          >
            Start Over
          </Button>
        </Col>
      </Row>
    </>
  );

  const restartAndEndButtons = (
    <>
      <br />
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            onClick={() => {
              setPartyId(undefined);
              setParty(undefined);
            }}
          >
            Start Over
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-primary"
            onClick={() => {
              partyClient.endParty(party!!);
            }}
          >
            End Party
          </Button>
        </Col>
      </Row>
    </>
  );

  if (!party) {
    return (
      <Container fluid>
        <CreateOrJoinParty onEnterPartyLobby={onEnterPartyLobby} />
      </Container>
    );
  }

  switch (party.sessionState) {
    case SessionState.CREATING:
      return (
        <Container fluid>
          {restartButton}
          <PartyLobby party={party} />
        </Container>
      );
    case SessionState.INPROGRESS:
      return (
        <Container fluid>
          {restartAndEndButtons}
          <PartyPlay party={party} isHost={isHost} />
        </Container>
      );
    case SessionState.ENDED:
      return (
        <Container fluid>
          {restartButton}
          <h3>Thank you for playing!</h3>
        </Container>
      );
    default:
      return <div />;
  }
};

export default PartyPage;
