import React, { useState, useEffect } from "react";
import { Genre, Track } from "../genres";

const lastFm = "6d4e62c51de1406977401606a49e67a8";

const getSongsForTag = async (tag?: string): Promise<Track[]> => {
  if (tag === undefined) {
    return [];
  }
  const response = await fetch(
    `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tag}&api_key=${lastFm}&format=json`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const responseBody = await response.json();
  return responseBody.tracks.track;
};

interface SongSuggestionsProps {
  genre: Genre;
}

const SongSuggestions = (props: SongSuggestionsProps) => {
  const { genre } = props;
  const [tracks, setTracks] = useState<Track[] | undefined>();

  useEffect(() => {
    const loadTracks = async (tag?: string) => {
      const newTracks = await getSongsForTag(tag);
      setTracks(newTracks);
    };
    loadTracks(genre.tag);
  }, [genre]);

  if (genre.tag && tracks && tracks.length !== 0) {
    return (
      <div>
        <h3>Song Suggestions</h3>
        <ol>
          {tracks.map((track) => (
            <li>
              <a href={track.url}>{track.name}</a>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (genre.tracks) {
    return (
      <div>
        <h3>Song Suggestions</h3>
        <ol>
          {genre.tracks.map((track) => (
            <li>
              <a href={track.url}>{track.name}</a>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return null;
};

export default SongSuggestions;
