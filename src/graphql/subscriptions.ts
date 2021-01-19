/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdatePartySessionById = /* GraphQL */ `
  subscription OnUpdatePartySessionById($id: String!) {
    onUpdatePartySessionById(id: $id) {
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
export const onCreatePartySession = /* GraphQL */ `
  subscription OnCreatePartySession {
    onCreatePartySession {
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
export const onUpdatePartySession = /* GraphQL */ `
  subscription OnUpdatePartySession {
    onUpdatePartySession {
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
export const onDeletePartySession = /* GraphQL */ `
  subscription OnDeletePartySession {
    onDeletePartySession {
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
