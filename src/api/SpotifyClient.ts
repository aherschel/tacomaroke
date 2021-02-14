class SpotifyClient {
  private clientId = "51afd22bd79049fb8aca47fd048df2a4";

  getAuthURL = (): string => {
    const currentPath = encodeURI(window.location.href);
    return `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${currentPath}&scope=user-read-private`
  };

  getAccessTokenFromURI = (): string | undefined => {
    if (!window.location.hash) {
      return undefined;
    }
    try {
      return window.location.hash.replace('#', '').split('&').find((part: string) => part.startsWith("access_token"))?.substring(13)
    } catch (e) {
      console.error(`Exception caught while parsing access token: ${JSON.stringify(e.message)}`);
      return undefined;
    }
  };
}

const spotifyClient = new SpotifyClient();
export default spotifyClient;
