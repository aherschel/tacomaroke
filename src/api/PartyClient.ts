import { API, graphqlOperation } from "aws-amplify";
import {
  CreatePartySessionMutationVariables,
  GetPartySessionQueryVariables,
  ListPartySessionsQueryVariables,
  SessionState,
  UpdatePartySessionMutationVariables,
} from "../API";
import { createPartySession, updatePartySession } from "../graphql/mutations";
import { getPartySession, listPartySessions } from "../graphql/queries";
import cities from "./cities";

export type Singer = {
  name: string;
  hearts: number;
  votes: number;
};

export type Round = {
  genreCode: string;
};

export type Party = {
  id: string;
  city: string;
  sessionStartTime: string;
  sessionState: SessionState;
  rounds?: Round[];
  singers?: Singer[];
};

class PartyClient {
  listParties = async (): Promise<Party[]> => {
    const query: ListPartySessionsQueryVariables = {
      filter: { sessionState: { eq: SessionState.CREATING } },
    };
    const response = await API.graphql(
      graphqlOperation(listPartySessions, query)
    );
    return response.data.listPartySessions.items;
  };

  addSinger = async (party: Party, name: string): Promise<Party> => {
    const singers = party.singers
      ? [...party.singers, { name, votes: 0, hearts: 0 }]
      : [{ name, votes: 0, hearts: 0 }];
    const mutation: UpdatePartySessionMutationVariables = {
      input: {
        id: party.id,
        singers,
      },
    };
    const response = await API.graphql(
      graphqlOperation(updatePartySession, mutation)
    );
    return response.data.createSinger;
  };

  addHeart = async (party: Party, singer: Singer): Promise<void> => {
    if (!party.singers) {
      return;
    }
    const singers = party.singers.map((tempSinger) =>
      tempSinger.name === singer.name
        ? {
            name: tempSinger.name,
            hearts: tempSinger.hearts + 1,
            votes: tempSinger.votes,
          }
        : tempSinger
    );
    const mutation: UpdatePartySessionMutationVariables = {
      input: {
        id: party.id,
        singers,
      },
    };
    try {
      await API.graphql(graphqlOperation(updatePartySession, mutation));
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  };

  addVote = async (party: Party, singer: Singer): Promise<void> => {
    if (!party.singers) {
      return;
    }
    const singers = party.singers.map((tempSinger) =>
      tempSinger.name === singer.name
        ? {
            name: tempSinger.name,
            hearts: tempSinger.hearts,
            votes: tempSinger.votes + 1,
          }
        : tempSinger
    );
    const mutation: UpdatePartySessionMutationVariables = {
      input: {
        id: party.id,
        singers,
      },
    };
    try {
      await API.graphql(graphqlOperation(updatePartySession, mutation));
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  };

  createParty = async (): Promise<Party> => {
    const mutation: CreatePartySessionMutationVariables = {
      input: {
        city: this.getRandomCity(),
        sessionStartTime: new Date().toISOString(),
        sessionState: SessionState.CREATING,
        rounds: [],
        expirationTimestamp: Math.round(Date.now() / 1000) + 60 * 60,
      },
    };
    const response = await API.graphql(
      graphqlOperation(createPartySession, mutation)
    );
    return response.data.createPartySession;
  };

  startParty = async (partyId: string): Promise<void> => {
    const mutation: UpdatePartySessionMutationVariables = {
      input: {
        id: partyId,
        sessionState: SessionState.INPROGRESS,
      },
      condition: {
        sessionState: { eq: SessionState.CREATING },
      },
    };
    await API.graphql(graphqlOperation(updatePartySession, mutation));
  };

  endParty = async (party: Party): Promise<void> => {
    const mutation: UpdatePartySessionMutationVariables = {
      input: {
        id: party.id,
        sessionState: SessionState.ENDED,
      },
      condition: {
        sessionState: { eq: SessionState.INPROGRESS },
      },
    };
    await API.graphql(graphqlOperation(updatePartySession, mutation));
  };

  updateRounds = async (partyId: string, rounds: Round[]): Promise<void> => {
    const mutation: UpdatePartySessionMutationVariables = {
      input: {
        id: partyId,
        rounds,
      },
    };
    await API.graphql(graphqlOperation(updatePartySession, mutation));
  };

  getPartyById = async (partyId: string): Promise<Party> => {
    const mutation: GetPartySessionQueryVariables = { id: partyId };
    const response = await API.graphql(
      graphqlOperation(getPartySession, mutation)
    );
    const party: Party = response.data.getPartySession;
    if (party && party.sessionState === SessionState.CREATING) {
      return party;
    }
    throw new Error("Expected to find party that was being created.");
  };

  private getRandomCity = () =>
    cities[Math.floor(Math.random() * cities.length)];
}

// eslint-disable-next-line import/prefer-default-export
export const partyClient = new PartyClient();
