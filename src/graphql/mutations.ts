/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSinger = /* GraphQL */ `
  mutation CreateSinger(
    $input: CreateSingerInput!
    $condition: ModelSingerConditionInput
  ) {
    createSinger(input: $input, condition: $condition) {
      id
      name
      partysessionID
      expirationTimestamp
      createdAt
      updatedAt
    }
  }
`;
export const updateSinger = /* GraphQL */ `
  mutation UpdateSinger(
    $input: UpdateSingerInput!
    $condition: ModelSingerConditionInput
  ) {
    updateSinger(input: $input, condition: $condition) {
      id
      name
      partysessionID
      expirationTimestamp
      createdAt
      updatedAt
    }
  }
`;
export const deleteSinger = /* GraphQL */ `
  mutation DeleteSinger(
    $input: DeleteSingerInput!
    $condition: ModelSingerConditionInput
  ) {
    deleteSinger(input: $input, condition: $condition) {
      id
      name
      partysessionID
      expirationTimestamp
      createdAt
      updatedAt
    }
  }
`;
export const createPartySession = /* GraphQL */ `
  mutation CreatePartySession(
    $input: CreatePartySessionInput!
    $condition: ModelPartySessionConditionInput
  ) {
    createPartySession(input: $input, condition: $condition) {
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
          expirationTimestamp
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updatePartySession = /* GraphQL */ `
  mutation UpdatePartySession(
    $input: UpdatePartySessionInput!
    $condition: ModelPartySessionConditionInput
  ) {
    updatePartySession(input: $input, condition: $condition) {
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
          expirationTimestamp
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deletePartySession = /* GraphQL */ `
  mutation DeletePartySession(
    $input: DeletePartySessionInput!
    $condition: ModelPartySessionConditionInput
  ) {
    deletePartySession(input: $input, condition: $condition) {
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
          expirationTimestamp
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
