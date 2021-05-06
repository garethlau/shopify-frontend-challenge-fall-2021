export interface MovieBase {
  title: string;
  year: string;
  imdbId: string;
  type: string;
  poster: string;
}

export interface Movie extends MovieBase {
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  directors: string[];
  writers: string[];
  actors: string[];
  plot: string;
  // language: string;
  // country: string;
  // awards: string;
  // ratings: {}[];
  // metascore: string;
  // imdbRating: string;
  // imdbVotes: string;
  // dvd: string;
  // boxOffice: string;
  // production: string;
  // website: string;
}
