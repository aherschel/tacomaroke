import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Party } from "../api/PartyClient";
import CreateOrJoinParty from "../components/CreateOrJoinParty";

const PartyLobbyPage = () => {
  const history = useHistory();

  const onEnterPartyLobby = (newParty: Party, isHost: boolean) => {
    history.push(
      isHost ? `/party/${newParty.id}?isHost=true` : `/party/${newParty.id}`
    );
  };

  return (
    <Container fluid>
      <CreateOrJoinParty onEnterPartyLobby={onEnterPartyLobby} />
    </Container>
  );
};

export default PartyLobbyPage;
