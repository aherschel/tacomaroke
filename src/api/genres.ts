export type Track = {
  name: string;
  url: string;
};

export type Genre = {
  name: string;
  tag?: string;
  tracks?: Track[];
};

// Where possible use a tag to search last.fm, but you can provide tracks manually as well.
export const genres: Genre[] = [
  {
    name: "Breakup songs",
    tag: "breakup",
  },
  {
    name: "Songs about drinking",
    tag: "drinking+songs",
  },
  {
    name: "Ladies of the 80’s",
  },
  {
    name: "Songs about sex",
    tag: "songs+about+sex",
  },
  {
    name: "Songs about butts",
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
    tag: "hair+metal",
  },
  {
    name: "Pump up songs",
  },
  {
    name: "Boy bands",
    tag: "boy+bands",
  },
  {
    name: "Hip-hop",
    tag: "hip+hop",
  },
  {
    name: "Rap",
    tag: "rap",
  },
  {
    name: "Classic rock",
    tag: "classic+rock",
  },
  {
    name: "Vans Warped Tour",
    tag: "warped+tour",
  },
  {
    name: "The 70’s",
    tag: "70s",
  },
  {
    name: "The 80’s",
    tag: "80s",
  },
  {
    name: "The 90’s",
    tag: "90s",
  },
  {
    name: "Early 2000’s",
    tag: "2000s",
  },
  {
    name: "Music from Films",
    tag: "soundtrack",
  },
  {
    name: "One hit wonders",
    tag: "one+hit+wonder",
  },
  {
    name: "90’s country",
    tag: "90s+country",
  },
  {
    name: "Country ladies",
    tag: "ladies+of+country",
  },
  {
    name: "Country fellas",
    tag: "country",
  },
  {
    name: "Songs with a name in the title",
  },
  {
    name: "Teenage Love Songs",
  },
  {
    name: "Songs about love",
    tag: "love+song",
  },
  {
    name: "Taylor Swift",
    tag: "taylor+swift",
  },
  {
    name: "Rush",
    tag: "rush",
  },
  {
    name: "Red Hot Chili Peppers",
    tag: "red+hot+chili+peppers",
  },
  {
    name: "Freeplay!!",
  },
];
