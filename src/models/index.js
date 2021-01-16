// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const SessionState = {
  "CREATING": "CREATING",
  "INPROGRESS": "INPROGRESS",
  "ENDED": "ENDED"
};

const { Singer, PartySession } = initSchema(schema);

export {
  Singer,
  PartySession,
  SessionState
};