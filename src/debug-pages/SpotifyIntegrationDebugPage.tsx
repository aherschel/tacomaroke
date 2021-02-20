import React, { useEffect, useState } from "react";
import { Alert, Button, Jumbotron } from "react-bootstrap";
import { Category, Song } from "../api/MusicProvider";
import spotifyPlaylistMusicProvider from "../api/SpotifyPlaylistMusicProvider";

const SpotifySong = ({ song }: { song: Song }) => {
  const [showPlayer, enablePlayer] = useState(false);

  if (!showPlayer) {
    return (
      <div>
        <Button
          onClick={() => {
            enablePlayer(true);
          }}
        >
          Load {song.name}
        </Button>
      </div>
    );
  }

  const src = `https://open.spotify.com/embed/track/${song.id}`;

  return (
    <div>
      <Button
        onClick={() => {
          enablePlayer(false);
        }}
      >
        Hide {song.name}
      </Button>
      <iframe
        title={song.id}
        src={src}
        width="300"
        height="80"
        frameBorder="0"
        data-mce-fragment="1"
      />
    </div>
  );
};

const CategoryList = ({
  onCategorySelected,
}: {
  onCategorySelected: (category: Category) => void;
}) => {
  const [categories, setCategories] = useState<Category[]>();

  const loadCategories = async () => {
    const newCategories = await spotifyPlaylistMusicProvider.getCategories();
    setCategories(newCategories);
  };

  if (!categories) {
    return <Button onClick={loadCategories}>Load Categories</Button>;
  }

  return (
    <div>
      <h3>User Playlists</h3>
      <ol>
        {categories.map((category) => (
          <li key={category.id}>
            {category.href && category.href !== "" ? (
              <a href={category.href}>{category.name}</a>
            ) : (
              category.name
            )}
            <Button
              onClick={() => {
                onCategorySelected(category);
              }}
            >
              Play
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
};

const SongList = ({ category }: { category: Category | undefined }) => {
  const [songs, setSongs] = useState<Song[]>();

  useEffect(() => {
    const loadSongs = async () => {
      const newSongs = await spotifyPlaylistMusicProvider.getSongsForCategory(
        category
      );
      setSongs(newSongs);
    };

    if (category) {
      loadSongs();
    } else {
      setSongs([]);
    }
  }, [category]);

  if (!category) {
    return null;
  }

  return (
    <ul>
      {songs?.map((song) => (
        <li key={song.id}>
          <SpotifySong song={song} />
        </li>
      ))}
    </ul>
  );
};

/**
 * TODO: Is it worth genericizing this particular component, or do we just embed
 * specifically when we know we're using a spotify client. Probably the latter.
 */
const SpotifyAuthNotifications = () => {
  const [showAuth, setShowAuth] = useState(
    spotifyPlaylistMusicProvider.getAccessTokenFromURI() === undefined
  );
  const [showExpired, setShowExpired] = useState(false);
  const [hideDenied, setHideDenied] = useState(false);

  useEffect(() => {
    const handleAuthCallback = () => {
      setShowExpired(true);
    };

    return spotifyPlaylistMusicProvider.subscribeToAuthUpdates(
      handleAuthCallback
    );
  });

  if (spotifyPlaylistMusicProvider.isAuthDenied() && !hideDenied) {
    return (
      <Alert variant="danger" onClose={() => setHideDenied(true)} dismissible>
        <Alert.Heading>Spotify Authorization Denied</Alert.Heading>
        <p>
          You need to grant authorization for spotify integration to work. Click{" "}
          <a href={spotifyPlaylistMusicProvider.getAuthURL()}>this link</a> to
          refresh.
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
          <a href={spotifyPlaylistMusicProvider.getAuthURL()}>this link</a> to
          refresh.
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
          <a href={spotifyPlaylistMusicProvider.getAuthURL()}>this link</a> to
          refresh.
        </p>
      </Alert>
    );
  }
  return null;
};

const SpotifyIntegrationDebugPage = () => {
  const [category, setCategory] = useState<Category | undefined>(undefined);

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
      <CategoryList
        onCategorySelected={(newCategory: Category) => setCategory(newCategory)}
      />
      <SongList category={category} />
    </>
  );
};

export default SpotifyIntegrationDebugPage;
