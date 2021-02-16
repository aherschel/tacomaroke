import React, { useEffect, useState } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";
import spotifyClient from "../api/SpotifyClient";

const listPlaylistTitles = async (playlistId: string): Promise<Track[]> => {
  const accessToken = spotifyClient.getAccessTokenFromURI();
  if (!accessToken) {
    return Promise.reject();
  }
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  const playlist = await spotifyApi.getPlaylist(playlistId);
  return playlist.tracks.items
    .map((track) => {
      if (!track || !track.track || !track.track.name) {
        return null;
      }
      const { name, id } = track.track;
      return { name, id };
    })
    .filter((trackName) => trackName) as Track[];
};

const listUserPlaylists = async (): Promise<SpotifyApi.ListOfUsersPlaylistsResponse> => {
  const accessToken = spotifyClient.getAccessTokenFromURI();
  if (!accessToken) {
    return Promise.reject();
  }
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi.getUserPlaylists(undefined);
};

const redirectToSpotifyAuth = () => {
  window.location.href = spotifyClient.getAuthURL();
};

interface Track {
  id: string;
  name: string;
}

interface PlaylistTracks {
  id: string;
  title: string;
  tracks: Track[];
}

const SpotifyTrack = ({ track }: { track: Track }) => {
  const [showPlayer, enablePlayer] = useState(false);

  if (!showPlayer) {
    return (
      <div>
        <Button
          onClick={() => {
            enablePlayer(true);
          }}
        >
          Load {track.name}
        </Button>
      </div>
    );
  }

  const src = `https://open.spotify.com/embed/track/${track.id}`;

  return (
    <div>
      <Button
        onClick={() => {
          enablePlayer(false);
        }}
      >
        Hide {track.name}
      </Button>
      <iframe
        title={track.id}
        src={src}
        width="300"
        height="80"
        frameBorder="0"
        data-mce-fragment="1"
      />
    </div>
  );
};

// TODO: Pull access token into a separate store, and implement re-auth on 403
const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState<PlaylistTracks[]>();

  useEffect(() => {
    const loadPlaylists = async () => {
      const newPlaylists = await listUserPlaylists();
      const playlistMap: PlaylistTracks[] = await Promise.all(
        newPlaylists.items.map(async (plist) => {
          const titles = await listPlaylistTitles(plist.id);
          return { id: plist.id, title: plist.name, tracks: titles };
        })
      );
      setPlaylists(playlistMap);
    };

    loadPlaylists();
  }, []);

  if (!playlists) {
    return null;
  }

  return (
    <div>
      <h3>User Playlists</h3>
      <ol>
        {playlists.map((playlist) => (
          <li id={playlist.id}>
            {playlist.title}
            <ul>
              {playlist.tracks.map((track) => {
                return (
                  <li id={track.id}>
                    <SpotifyTrack track={track} />
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

const SpotifyIntegrationDebugPage = () => {
  return (
    <>
      <br />
      <Jumbotron>
        <h1>
          <img
            alt="spotify logo"
            width="80"
            height="60"
            src="https://1000logos.net/wp-content/uploads/2017/08/Spotify-Logo.png"
          />{" "}
          Spotify Test Integration
        </h1>
        <p>
          This page is a test harness to test integration with the spotify
          playlist and playback apis.
        </p>
      </Jumbotron>
      <Button onClick={redirectToSpotifyAuth}>Connect To Spotify</Button>
      <UserPlaylists />
    </>
  );
};

export default SpotifyIntegrationDebugPage;
