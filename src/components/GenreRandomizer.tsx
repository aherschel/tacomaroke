import React from "react";
import { Button } from "react-bootstrap";
import { Genre } from "../api/genres";

const pickElement = (elements: Genre[]): Genre => {
  return elements[Math.floor(Math.random() * elements.length)];
};

interface GenreRandomizerProps {
  genres: Genre[];
  onGenreUpdated: (genre: Genre) => void;
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
