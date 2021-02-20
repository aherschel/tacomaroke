import AbstractSpotifyMusicProvider from "./AbstractSpotifyMusicProvider";
import { Category, ProviderType, Song } from "./MusicProvider";

class SpotifyPlaylistMusicProvider extends AbstractSpotifyMusicProvider {
  getProviderType = (): ProviderType => "SPOTIFY_PLAYLISTS";

  rawGetCategories = async (): Promise<Category[]> => {
    const playlists = await this.api.getUserPlaylists(undefined);
    return playlists.items.map((playlist) => {
      return { id: playlist.id, name: playlist.name, href: playlist.href };
    });
  };

  rawGetSongsForCategory = async (category: Category): Promise<Song[]> => {
    const playlist = await this.api.getPlaylist(category.id);
    return playlist.tracks.items
      .map((track) => {
        if (!track || !track.track || !track.track.name) {
          return null;
        }
        const { name, id } = track.track;
        return { name, id };
      })
      .filter((trackName) => trackName) as Song[];
  };

  getCategories = this.wrapCall(this.rawGetCategories);

  getSongsForCategory = this.wrapCall(this.rawGetSongsForCategory);
}

const spotifyPlaylistMusicProvider = new SpotifyPlaylistMusicProvider();
export default spotifyPlaylistMusicProvider;
