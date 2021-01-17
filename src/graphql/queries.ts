/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSinger = /* GraphQL */ `
  query GetSinger($id: ID!) {
    getSinger(id: $id) {
      id
      name
      partysessionID
      votes
      hearts
      expirationTimestamp
      createdAt
      updatedAt
    }
  }
`;
export const listSingers = /* GraphQL */ `
  query ListSingers(
    $filter: ModelSingerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSingers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        partysessionID
        votes
        hearts
        expirationTimestamp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPartySession = /* GraphQL */ `
  query GetPartySession($id: ID!) {
    getPartySession(id: $id) {
      id
      city
      sessionStartTime
      sessionState
      genreCode
      expirationTimestamp
      createdAt
      updatedAt
      singers {
        items {
          id
          name
          partysessionID
          votes
          hearts
          expirationTimestamp
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPartySessions = /* GraphQL */ `
  query ListPartySessions(
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
        expirationTimestamp
        createdAt
        updatedAt
        singers {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const partySessionCityByStartTime = /* GraphQL */ `
  query PartySessionCityByStartTime(
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
        expirationTimestamp
        createdAt
        updatedAt
        singers {
          nextToken
        }
      }
      nextToken
    }
  }
`;
