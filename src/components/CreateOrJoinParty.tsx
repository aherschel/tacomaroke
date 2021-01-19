import { API, graphqlOperation } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { FormControl, InputGroup, Spinner } from "react-bootstrap";
import { Party, partyClient } from "../api/PartyClient";
import { onCreatePartySession } from "../graphql/subscriptions";
import CreateParty from "./CreateParty";
import JoinParty from "./JoinParty";

type CreateOrJoinPartyProps = {
  onEnterPartyLobby: (party: Party, isHost: boolean) => void;
};

const CreateOrJoinParty = (props: CreateOrJoinPartyProps) => {
  const { onEnterPartyLobby } = props;
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [parties, setParties] = useState<Party[]>([]);

  useEffect(() => {
    const loadParties = async () => {
      try {
        setLoading(true);
        const openParties = await partyClient.listParties();
        setParties(openParties);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    loadParties();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreatePartySession)
    ).subscribe({
      next: (data: any) => {
        const createdPartySession: Party = data.value.data.onCreatePartySession;
        setParties([...parties, createdPartySession]);
      },
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [parties]);

  const finalizeJoin = async (party: Party, isHost: boolean) => {
    try {
      setLoading(true);
      await partyClient.addSinger(party, name);
      onEnterPartyLobby(party, isHost);
    } catch (e) {
      console.error(`Error caught while adding singer: ${e.message}`);
      setLoading(false);
    }
  };

  const onPartyCreated = async (party: Party) => {
    return finalizeJoin(party, true);
  };

  const onPartyJoined = async (party: Party) => {
    return finalizeJoin(party, false);
  };

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };

  const areControlsDisabled = () => {
    return name.length < 3 || name.length > 18;
  };

  const spinner = (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  return (
    <>
      <br />
      <h3>Enter your name and select a party below, or create a new one.</h3>
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          minLength={3}
          maxLength={18}
          placeholder="Name"
          aria-label="Username"
          onChange={onNameChange}
          disabled={isLoading}
        />
      </InputGroup>
      {isLoading ? (
        spinner
      ) : (
        <>
          <CreateParty
            onCreateStarted={() => setLoading(true)}
            onCreateFailed={() => setLoading(false)}
            onPartyCreated={onPartyCreated}
            disabled={areControlsDisabled()}
          />
          <JoinParty
            onJoinStarted={() => setLoading(true)}
            onJoinFailed={() => setLoading(false)}
            onPartyJoined={onPartyJoined}
            disabled={areControlsDisabled()}
            parties={parties}
          />
        </>
      )}
    </>
  );
};

export default CreateOrJoinParty;
