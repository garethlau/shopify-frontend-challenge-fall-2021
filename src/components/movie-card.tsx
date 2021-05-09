import React from "react";
import {
  Box,
  Image,
  Flex,
  Heading,
  Text,
  Grid,
  Spacer,
  Button,
  CenterProps,
  useColorModeValue,
  Center,
  useToast,
} from "@chakra-ui/react";
import { MovieBase } from "../interfaces";
import useNominations from "../hooks/useNominations";
import useMovieDetailsModal from "../hooks/useMovieDetailsModal";
import MoviePosterImage from "./movie-poster-image";

interface Props {
  movie: MovieBase;
}

const ImageFallback: React.FC<CenterProps> = ({ ...rest }) => (
  <Center p="10px" bg={useColorModeValue("gray.200", "gray.500")} {...rest}>
    <Text align="center" opacity={0.6}>
      Missing poster image
    </Text>
  </Center>
);

const MovieCard: React.FC<Props> = ({ movie }) => {
  const { addNomination, removeNomination, nominations } = useNominations();
  const isNominated = nominations
    .map(({ imdbId }) => imdbId)
    .includes(movie.imdbId);

  const { open } = useMovieDetailsModal();
  const toast = useToast();

  function nominateMovie() {
    if (nominations.length === 5) {
      toast({
        status: "warning",
        title: "Limit reached",
        description: "You've reached the maximum number of nominations.",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    addNomination(movie);
  }

  return (
    <Grid
      w="100%"
      my={3}
      templateColumns="100px auto"
      templateRows="auto"
      bg={useColorModeValue("white", "gray.800")}
    >
      <MoviePosterImage
        borderRadius="md"
        poster={movie.poster}
        w="100px"
        h="150px"
      />
      <Flex p={2} direction="column">
        <Heading size="md">{movie.title}</Heading>
        <Text>{movie.year}</Text>
        <Spacer />
        <Box align="right">
          <Button
            onClick={() => open(movie.imdbId)}
            colorScheme="blue"
            mr="5px"
            size="sm"
          >
            Learn More
          </Button>
          {isNominated ? (
            <Button
              onClick={() => removeNomination(movie.imdbId)}
              size="sm"
              colorScheme="red"
            >
              Remove
            </Button>
          ) : (
            <Button onClick={nominateMovie} colorScheme="green" size="sm">
              Nominate
            </Button>
          )}
        </Box>
      </Flex>
    </Grid>
  );
};

export default MovieCard;
