import React from "react";
import { Button } from "react-bootstrap";
import { Genre } from "../genres";

const pickElement = (elements: Genre[]): Genre => {
  return elements[Math.floor(Math.random() * elements.length)];
};

interface GenrePickerProps {
  genre?: Genre;
  genres: Genre[];
  onGenreUpdated: (genre: Genre) => void;
}

const GenrePicker = (props: GenrePickerProps) => {
  const { genres, genre, onGenreUpdated } = props;

  const selectGenre = () => {
    const newGenre = pickElement(genres);
    onGenreUpdated(newGenre);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={selectGenre}>
        Pick Genre
      </Button>
      {genre && (
        <div>
          <br />
          <h3>Selected Genre</h3>
          <p>{genre.name}</p>
        </div>
      )}
    </>
  );
};

export default GenrePicker;
