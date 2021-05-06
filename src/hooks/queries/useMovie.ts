import { useQuery } from "react-query";
import axios from "axios";
import { OMDB_API_KEY } from "../../env";
import { Movie } from "../../interfaces";

export default function useMovie(imdbId: string) {
  return useQuery<Movie>(
    ["movie", imdbId],
    () => {
      const params = new URLSearchParams({
        apikey: OMDB_API_KEY,
        i: imdbId,
      }).toString();

      return axios
        .get(`https://www.omdbapi.com/?${params}`)
        .then((response) => {
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
          console.log(response.data);

          const movie = {
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
          console.log(movie);
          return movie;
        });
    },
    {
      enabled: !!imdbId,
    }
  );
}
