import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";
import spotifyClient from "../api/SpotifyClient";

const playlistId = "37i9dQZF1DWSf2RDTDayIx"
const loadPlaylist = async () => {
  const accessToken = spotifyClient.getAccessTokenFromURI();
  if(accessToken) {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    const playlist = await spotifyApi.getPlaylist(playlistId);
    console.log(`Got Tracks: ${JSON.stringify(playlist.tracks)}`);
  } else {
    // Fragment doesn't exist
  }
};

const redirectToSpotifyAuth = () => {
  window.location.href = spotifyClient.getAuthURL()
};

const SpotifyIntegrationDebugPage = () => {
  loadPlaylist();
  return (
    <>
      <br />
      <Jumbotron>
        <h1>Spotify Test Integration <img alt="spotify logo" width="80" height="60" src="https://1000logos.net/wp-content/uploads/2017/08/Spotify-Logo.png" /></h1>
        <p>
          This page is a test harness to test integration with the spotify playlist and playback apis.
        </p>
      </Jumbotron>
      <Button onClick={redirectToSpotifyAuth}>
        Connect To Spotify
      </Button>
    </>
  );
};

export default SpotifyIntegrationDebugPage;
