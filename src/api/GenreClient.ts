import { Genre, Track, genres } from "./genres";

class GenreClient {
  private lastFm = "6d4e62c51de1406977401606a49e67a8";

  getSongsForTag = async (tag: string): Promise<Track[]> => {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tag}&api_key=${this.lastFm}&format=json`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseBody = await response.json();
    return responseBody.tracks.track;
  };

  getGenreByCode = (genreCode: string): Genre => {
    return genres.filter((genre) => genre.name === genreCode)[0];
  };
}

const genreClient = new GenreClient();
export default genreClient;
