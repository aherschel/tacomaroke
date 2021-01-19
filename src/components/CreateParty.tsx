import React from "react";
import { Button } from "react-bootstrap";
import { Party, partyClient } from "../api/PartyClient";

interface CreatePartyProps {
  onCreateStarted: () => void;
  onCreateFailed: () => void;
  onPartyCreated: (party: Party) => void;
  disabled: boolean;
}

const CreateParty = (props: CreatePartyProps) => {
  const { onCreateStarted, onCreateFailed, onPartyCreated, disabled } = props;

  const createParty = async () => {
    try {
      onCreateStarted();
      const party = await partyClient.createParty();
      onPartyCreated(party);
    } catch (e) {
      console.error(`Caught error creating party: ${JSON.stringify(e)}`);
      onCreateFailed();
    }
  };

  return (
    <Button onClick={createParty} disabled={disabled}>
      Create new party
    </Button>
  );
};

export default CreateParty;
