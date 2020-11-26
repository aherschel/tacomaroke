import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Party, startParty } from "../api/PartyClient";
import CreateParty from "./CreateParty";
import GenreController from "./GenreController";

const HostParty = () => {
  const [createdPartySession, setPartySession] = useState<Party | undefined>(
    undefined
  );
  const [isPartyStarted, setPartyStarted] = useState(false);

  const onPartyCreated = (partySession: Party) => {
    console.log(`Party Created ${JSON.stringify(partySession)}`);
    setPartySession(partySession);
  };

  const onStartClicked = async (partySession: Party) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await startParty(partySession.id!!);
    setPartyStarted(true);
  };

  if (createdPartySession && !isPartyStarted) {
    return (
      <>
        <h5>Created party {createdPartySession.city}-roke</h5>
        <Button onClick={() => onStartClicked(createdPartySession)}>
          Start Party!
        </Button>
      </>
    );
  }

  if (createdPartySession && isPartyStarted) {
    return (
      <>
        <h5>Started party {createdPartySession.city}-roke</h5>
        <GenreController isController remoteParty={createdPartySession} />
      </>
    );
  }

  return <CreateParty onPartyCreated={onPartyCreated} />;
};

export default HostParty;
