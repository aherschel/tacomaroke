// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPartySession = `query GetPartySession($id: ID!) {
  getPartySession(id: $id) {
    id
    city
    sessionStartTime
    sessionState
    genreCode
  }
}
`;
export const listPartySessions = `query ListPartySessions(
  $filter: ModelPartySessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listPartySessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      city
      sessionStartTime
      sessionState
      genreCode
    }
    nextToken
  }
}
`;
export const partySessionCityByStartTime = `query PartySessionCityByStartTime(
  $city: String
  $sessionStartTime: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPartySessionFilterInput
  $limit: Int
  $nextToken: String
) {
  partySessionCityByStartTime(
    city: $city
    sessionStartTime: $sessionStartTime
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      city
      sessionStartTime
      sessionState
      genreCode
    }
    nextToken
  }
}
`;
