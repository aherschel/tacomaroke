import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Party } from "../api/PartyClient";

type PartyListProps = {
  parties: Party[];
  onPartySelected: (partyId: string) => void;
  disabled: boolean;
};

interface CityMap {
  [key: string]: Party;
}

const buttonStyle = {
  marginBottom: "1em",
};

const PartyList = (props: PartyListProps) => {
  const { parties, onPartySelected, disabled } = props;

  const sortedParties = parties
    .slice()
    .sort(
      (a, b) => Date.parse(b.sessionStartTime) - Date.parse(a.sessionStartTime)
    );

  const uniqueCities: CityMap = {};
  sortedParties.forEach((party) => {
    if (!(party.city in uniqueCities)) {
      uniqueCities[party.city] = party;
    }
  });

  return (
    <>
      <br />
      <Container>
        {Object.keys(uniqueCities)
          .map((cityName) => uniqueCities[cityName])
          .map((party) => (
            <Row key={party.id}>
              <Button
                style={buttonStyle}
                variant="outline-primary"
                size="lg"
                block
                onClick={() => {
                  onPartySelected(party.id);
                }}
                disabled={disabled}
              >
                Join {party.city}-roke
              </Button>
            </Row>
          ))}
      </Container>
    </>
  );
};

export default PartyList;
