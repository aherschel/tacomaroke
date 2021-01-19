import React from "react";
import { Button } from "react-bootstrap";
import { Party, partyClient } from "../api/PartyClient";
import SingerList from "./SingerList";

type PartyLobbyProps = {
  party: Party;
};

const PartyLobby = (props: PartyLobbyProps) => {
  const { party } = props;

  const startParty = async () => {
    await partyClient.startParty(party.id);
  };

  return (
    <>
      <br />
      <h3>Waiting to start {party.city}-roke</h3>
      <p>
        Once your party members have all joined, kick it off by clicking
        &lsquo;Start Party&rsquo; below.
      </p>
      <SingerList party={party} isVotingEnabled={false} />
      <Button onClick={startParty}>Start Party</Button>
    </>
  );
};

export default PartyLobby;
