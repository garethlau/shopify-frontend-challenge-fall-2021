import { OMDB_API_KEY } from "../env";
import { Movie } from "../interfaces";
import axios from "axios";

export default function getMovieById(imdbId: string): Promise<Movie> {
  const params = new URLSearchParams({
    apikey: OMDB_API_KEY,
    i: imdbId,
  }).toString();
  return axios.get(`https://www.omdbapi.com/?${params}`).then((response) => {
    const {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Type,
      Poster,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
    } = response.data;

    const movie: Movie = {
      title: Title,
      year: Year,
      rated: Rated,
      released: Released,
      runtime: Runtime,
      imdbId,
      type: Type,
      poster: Poster,
      plot: Plot,
      genre: Genre,
      directors: Director.split(","),
      writers: Writer.split(","),
      actors: Actors.split(","),
    };
    return movie;
  });
}
