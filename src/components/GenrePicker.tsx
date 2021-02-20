import React from "react";
import { Button } from "react-bootstrap";
import { GenreConfig } from "../api/lastFmStaticGenres";

interface GenrePickerProps {
  genres: GenreConfig[];
  onGenreUpdated: (genre: GenreConfig) => void;
}

const GenrePicker = (props: GenrePickerProps) => {
  const { genres, onGenreUpdated } = props;

  return (
    <>
      {genres.map((genre) => (
        <div key={genre.name}>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => {
              onGenreUpdated(genre);
            }}
          >
            {genre.name}
          </Button>
          <br />
          <br />
        </div>
      ))}
    </>
  );
};

export default GenrePicker;
