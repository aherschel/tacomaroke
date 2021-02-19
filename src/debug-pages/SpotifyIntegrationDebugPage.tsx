import React, { useEffect, useState } from "react";
import { Alert, Button, Jumbotron } from "react-bootstrap";
import spotifyClient, {
  Category,
  PlaylistTracks,
  Track,
} from "../api/SpotifyClient";

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

  const loadPlaylists = async () => {
    const newPlaylists = await spotifyClient.listPlaylists();
    const playlistMap: PlaylistTracks[] = await Promise.all(
      newPlaylists.items.map(async (plist) => {
        const titles = await spotifyClient.listPlaylistTitles(plist.id);
        return { id: plist.id, title: plist.name, tracks: titles };
      })
    );
    setPlaylists(playlistMap);
  };

  if (!playlists) {
    return <Button onClick={loadPlaylists}>Load playlists</Button>;
  }

  return (
    <div>
      <h3>User Playlists</h3>
      <ol>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            {playlist.title}
            <ul>
              {playlist.tracks.map((track) => {
                return (
                  <li key={track.id}>
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

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>();

  const loadCategories = async () => {
    const newCategories = await spotifyClient.getCategories();
    setCategories(newCategories);
  };

  if (!categories) {
    return <Button onClick={loadCategories}>Load Categories</Button>;
  }

  return (
    <div>
      <h3>Categories</h3>
      <ul>
        {categories.map((category: Category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

const SpotifyAuthNotifications = () => {
  const [showAuth, setShowAuth] = useState(
    spotifyClient.getAccessTokenFromURI() === undefined
  );
  const [showExpired, setShowExpired] = useState(false);
  const [hideDenied, setHideDenied] = useState(false);

  useEffect(() => {
    const handleAuthCallback = () => {
      setShowExpired(true);
    };

    return spotifyClient.subscribeToAuthUpdates(handleAuthCallback);
  });

  if (spotifyClient.isAuthDenied() && !hideDenied) {
    return (
      <Alert variant="danger" onClose={() => setHideDenied(true)} dismissible>
        <Alert.Heading>Spotify Authorization Denied</Alert.Heading>
        <p>
          You need to grant authorization for spotify integration to work. Click{" "}
          <a href={spotifyClient.getAuthURL()}>this link</a> to refresh.
        </p>
      </Alert>
    );
  }

  if (showAuth) {
    return (
      <Alert variant="warning" onClose={() => setShowAuth(false)} dismissible>
        <Alert.Heading>Spotify Authorization Required</Alert.Heading>
        <p>
          You need to grant authorization for spotify integration to work. Click{" "}
          <a href={spotifyClient.getAuthURL()}>this link</a> to refresh.
        </p>
      </Alert>
    );
  }

  if (showExpired) {
    return (
      <Alert
        variant="warning"
        onClose={() => setShowExpired(false)}
        dismissible
      >
        <Alert.Heading>Spotify Authorization Expired</Alert.Heading>
        <p>
          Your authorization needs to be refreshed. Click{" "}
          <a href={spotifyClient.getAuthURL()}>this link</a> to refresh.
        </p>
      </Alert>
    );
  }
  return null;
};

const SpotifyIntegrationDebugPage = () => {
  return (
    <>
      <SpotifyAuthNotifications />
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
      <Categories />
      <UserPlaylists />
    </>
  );
};

export default SpotifyIntegrationDebugPage;
