// tslint:disable
// this is an auto generated file. This will be overwritten

export const createPartySession = `mutation CreatePartySession(
  $input: CreatePartySessionInput!
  $condition: ModelPartySessionConditionInput
) {
  createPartySession(input: $input, condition: $condition) {
    id
    city
    sessionStartTime
    sessionState
    genreCode
  }
}
`;
export const updatePartySession = `mutation UpdatePartySession(
  $input: UpdatePartySessionInput!
  $condition: ModelPartySessionConditionInput
) {
  updatePartySession(input: $input, condition: $condition) {
    id
    city
    sessionStartTime
    sessionState
    genreCode
  }
}
`;
export const deletePartySession = `mutation DeletePartySession(
  $input: DeletePartySessionInput!
  $condition: ModelPartySessionConditionInput
) {
  deletePartySession(input: $input, condition: $condition) {
    id
    city
    sessionStartTime
    sessionState
    genreCode
  }
}
`;
