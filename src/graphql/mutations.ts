/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      rounds {
        genreCode
      }
      singers {
        name
        votes
        hearts
      }
      expirationTimestamp
      createdAt
      updatedAt
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
      rounds {
        genreCode
      }
      singers {
        name
        votes
        hearts
      }
      expirationTimestamp
      createdAt
      updatedAt
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
      rounds {
        genreCode
      }
      singers {
        name
        votes
        hearts
      }
      expirationTimestamp
      createdAt
      updatedAt
    }
  }
`;
