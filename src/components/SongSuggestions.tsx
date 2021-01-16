import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import genreClient from "../api/GenreClient";
import { Genre, Track } from "../api/genres";
import sleep from "../util/PromiseUtils";

interface SongSuggestionsProps {
  genre: Genre;
}

const SongSuggestions = (props: SongSuggestionsProps) => {
  const { genre } = props;
  const [tracks, setTracks] = useState<Track[] | undefined>([]);

  useEffect(() => {
    const loadTracks = async () => {
      if (genre.tag) {
        setTracks(undefined);
        // Introduce 0.5s minimum delay, this is mostly to keep the skeleton from looking too crazy.
        const [newTracks] = await Promise.all([
          genreClient.getSongsForTag(genre.tag),
          sleep(500),
        ]);
        setTracks(newTracks);
      } else if (genre.tracks) {
        setTracks(genre.tracks);
      } else {
        setTracks([]);
      }
    };
    loadTracks();
  }, [genre]);

  return (
    <div>
      <h3>Song Suggestions</h3>
      <ol>
        {(tracks &&
          tracks.map((track) => (
            <li key={`${track.name}-${track.url}`}>
              <a target="_blank" rel="noopener noreferrer" href={track.url}>
                {track.name}
              </a>
            </li>
          ))) || <Skeleton count={50} />}
      </ol>
    </div>
  );
};

export default SongSuggestions;
