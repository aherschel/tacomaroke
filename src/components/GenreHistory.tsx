import React from "react";
import { Genre } from "../genres";

interface GenreHistoryProps {
  genreHistory: Genre[];
}

const GenreHistory = (props: GenreHistoryProps) => {
  const { genreHistory } = props;

  if (genreHistory.length === 0) {
    return null;
  }

  const latestGenreNames = genreHistory
    .map((genre) => genre.name)
    .slice(Math.max(0, genreHistory.length - 5), genreHistory.length);

  return (
    <div>
      <h3>Previous Genres</h3>
      <ol>
        {latestGenreNames.map((latestGenreName) => (
          <li>{latestGenreName}</li>
        ))}
      </ol>
    </div>
  );
};

export default GenreHistory;
