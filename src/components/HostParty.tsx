import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { endParty, Party, startParty } from "../api/PartyClient";
import CreateParty from "./CreateParty";
import GenreController from "./GenreController";

const HostParty = () => {
  const [createdPartySession, setPartySession] = useState<Party | undefined>(
    undefined
  );
  const [isPartyStarted, setPartyStarted] = useState(false);

  useEffect(() => {
    return () => {
      if (createdPartySession) {
        endParty(createdPartySession.id);
      }
    };
  });

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
        <br />
        <h3>Created Party {createdPartySession.city}-roke</h3>
        <p>
          Once your party members have all joined, kick it off by clicking
          &lsquo;Start Party!&rsquo; below.
        </p>
        <Button onClick={() => onStartClicked(createdPartySession)}>
          Start Party!
        </Button>
      </>
    );
  }

  if (createdPartySession && isPartyStarted) {
    return (
      <>
        <br />
        <h3>Started party {createdPartySession.city}-roke</h3>
        <p>The genres you select below will be visible to all party members.</p>
        <GenreController isController remoteParty={createdPartySession} />
      </>
    );
  }

  return <CreateParty onPartyCreated={onPartyCreated} />;
};

export default HostParty;
