import React from "react";
import { Party, partyClient } from "../api/PartyClient";
import PartyList from "./PartyList";

type JoinPartyProps = {
  onJoinStarted: () => void;
  onJoinFailed: () => void;
  onPartyJoined: (joinedParty: Party) => void;
  disabled: boolean;
  parties: Party[];
};

const JoinParty = (props: JoinPartyProps) => {
  const {
    onJoinStarted,
    onJoinFailed,
    onPartyJoined,
    disabled,
    parties,
  } = props;

  const onPartySelected = async (newlySelectedParty: Party) => {
    onJoinStarted();
    try {
      const party = await partyClient.getPartyById(newlySelectedParty.id);
      onPartyJoined(party);
    } catch (e) {
      console.error(
        `Failed to join party ${newlySelectedParty.city}-roke, caught: ${e.message}`
      );
      onJoinFailed();
    }
  };

  return (
    <>
      <br />
      <PartyList
        parties={parties}
        onPartySelected={onPartySelected}
        disabled={disabled}
      />
    </>
  );
};

export default JoinParty;
