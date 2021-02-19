import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import lastFmMusicProvider from "../api/LastFmMusicProvider";
import { GenreConfig } from "../api/lastFmStaticGenres";
import { Song } from "../api/MusicProvider";
import sleep from "../util/PromiseUtils";

interface SongSuggestionsProps {
  genre: GenreConfig;
}

const SongSuggestions = (props: SongSuggestionsProps) => {
  const { genre } = props;
  const [tracks, setTracks] = useState<Song[] | undefined>([]);

  useEffect(() => {
    const loadTracks = async () => {
      setTracks(undefined);
      // Introduce 0.5s minimum delay, this is mostly to keep the skeleton from looking too crazy.
      const [newTracks] = await Promise.all([
        lastFmMusicProvider.getSongsForCategory(genre),
        sleep(500),
      ]);
      setTracks(newTracks);
    };
    loadTracks();
  }, [genre]);

  return (
    <div>
      <h3>Song Suggestions</h3>
      <ol>
        {(tracks &&
          tracks.map((track) => (
            <li key={`${track.name}-${track.href}`}>
              <a target="_blank" rel="noopener noreferrer" href={track.href}>
                {track.name}
              </a>
            </li>
          ))) || <Skeleton count={50} />}
      </ol>
    </div>
  );
};

export default SongSuggestions;
