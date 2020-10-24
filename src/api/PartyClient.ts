export type Party = {
  name: string;
};

export const createParty = async (): Promise<Party> => {
  return { name: "Boston" };
};

export const joinParty = async (partyName: string): Promise<Party> => {
  if (partyName.toLowerCase() === "boston") {
    return { name: "Boston" };
  }
  throw new Error(`Couldn't join party with name ${partyName}.`);
};
