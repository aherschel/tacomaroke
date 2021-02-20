import { GenreConfig, genres, TrackConfig } from "./lastFmStaticGenres";
import { Category, MusicProvider, ProviderType, Song } from "./MusicProvider";

class LastFmMusicProvider implements MusicProvider {
  private categories: Category[];

  private lastFm = "6d4e62c51de1406977401606a49e67a8";

  constructor() {
    this.categories = genres.map((genre) => {
      return { id: genre.id, name: genre.name };
    });
  }

  private getTracksByCategoryId = (id: string): TrackConfig[] | undefined => {
    return genres.filter((genre) => genre.id === id)[0]?.tracks;
  };

  /**
   * Stashing this for backwards compatibility purposes until I refactor the rest of the app.
   */
  getGenreByCode = (genreCode: string): GenreConfig => {
    return genres.filter((genre) => genre.name === genreCode)[0];
  };

  getProviderType = (): ProviderType => {
    return "LAST_FM";
  };

  getCategories = (): Promise<Category[]> => {
    return Promise.resolve(this.categories);
  };

  getSongsForCategory = async (category: Category): Promise<Song[]> => {
    const hardCodedTracks = this.getTracksByCategoryId(category.id)
    if (hardCodedTracks) {
      return hardCodedTracks.map((track) => {
        return { id: track.name, name: track.name, href: track.url };
      });
    }
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${category.id}&api_key=${this.lastFm}&format=json`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseBody = await response.json();
    return responseBody.tracks.track;
  };
}

const lastFmMusicProvider = new LastFmMusicProvider();
export default lastFmMusicProvider;
