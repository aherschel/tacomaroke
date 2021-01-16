import { API, graphqlOperation } from "aws-amplify";
import {
  CreatePartySessionMutationVariables,
  CreateSingerMutationVariables,
  GetPartySessionQueryVariables,
  ListPartySessionsQueryVariables,
  ModelSortDirection,
  PartySessionCityByStartTimeQueryVariables,
  SessionState,
  UpdatePartySessionMutationVariables,
} from "../API";
import { createPartySession, createSinger, updatePartySession } from "../graphql/mutations";
import {
  getPartySession,
  listPartySessions,
  partySessionCityByStartTime,
} from "../graphql/queries";
import cities from "./cities";

export type Party = {
  id: string;
  city: string;
  sessionStartTime: string;
  sessionState: string;
  genreCode: string | null;
  owner: string | null;
};

class PartyClient {
  listParties = async (): Promise<Party[]> => {
    const mutation: ListPartySessionsQueryVariables = {
      filter: { sessionState: { eq: SessionState.CREATING } },
    };
    const response = await API.graphql(
      graphqlOperation(listPartySessions, mutation)
    );
    return response.data.listPartySessions.items;
  };

  addSinger = async (partysessionID: string, name: string): Promise<Party> => {
    const mutation: CreateSingerMutationVariables = {
      input: {
        name,
        partysessionID,
        expirationTimestamp: Math.round(Date.now() / 1000) + 2 * 60 * 60,
      },
    };
    const response = await API.graphql(
      graphqlOperation(createSinger, mutation)
    );
    return response.data.createSinger;
  };

  createParty = async (): Promise<Party> => {
    const mutation: CreatePartySessionMutationVariables = {
      input: {
        city: this.getRandomCity(),
        sessionStartTime: new Date().toISOString(),
        sessionState: SessionState.CREATING,
        expirationTimestamp: Math.round(Date.now() / 1000) + 2 * 60 * 60,
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
    };
    await API.graphql(graphqlOperation(updatePartySession, mutation));
  };

  endParty = async (partyId: string): Promise<void> => {
    const mutation: UpdatePartySessionMutationVariables = {
      input: {
        id: partyId,
        sessionState: SessionState.ENDED,
      },
    };
    await API.graphql(graphqlOperation(updatePartySession, mutation));
  };

  updateGenre = async (partyId: string, genreCode: string): Promise<void> => {
    const mutation: UpdatePartySessionMutationVariables = {
      input: {
        id: partyId,
        genreCode,
      },
    };
    await API.graphql(graphqlOperation(updatePartySession, mutation));
  };

  joinPartyByName = async (city: string): Promise<Party> => {
    const mutation: PartySessionCityByStartTimeQueryVariables = {
      city,
      sortDirection: ModelSortDirection.DESC,
      limit: 1,
    };
    const response = await API.graphql(
      graphqlOperation(partySessionCityByStartTime, mutation)
    );
    const parties: Party[] = response.data.partySessionCityByStartTime.items;
    if (
      parties.length === 1 &&
      parties[0].sessionState === SessionState.CREATING
    ) {
      return parties[0];
    }
    throw new Error(
      "Expected to find at least one party that was being created."
    );
  };

  joinPartyById = async (partyId: string): Promise<Party> => {
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
