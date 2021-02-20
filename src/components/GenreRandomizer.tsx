import React from "react";
import { Button } from "react-bootstrap";
import { GenreConfig } from "../api/lastFmStaticGenres";

const pickElement = (elements: GenreConfig[]): GenreConfig => {
  return elements[Math.floor(Math.random() * elements.length)];
};

interface GenreRandomizerProps {
  genres: GenreConfig[];
  onGenreUpdated: (genre: GenreConfig) => void;
}

const GenreRandomizer = (props: GenreRandomizerProps) => {
  const { genres, onGenreUpdated } = props;

  const selectGenre = () => {
    const newGenre = pickElement(genres);
    onGenreUpdated(newGenre);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={selectGenre}>
        Get Random Genre
      </Button>
    </>
  );
};

export default GenreRandomizer;
