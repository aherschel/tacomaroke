import { Category, MusicProvider, ProviderType, Song } from "./MusicProvider";

class SpotifyPlaylistMusicProvider implements MusicProvider {
  getProviderType = (): ProviderType => "SPOTIFY_PLAYLISTS";

  getCategories = (): Promise<Category[]> => {
    return Promise.reject(new Error("Not yet implemented"));
  };

  getSongsForCategory = (category: Category): Promise<Song[]> => {
    return Promise.reject(
      new Error(`Not yet implemented: ${JSON.stringify(category)}`)
    );
  };
}

const spotifyPlaylistMusicProvider = new SpotifyPlaylistMusicProvider();
export default spotifyPlaylistMusicProvider;
