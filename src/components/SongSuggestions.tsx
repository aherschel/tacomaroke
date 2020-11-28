import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import genreClient from "../api/GenreClient";
import { Genre, Track } from "../api/genres";

interface SongSuggestionsProps {
  genre: Genre;
}

const SongSuggestions = (props: SongSuggestionsProps) => {
  const { genre } = props;
  const [tracks, setTracks] = useState<Track[] | undefined>();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const loadTracks = async (tag?: string) => {
      if (tag) {
        setShowSpinner(true);
        const newTracks = await genreClient.getSongsForTag(tag);
        setTracks(newTracks);
        setShowSpinner(false);
      } else {
        setTracks([]);
      }
    };
    loadTracks(genre.tag);
  }, [genre]);

  if (showSpinner) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (genre.tag && tracks && tracks.length !== 0) {
    return (
      <div>
        <h3>Song Suggestions</h3>
        <ol>
          {tracks.map((track) => (
            <li>
              <a target="_blank" rel="noopener noreferrer" href={track.url}>
                {track.name}
              </a>
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
