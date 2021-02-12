import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { SessionState } from "../API";
import { Party, partyClient } from "../api/PartyClient";
import PartyLobby from "../components/PartyLobby";
import PartyPlay from "../components/PartyPlay";
import { onUpdatePartySessionById } from "../graphql/subscriptions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PartyPage = () => {
  const { partyId } = useParams<{ partyId: string }>();
  const query = useQuery();
  const [party, setParty] = useState<Party | undefined>();
  const history = useHistory();

  const isHost = query.get("isHost") === "true";

  useEffect(() => {
    const loadParty = async (updatedPartyId: string) => {
      const loadedParty = await partyClient.getPartyById(updatedPartyId);
      setParty(loadedParty);
    };

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
  }, [partyId]);

  const restartButton = (
    <>
      <br />
      <Row>
        <Col>
          <Button
            variant="outline-primary"
            onClick={() => {
              history.push("/");
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
              history.push("/");
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
    return <div />;
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
