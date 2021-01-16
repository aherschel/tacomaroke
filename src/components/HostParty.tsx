import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Party, partyClient } from "../api/PartyClient";
import CreateParty from "./CreateParty";
import GenreController from "./GenreController";

const HostParty = () => {
  const [createdPartySession, setPartySession] = useState<Party | undefined>(
    undefined
  );
  const [isPartyStarted, setPartyStarted] = useState(false);

  useEffect(() => {
    // This seems to be incorrectly firing on start, which isn't the goal.
    // It doesn't cause any bugs yet, but should be looked at.
    return () => {
      if (createdPartySession) {
        partyClient.endParty(createdPartySession.id);
      }
    };
  });

  const onPartyCreated = (partySession: Party) => {
    console.log(`Party Created ${JSON.stringify(partySession)}`);
    setPartySession(partySession);
  };

  const onStartClicked = async (partySession: Party) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await partyClient.startParty(partySession.id!!);
    setPartyStarted(true);
  };

  if (!createdPartySession) {
    return <CreateParty onPartyCreated={onPartyCreated} />;
  }

  if (!isPartyStarted) {
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
  return (
    <>
      <br />
      <h3>Started party {createdPartySession.city}-roke</h3>
      <p>The genres you select below will be visible to all party members.</p>
      <GenreController isController remoteParty={createdPartySession} />
    </>
  );
};

export default HostParty;
