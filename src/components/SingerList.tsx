import React from "react";
import { Party } from "../api/PartyClient";
import VoteInput from "./VoteInput";

interface SingerListProps {
  party: Party;
  isVotingEnabled: boolean;
}

const SingerList = (props: SingerListProps) => {
  const { party, isVotingEnabled } = props;

  if (!party.singers) {
    return null;
  }

  return (
    <div>
      <h3>Singers</h3>
      <ul>
        {party.singers.map((singer) => (
          <li key={singer.name}>
            {singer.name}{" "}
            {isVotingEnabled && <VoteInput party={party} singer={singer} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingerList;
