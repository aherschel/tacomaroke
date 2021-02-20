export type TrackConfig = {
  name: string;
  url: string;
};

export type GenreConfig = {
  id: string;
  name: string;
  tracks?: TrackConfig[];
};

// Where possible use a tag to search last.fm, but you can provide tracks manually as well.
export const genres: GenreConfig[] = [
  {
    name: "Breakup songs",
    id: "breakup",
  },
  {
    name: "Songs about drinking",
    id: "drinking+songs",
  },
  {
    name: "Ladies of the 80’s",
    id: "Ladies of the 80’s",
  },
  {
    name: "Songs about sex",
    id: "songs+about+sex",
  },
  {
    name: "Songs about butts",
    id: "Songs about butts",
    tracks: [
      { name: "Baby Got Back", url: "" },
      { name: "Shake Your Booty", url: "" },
      { name: "Shake Ya Ass", url: "" },
      { name: "Ms. Fat Booty", url: "" },
      { name: "Fat Bottomed Girls", url: "" },
      { name: "Bubble Butt", url: "" },
    ],
  },
  {
    name: "Hair bands",
    id: "hair+metal",
  },
  {
    name: "Pump up songs",
    id: "Pump up songs",
  },
  {
    name: "Boy bands",
    id: "boy+bands",
  },
  {
    name: "Hip-hop",
    id: "hip+hop",
  },
  {
    name: "Rap",
    id: "rap",
  },
  {
    name: "Classic rock",
    id: "classic+rock",
  },
  {
    name: "Vans Warped Tour",
    id: "warped+tour",
  },
  {
    name: "The 70’s",
    id: "70s",
  },
  {
    name: "The 80’s",
    id: "80s",
  },
  {
    name: "The 90’s",
    id: "90s",
  },
  {
    name: "Early 2000’s",
    id: "2000s",
  },
  {
    name: "Music from Films",
    id: "soundtrack",
  },
  {
    name: "One hit wonders",
    id: "one+hit+wonder",
  },
  {
    name: "90’s country",
    id: "90s+country",
  },
  {
    name: "Country ladies",
    id: "ladies+of+country",
  },
  {
    name: "Country fellas",
    id: "country",
  },
  {
    name: "Songs with a name in the title",
    id: "Songs with a name in the title",
  },
  {
    name: "Teenage Love Songs",
    id: "Teenage Love Songs",
  },
  {
    name: "Songs about love",
    id: "love+song",
  },
  {
    name: "Taylor Swift",
    id: "taylor+swift",
  },
  {
    name: "Rush",
    id: "rush",
  },
  {
    name: "Red Hot Chili Peppers",
    id: "red+hot+chili+peppers",
  },
  {
    name: "Freeplay!!",
    id: "Freeplay!!",
  },
];
