import React, { useState, useEffect } from "react";
import { Party, createParty } from "../api/PartyClient";

type ComponentState = "Creating" | "Created" | "Started";

const CreateParty = () => {
  const [party, setParty] = useState<Party | undefined>();
  const [componentState, setState] = useState<ComponentState>("Creating");

  useEffect(() => {
    const generateParty = async () => {
      setParty(await createParty());
      setState("Created");
    };
    generateParty();
  }, []);

  switch (componentState) {
    case "Creating":
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    case "Created":
      return (
        <>
          <p>Loaded Party {party!!.name}</p>
        </>
      );
    case "Started":
      return <div />;
    default:
      return <div />;
  }
};

export default CreateParty;
