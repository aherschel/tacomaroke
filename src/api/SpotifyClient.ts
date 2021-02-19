import SpotifyWebApi from "spotify-web-api-js";

export interface Track {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface PlaylistTracks {
  id: string;
  title: string;
  tracks: Track[];
}

export type AuthCallback = (isAuthorized: boolean) => void;

class SpotifyClient {
  private clientId = "51afd22bd79049fb8aca47fd048df2a4";

  private scopes = ["playlist-read-private", "playlist-read-collaborative"];

  private api = new SpotifyWebApi();

  private authCallbacks: Set<AuthCallback> = new Set();

  initiateAuth = () => {
    window.location.href = this.getAuthURL();
  };

  private rawListPlaylists = async (): Promise<SpotifyApi.ListOfUsersPlaylistsResponse> => {
    return this.api.getUserPlaylists(undefined);
  };

  private rawListPlaylistTitles = async (
    playlistId: string
  ): Promise<Track[]> => {
    const playlist = await this.api.getPlaylist(playlistId);
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

  private rawGetCategories = async (): Promise<Category[]> => {
    return (await this.api.getCategories()).categories.items.map((category) => {
      return { id: category.id, name: category.name };
    });
  };

  private wrapCall = <T>(
    wrappedCall: (...args: any[]) => Promise<T>
  ): ((...args: any[]) => Promise<T>) => {
    return (...args: any[]) => {
      const accessToken = this.getAccessTokenFromURI();
      if (!accessToken) {
        this.authCallbacks.forEach((authCallback) => authCallback(false));
        throw Error("Access token not found in url.");
      }
      this.api.setAccessToken(accessToken);
      try {
        return wrappedCall(...args);
      } catch (e) {
        const responseCode = e.status;
        if (responseCode && responseCode >= 400 && responseCode < 500) {
          this.authCallbacks.forEach((authCallback) => authCallback(false));
        }
        throw e;
      }
    };
  };

  listPlaylistTitles = this.wrapCall(this.rawListPlaylistTitles);

  listPlaylists = this.wrapCall(this.rawListPlaylists);

  getCategories = this.wrapCall(this.rawGetCategories);

  isAuthDenied = (): boolean => {
    if (window.location.search === "") {
      return false;
    }
    const errorCode = window.location.search
      .substring(1)
      .split("&")
      .find((part: string) => part.startsWith("error"))
      ?.substring(6);

    return errorCode === "access_denied";
  };

  getAuthURL = (): string => {
    const currentPath = encodeURI(window.location.href.split("?")[0]);
    const scopeString = this.scopes.join("%20");
    return `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${currentPath}&scope=${scopeString}&show_dialog=true`;
  };

  getAccessTokenFromURI = (): string | undefined => {
    if (!window.location.hash) {
      return undefined;
    }
    try {
      return window.location.hash
        .replace("#", "")
        .split("&")
        .find((part: string) => part.startsWith("access_token"))
        ?.substring(13);
    } catch (e) {
      console.error(
        `Exception caught while parsing access token: ${JSON.stringify(
          e.message
        )}`
      );
      return undefined;
    }
  };

  /**
   * Add callback to set of tracked callbacks, return a function to delete the callback
   * for use in useEffect.
   */
  subscribeToAuthUpdates = (handleAuthUpdate: AuthCallback) => {
    this.authCallbacks.add(handleAuthUpdate);
    return () => {
      this.authCallbacks.delete(handleAuthUpdate);
    };
  };
}

const spotifyClient = new SpotifyClient();
export default spotifyClient;
