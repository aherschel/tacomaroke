import React from "react";
import { Genre } from "../genres";

interface GenreHistoryProps {
  currentGenre: Genre | undefined;
  genreHistory: Genre[];
}

const GenreHistory = (props: GenreHistoryProps) => {
  const { currentGenre, genreHistory } = props;

  const latestGenreNames = genreHistory
    .map((genre) => genre.name)
    .slice(Math.max(0, genreHistory.length - 5), genreHistory.length);

  return (
    <>
      {currentGenre && (
        <>
          <br />
          <h3>Selected Genre</h3>
          <p>{currentGenre.name}</p>
        </>
      )}
      {genreHistory.length !== 0 && (
        <>
          <h3>Previous Genres</h3>
          <ol>
            {latestGenreNames.map((latestGenreName) => (
              <li>{latestGenreName}</li>
            ))}
          </ol>
        </>
      )}
    </>
  );
};

export default GenreHistory;
