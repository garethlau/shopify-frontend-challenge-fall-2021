import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { MovieBase } from "../../interfaces/Movie";
import { OMDB_API_KEY } from "../../env";

interface Result {
  movies: MovieBase[];
  nextPage: number | null;
}

export async function getMovies(title: string, page: number): Promise<Result> {
  const params = new URLSearchParams({
    apikey: OMDB_API_KEY,
    s: title,
    page: page.toString(),
    type: "movie",
  }).toString();

  const response = await axios.get(`http://www.omdbapi.com/?${params}`);
  const { data } = response;
  const search: any = data.Search;

  const movies: MovieBase[] = search.map(
    ({ Title, Year, imdbID, Type, Poster }: any) => ({
      title: Title,
      year: Year,
      imdbId: imdbID,
      type: Type,
      poster: Poster,
    })
  );

  const nextPage = movies?.length < 10 ? null : page + 1;

  return {
    movies,
    nextPage,
  };
}

export default function useMovies(title: string) {
  const queryKey = ["movies", { title: title }];

  return useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      const result = await getMovies(title, pageParam);
      return result;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        return lastPage?.nextPage;
      },
    }
  );
}
