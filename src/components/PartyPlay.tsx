import React from "react";
import { Party } from "../api/PartyClient";
import RemoteGenreController from "./RemoteGenreController";
import SingerList from "./SingerList";

type PartyPlayProps = {
  party: Party;
  isHost: boolean;
};

const PartyPlay = (props: PartyPlayProps) => {
  const { party, isHost } = props;

  return (
    <>
      <br />
      <h3>Started party {party.city}-roke</h3>
      <p>The genres you select below will be visible to all party members.</p>
      <SingerList party={party} isVotingEnabled />
      <RemoteGenreController isController={isHost} party={party} />
    </>
  );
};

export default PartyPlay;
