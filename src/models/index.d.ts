import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum SessionState {
  CREATING = "CREATING",
  INPROGRESS = "INPROGRESS",
  ENDED = "ENDED"
}



export declare class Singer {
  readonly id: string;
  readonly name: string;
  readonly partysessionID: string;
  constructor(init: ModelInit<Singer>);
  static copyOf(source: Singer, mutator: (draft: MutableModel<Singer>) => MutableModel<Singer> | void): Singer;
}

export declare class PartySession {
  readonly id: string;
  readonly city: string;
  readonly sessionStartTime: string;
  readonly sessionState: SessionState | keyof typeof SessionState;
  readonly genreCode?: string;
  readonly singers?: (Singer | null)[];
  constructor(init: ModelInit<PartySession>);
  static copyOf(source: PartySession, mutator: (draft: MutableModel<PartySession>) => MutableModel<PartySession> | void): PartySession;
}