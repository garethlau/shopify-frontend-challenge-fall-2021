import React, { useEffect } from "react";
import useSearch from "../hooks/useSearch";
import useDebounce from "../hooks/useDebounce";

import useMovies from "../hooks/queries/useMovies";

import MovieCard from "./movie-card";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";

const SearchResultList: React.FC<{ scrollable?: boolean }> = ({
  scrollable = false,
}) => {
  const { value } = useSearch();
  const debouncedValue = useDebounce(value, 500);
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useMovies(
    debouncedValue
  );
  const movies = data?.pages.map((page) => page.movies).flat() || [];
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: !!isError,
  });

  const align = useBreakpointValue({ base: "center", md: "left" });
  return (
    <Flex p={2} h="100%" direction="column">
      <Heading size="lg" align={align}>
        Search Results
      </Heading>
      {debouncedValue !== "" && (
        <Text textAlign={["center", "center", "left"]}>
          for "{debouncedValue}"
        </Text>
      )}
      <Box
        overflowY="auto"
        ref={scrollable ? rootRef : null}
        h="100%"
        pr={{ base: 0, md: 2 }}
      >
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbId} />
        ))}
        {(isLoading || hasNextPage) && (
          <Box align="center" ref={sentryRef}>
            <Spinner />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default SearchResultList;
