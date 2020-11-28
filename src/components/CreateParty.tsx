import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { partyClient, Party } from "../api/PartyClient";

interface CreatePartyProps {
  onPartyCreated: (party: Party) => void;
}

const CreateParty = (props: CreatePartyProps) => {
  const { onPartyCreated } = props;
  const [creationInProgress, setSucceeded] = useState(true);

  useEffect(() => {
    const generateParty = async () => {
      try {
        const partySession = await partyClient.createParty();
        onPartyCreated(partySession);
      } catch (e) {
        console.error(`Caught error creating party: ${JSON.stringify(e)}`);
        setSucceeded(false);
      }
    };
    generateParty();
  }, [onPartyCreated]);

  if (creationInProgress) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return <p>Failed to create a party.</p>;
};

export default CreateParty;
