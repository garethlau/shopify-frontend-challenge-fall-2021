import { useQuery } from "react-query";
import { Movie } from "../../interfaces";
import getMovieById from "../../api/getMovieById";

export default function useMovie(imdbId: string) {
  return useQuery<Movie>(["movie", imdbId], () => getMovieById(imdbId), {
    enabled: !!imdbId,
  });
}
