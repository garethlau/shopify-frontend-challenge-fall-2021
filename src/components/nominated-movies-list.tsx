import React from "react";
import useNominations from "../hooks/useNominations";
import {
  Flex,
  Heading,
  Text,
  Box,
  Alert,
  Collapse,
  Spacer,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { MdShare } from "react-icons/md";
import MovieCard from "./movie-card";
import { AnimateSharedLayout, motion, AnimatePresence } from "framer-motion";
import ShareNominationsModal from "./share-nominations-modal";

const NominatedMoviesList: React.FC<{}> = () => {
  const { nominations, isComplete } = useNominations();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ShareNominationsModal
        isComplete={isComplete}
        nominations={nominations}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex p={2} direction="column" h="100%">
        <Flex mb={2}>
          <Heading size="lg">Nominations</Heading>
          <Spacer />
          <Button onClick={onOpen} rightIcon={<Icon as={MdShare} />}>
            Share
          </Button>
        </Flex>
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
    </>
  );
};

export default NominatedMoviesList;
