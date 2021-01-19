import React from "react";
import { Badge, Button } from "react-bootstrap";
import { partyClient, Party, Singer } from "../api/PartyClient";

interface VoteInputProps {
  party: Party;
  singer: Singer;
}

const VoteInput = (props: VoteInputProps) => {
  const { party, singer } = props;

  return (
    <span>
      <Button
        className="rounded-pill"
        variant="secondary"
        size="sm"
        onClick={() => partyClient.addVote(party, singer)}
      >
        <span role="img" aria-label="add-heart">
          🗳️
        </span>{" "}
        {singer.votes > 0 && (
          <Badge pill variant="light">
            {singer.votes}
          </Badge>
        )}
      </Button>{" "}
      <Button
        className="rounded-pill"
        variant="secondary"
        size="sm"
        onClick={() => partyClient.addHeart(party, singer)}
      >
        <span role="img" aria-label="add-heart">
          ❤️
        </span>{" "}
        {singer.hearts > 0 && (
          <Badge pill variant="light">
            {singer.hearts}
          </Badge>
        )}
      </Button>
    </span>
  );
};

export default VoteInput;
