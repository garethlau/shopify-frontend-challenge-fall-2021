import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Spinner,
  Stack,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { useLocation, Link as ReactRouterLink } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import getMovieById from "../api/getMovieById";
import MoviePosterImage from "../components/movie-poster-image";

const View: React.FC<{}> = () => {
  const location = useLocation();
  const search = location.search;
  const [name, setName] = useState<string>("");

  const [movies, setMovies] = useState<Movie[]>([]);

  const [errMsg, setErrMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(search);
      const name = searchParams.get("name");

      const imdbIdsStr = searchParams.get("nominations");
      if (!imdbIdsStr || !name) {
        throw new Error("Incomplete nomination list");
      }

      const imdbIds = imdbIdsStr.split(",");
      if (imdbIds.length !== 5) {
        throw new Error("Incomplete nomination list");
      }

      setName(name);
      // fetch movie data
      Promise.all(imdbIds.map((imdbId) => getMovieById(imdbId))).then(
        (nominatedMovies) => {
          setMovies(nominatedMovies);
        }
      );
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  if (isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner />
      </Center>
    );
  } else if (errMsg !== "") {
    return (
      <Center h="100%" w="100%">
        <Stack align="center">
          <Text>{errMsg}</Text>
          <Box>
            <Link as={ReactRouterLink} to="/">
              <Button colorScheme="blue">Home</Button>
            </Link>
          </Box>
        </Stack>
      </Center>
    );
  }
  return (
    <Box my={10}>
      <Heading align="center" mb={4}>
        {name}'s Nominations
      </Heading>
      <Stack align="center" spacing={4}>
        {movies.map((movie) => (
          <MoviePosterImage
            poster={movie.poster}
            w="300px"
            h="450px"
            maxW="400px"
            borderRadius="md"
          />
        ))}
      </Stack>
    </Box>
  );
};

export default View;
