import AbstractSpotifyMusicProvider from "./AbstractSpotifyMusicProvider";
import { Category, ProviderType, Song } from "./MusicProvider";

class SpotifyCategoryMusicProvider extends AbstractSpotifyMusicProvider {
  getProviderType = (): ProviderType => "SPOTIFY_CATEGORIES";

  rawGetCategories = async (): Promise<Category[]> => {
    return (await this.api.getCategories()).categories.items.map((category) => {
      return { id: category.id, name: category.name, href: category.href };
    });
  };

  // TODO: Implement category to song mapping.
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

const spotifyCategoryMusicProvider = new SpotifyCategoryMusicProvider();
export default spotifyCategoryMusicProvider;
