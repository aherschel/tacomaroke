import React, { useState } from "react";
import { Button } from "react-bootstrap";

const genres: string[] = [
  "Breakup songs",
  "Songs about drinking",
  "Ladies of the 80’s",
  "Songs about sex",
  "Songs about butts",
  "Hair bands",
  "Pump up songs",
  "Boy bands",
  "Hip-hop",
  "Rap",
  "Classic rock",
  "Vans Warped Tour",
  "The 70’s",
  "The 80’s",
  "The 90’s",
  "Early 2000’s",
  "Music from Films",
  "One hit wonders",
  "90’s country",
  "Country ladies",
  "Country fellas",
  "Songs with a name in the title",
  "Teenage Love Songs",
  "Songs about love",
  "Taylor Swift",
  "Freeplay!!",
];

const pickGenre = (): string => {
  return genres[Math.floor(Math.random() * genres.length)];
};

const GenrePicker = () => {
  const [selected, setSelected] = useState<string | undefined>();

  const selectGenre = () => {
    setSelected(pickGenre());
  };

  return (
    <>
      {selected && <p>{selected}</p>}
      <Button variant="outline-primary" onClick={selectGenre}>
        Pick Genre
      </Button>
    </>
  );
};

export default GenrePicker;
