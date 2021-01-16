import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { ListSingersQueryVariables } from "../API";
import { Singer } from "../api/PartyClient";
import { listSingers } from "../graphql/queries";
import { onCreateSingerByPartySessionId } from "../graphql/subscriptions";

interface SingerListProps {
  partySessionID: string | undefined;
}

const SingerList = (props: SingerListProps) => {
  const { partySessionID } = props;
  const [singers, setSingers] = useState<Singer[] | undefined>();

  useEffect(() => {
    const loadSingers = async () => {
      const query: ListSingersQueryVariables = {
        filter: { partysessionID: { eq: partySessionID } },
      };
      const response = await API.graphql(graphqlOperation(listSingers, query));
      setSingers(response.data.listSingers.items);
    };
    loadSingers();
  }, [partySessionID]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateSingerByPartySessionId, {
        partysessionID: partySessionID,
      })
    ).subscribe({
      next: (data: any) => {
        const singer = data.value.data.onCreateSingerByPartySessionId;
        if (singers) {
          setSingers([...singers, singer]);
        } else {
          setSingers([singer]);
        }
      },
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [partySessionID, singers]);

  if (singers) {
    return (
      <div>
        <h3>Singers</h3>
        <ol>
          {singers.map((singer) => (
            <li key={singer.id}>{singer.name}</li>
          ))}
        </ol>
      </div>
    );
  }

  return null;
};

export default SingerList;
