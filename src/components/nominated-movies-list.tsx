import React from "react";
import useNominations from "../hooks/useNominations";
import { Flex, Heading, Text, Box, Alert, Collapse } from "@chakra-ui/react";
import MovieCard from "./movie-card";
import { AnimateSharedLayout, motion, AnimatePresence } from "framer-motion";

const NominatedMoviesList: React.FC<{}> = () => {
  const { nominations, isComplete } = useNominations();
  return (
    <Flex p={2} direction="column" h="100%">
      <Heading size="lg">Nominations</Heading>
      <Collapse in={isComplete} animateOpacity>
        <Alert borderRadius="sm" status="success">
          🎉 You've nominated 5 movies!
        </Alert>
      </Collapse>
      <Box h="100%" overflowY="auto" pr={2}>
        {nominations.length > 0 ? (
          <AnimateSharedLayout>
            {nominations.map((movie) => (
              <motion.div layout key={movie.imdbId}>
                <AnimatePresence>
                  <MovieCard movie={movie} />
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimateSharedLayout>
        ) : (
          <Text>You haven't nominated any movies.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default NominatedMoviesList;
