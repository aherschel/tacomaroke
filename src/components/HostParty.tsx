import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Party, partyClient } from "../api/PartyClient";
import CreateParty from "./CreateParty";
import GenreController from "./GenreController";
import SingerList from "./SingerList";

const HostParty = () => {
  const [createdPartySession, setPartySession] = useState<Party | undefined>(
    undefined
  );
  const [name, setName] = useState("");
  const [isPartyStarted, setPartyStarted] = useState(false);

  const onPartyCreated = (partySession: Party) => {
    setPartySession(partySession);
  };

  const onStartClicked = async (partySession: Party) => {
    await partyClient.addSinger(partySession.id, name);
    await partyClient.startParty(partySession.id);
    setPartyStarted(true);
  };

  const onNameChange = (event: any) => {
    setName(event.target.value);
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
        <SingerList partySessionID={createdPartySession.id} />
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
        <Button
          onClick={() => onStartClicked(createdPartySession)}
          disabled={name.length < 3 || name.length > 18}
        >
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
      <SingerList partySessionID={createdPartySession.id} />
      <GenreController isController remoteParty={createdPartySession} />
    </>
  );
};

export default HostParty;
