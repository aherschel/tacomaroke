import { API, graphqlOperation } from "aws-amplify";
import {
  CreatePartySessionMutationVariables,
  ListPartySessionsQueryVariables,
  ModelSortDirection,
  PartySessionCityByStartTimeQueryVariables,
  UpdatePartySessionMutationVariables,
} from "../API";
import { createPartySession, updatePartySession } from "../graphql/mutations";
import { listPartySessions, partySessionCityByStartTime } from "../graphql/queries";

const cities: string[] = [
  "boston",
  "tacoma",
  "seattle",
  "ontario",
  "quebec",
  "austin",
  "detroit",
];

export type SessionState = "Creating" | "InProgress" | "Ended";

const getRandomCity = () => cities[Math.floor(Math.random() * cities.length)];

export type Party = {
  id: string;
  city: string;
  sessionStartTime: string;
  sessionState: string;
  genreCode: string | null;
  owner: string | null;
};

export const listParties = async (): Promise<Party[]> => {
  const mutation: ListPartySessionsQueryVariables = {
    filter: { sessionState: { eq: "Creating" } },
  };
  const response = await API.graphql(
    graphqlOperation(listPartySessions, mutation)
  );
  return response.data.listPartySessions.items;
};

export const createParty = async (): Promise<Party> => {
  const mutation: CreatePartySessionMutationVariables = {
    input: {
      city: getRandomCity(),
      sessionStartTime: new Date().toISOString(),
      sessionState: "Creating",
    },
  };
  const response = await API.graphql(
    graphqlOperation(createPartySession, mutation)
  );
  return response.data.createPartySession;
};

export const startParty = async (partyId: string): Promise<void> => {
  const mutation: UpdatePartySessionMutationVariables = {
    input: {
      id: partyId,
      sessionState: "InProgress",
    },
  };
  await API.graphql(graphqlOperation(updatePartySession, mutation));
};

export const updateGenre = async (
  partyId: string,
  genreCode: string
): Promise<void> => {
  const mutation: UpdatePartySessionMutationVariables = {
    input: {
      id: partyId,
      genreCode,
    },
  };
  return API.graphql(graphqlOperation(updatePartySession, mutation));
};

export const joinParty = async (city: string): Promise<Party> => {
  const mutation: PartySessionCityByStartTimeQueryVariables = {
    city,
    sortDirection: ModelSortDirection.DESC,
    limit: 1,
  };
  const response = await API.graphql(
    graphqlOperation(partySessionCityByStartTime, mutation)
  );
  const parties: Party[] = response.data.partySessionCityByStartTime.items;
  if (parties.length === 1 && parties[0].sessionState === "Creating") {
    return parties[0];
  }
  throw new Error(
    "Expected to find at least one party that was being created."
  );
};
