import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { partyClient, Singer } from "../api/PartyClient";
import { onUpdateSingerById } from "../graphql/subscriptions";

interface VoteInputProps {
  singer: Singer;
}

const VoteInput = (props: VoteInputProps) => {
  const { singer: singerIn } = props;
  const [singer, setSinger] = useState(singerIn);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateSingerById, {
        id: singer.id,
      })
    ).subscribe({
      next: (data: any) => {
        const updatedSinger = data.value.data.onUpdateSingerById;
        setSinger(updatedSinger);
      },
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [singer.id]);

  return (
    <span>
      <Button
        className="rounded-pill"
        variant="secondary"
        size="sm"
        onClick={() => partyClient.addVote(singer)}
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
        onClick={() => partyClient.addHeart(singer)}
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
