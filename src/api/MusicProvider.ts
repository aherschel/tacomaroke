export type ProviderType =
  | "LAST_FM"
  | "SPOTIFY_CATEGORIES"
  | "SPOTIFY_PLAYLISTS";

export type Song = {
  id: string;
  name: string;
  href?: string;
};

export type Category = {
  id: string;
  name: string;
  href?: string;
};

export interface MusicProvider {
  getProviderType: () => ProviderType;
  getCategories: () => Promise<Category[]>;
  getSongsForCategory: (category: Category) => Promise<Song[]>;
}
