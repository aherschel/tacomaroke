/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePartySessionInput = {
  id?: string | null,
  city: string,
  sessionStartTime: string,
  sessionState: SessionState,
  rounds?: Array< RoundInput > | null,
  singers?: Array< SingerInput > | null,
  expirationTimestamp: number,
};

export enum SessionState {
  CREATING = "CREATING",
  INPROGRESS = "INPROGRESS",
  ENDED = "ENDED",
}


export type RoundInput = {
  genreCode: string,
};

export type SingerInput = {
  name: string,
  votes: number,
  hearts: number,
};

export type ModelPartySessionConditionInput = {
  city?: ModelStringInput | null,
  sessionStartTime?: ModelStringInput | null,
  sessionState?: ModelSessionStateInput | null,
  expirationTimestamp?: ModelIntInput | null,
  and?: Array< ModelPartySessionConditionInput | null > | null,
  or?: Array< ModelPartySessionConditionInput | null > | null,
  not?: ModelPartySessionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelSessionStateInput = {
  eq?: SessionState | null,
  ne?: SessionState | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePartySessionInput = {
  id: string,
  city?: string | null,
  sessionStartTime?: string | null,
  sessionState?: SessionState | null,
  rounds?: Array< RoundInput > | null,
  singers?: Array< SingerInput > | null,
  expirationTimestamp?: number | null,
};

export type DeletePartySessionInput = {
  id?: string | null,
};

export type ModelPartySessionFilterInput = {
  id?: ModelIDInput | null,
  city?: ModelStringInput | null,
  sessionStartTime?: ModelStringInput | null,
  sessionState?: ModelSessionStateInput | null,
  expirationTimestamp?: ModelIntInput | null,
  and?: Array< ModelPartySessionFilterInput | null > | null,
  or?: Array< ModelPartySessionFilterInput | null > | null,
  not?: ModelPartySessionFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreatePartySessionMutationVariables = {
  input: CreatePartySessionInput,
  condition?: ModelPartySessionConditionInput | null,
};

export type CreatePartySessionMutation = {
  createPartySession:  {
    __typename: "PartySession",
    id: string,
    city: string,
    sessionStartTime: string,
    sessionState: SessionState,
    rounds:  Array< {
      __typename: "Round",
      genreCode: string,
    } > | null,
    singers:  Array< {
      __typename: "Singer",
      name: string,
      votes: number,
      hearts: number,
    } > | null,
    expirationTimestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePartySessionMutationVariables = {
  input: UpdatePartySessionInput,
  condition?: ModelPartySessionConditionInput | null,
};

export type UpdatePartySessionMutation = {
  updatePartySession:  {
    __typename: "PartySession",
    id: string,
    city: string,
    sessionStartTime: string,
    sessionState: SessionState,
    rounds:  Array< {
      __typename: "Round",
      genreCode: string,
    } > | null,
    singers:  Array< {
      __typename: "Singer",
      name: string,
      votes: number,
      hearts: number,
    } > | null,
    expirationTimestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePartySessionMutationVariables = {
  input: DeletePartySessionInput,
  condition?: ModelPartySessionConditionInput | null,
};

export type DeletePartySessionMutation = {
  deletePartySession:  {
    __typename: "PartySession",
    id: string,
    city: string,
    sessionStartTime: string,
    sessionState: SessionState,
    rounds:  Array< {
      __typename: "Round",
      genreCode: string,
    } > | null,
    singers:  Array< {
      __typename: "Singer",
      name: string,
      votes: number,
      hearts: number,
    } > | null,
    expirationTimestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPartySessionQueryVariables = {
  id: string,
};

export type GetPartySessionQuery = {
  getPartySession:  {
    __typename: "PartySession",
    id: string,
    city: string,
    sessionStartTime: string,
    sessionState: SessionState,
    rounds:  Array< {
      __typename: "Round",
      genreCode: string,
    } > | null,
    singers:  Array< {
      __typename: "Singer",
      name: string,
      votes: number,
      hearts: number,
    } > | null,
    expirationTimestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPartySessionsQueryVariables = {
  filter?: ModelPartySessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPartySessionsQuery = {
  listPartySessions:  {
    __typename: "ModelPartySessionConnection",
    items:  Array< {
      __typename: "PartySession",
      id: string,
      city: string,
      sessionStartTime: string,
      sessionState: SessionState,
      rounds:  Array< {
        __typename: "Round",
        genreCode: string,
      } > | null,
      singers:  Array< {
        __typename: "Singer",
        name: string,
        votes: number,
        hearts: number,
      } > | null,
      expirationTimestamp: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type PartySessionCityByStartTimeQueryVariables = {
  city?: string | null,
  sessionStartTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPartySessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PartySessionCityByStartTimeQuery = {
  partySessionCityByStartTime:  {
    __typename: "ModelPartySessionConnection",
    items:  Array< {
      __typename: "PartySession",
      id: string,
      city: string,
      sessionStartTime: string,
      sessionState: SessionState,
      rounds:  Array< {
        __typename: "Round",
        genreCode: string,
      } > | null,
      singers:  Array< {
        __typename: "Singer",
        name: string,
        votes: number,
        hearts: number,
      } > | null,
      expirationTimestamp: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnUpdatePartySessionByIdSubscriptionVariables = {
  id: string,
};

export type OnUpdatePartySessionByIdSubscription = {
  onUpdatePartySessionById:  {
    __typename: "PartySession",
    id: string,
    city: string,
    sessionStartTime: string,
    sessionState: SessionState,
    rounds:  Array< {
      __typename: "Round",
      genreCode: string,
    } > | null,
    singers:  Array< {
      __typename: "Singer",
      name: string,
      votes: number,
      hearts: number,
    } > | null,
    expirationTimestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePartySessionSubscription = {
  onCreatePartySession:  {
    __typename: "PartySession",
    id: string,
    city: string,
    sessionStartTime: string,
    sessionState: SessionState,
    rounds:  Array< {
      __typename: "Round",
      genreCode: string,
    } > | null,
    singers:  Array< {
      __typename: "Singer",
      name: string,
      votes: number,
      hearts: number,
    } > | null,
    expirationTimestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePartySessionSubscription = {
  onUpdatePartySession:  {
    __typename: "PartySession",
    id: string,
    city: string,
    sessionStartTime: string,
    sessionState: SessionState,
    rounds:  Array< {
      __typename: "Round",
      genreCode: string,
    } > | null,
    singers:  Array< {
      __typename: "Singer",
      name: string,
      votes: number,
      hearts: number,
    } > | null,
    expirationTimestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePartySessionSubscription = {
  onDeletePartySession:  {
    __typename: "PartySession",
    id: string,
    city: string,
    sessionStartTime: string,
    sessionState: SessionState,
    rounds:  Array< {
      __typename: "Round",
      genreCode: string,
    } > | null,
    singers:  Array< {
      __typename: "Singer",
      name: string,
      votes: number,
      hearts: number,
    } > | null,
    expirationTimestamp: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
