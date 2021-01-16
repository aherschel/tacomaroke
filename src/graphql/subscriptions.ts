/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSinger = /* GraphQL */ `
  subscription OnCreateSinger {
    onCreateSinger {
      id
      name
      partysessionID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSinger = /* GraphQL */ `
  subscription OnUpdateSinger {
    onUpdateSinger {
      id
      name
      partysessionID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSinger = /* GraphQL */ `
  subscription OnDeleteSinger {
    onDeleteSinger {
      id
      name
      partysessionID
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
      genreCode
      createdAt
      updatedAt
      singers {
        items {
          id
          name
          partysessionID
          createdAt
          updatedAt
        }
        nextToken
      }
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
      genreCode
      createdAt
      updatedAt
      singers {
        items {
          id
          name
          partysessionID
          createdAt
          updatedAt
        }
        nextToken
      }
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
      genreCode
      createdAt
      updatedAt
      singers {
        items {
          id
          name
          partysessionID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
