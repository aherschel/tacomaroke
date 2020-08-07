import React from "react";
import { Button } from "react-bootstrap";
import { Genre } from "../genres";

interface GenrePickerProps {
  genres: Genre[];
  onGenreUpdated: (genre: Genre) => void;
}

const GenrePicker = (props: GenrePickerProps) => {
  const { genres, onGenreUpdated } = props;

  return (
    <>
      {genres.map((genre) => (
        <div>
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
