import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Stack,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import NominatedMoviesShowcase from "../components/nominated-movies-showcase";
import SearchBar from "../components/search-bar";
import SearchResultList from "../components/search-result-list";
import NominatedMoviesList from "../components/nominated-movies-list";
import useNominations from "../hooks/useNominations";
import { MovieBase } from "../interfaces";

const TwoColumnLayout: React.FC<{}> = () => {
  return (
    <Grid
      templateRows="40px 1fr 1fr"
      templateColumns="repeat(2, 1fr)"
      p={4}
      h="100%"
      maxW="6xl"
      mx="auto"
    >
      <GridItem colSpan={2}>
        <SearchBar />
      </GridItem>
      <GridItem rowSpan={2} colSpan={1}>
        <SearchResultList scrollable />
      </GridItem>
      <GridItem rowSpan={2} colSpan={1}>
        <NominatedMoviesList />
      </GridItem>
    </Grid>
  );
};

const OneColumnLayout: React.FC<{}> = () => {
  return (
    <Stack>
      <NominatedMoviesShowcase />
      <SearchBar />
      <SearchResultList />
    </Stack>
  );
};

const Nomination: React.FC<{}> = () => {
  const layout = useBreakpointValue({ base: "one-column", md: "two-column" });
  const { removeAllNominations, addManyNominations } = useNominations();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [storedNominations] = useState<MovieBase[]>(() => {
    const item = localStorage.getItem("nominations");
    const nominatedMovies = item !== null ? JSON.parse(item) : [];
    if (nominatedMovies.length > 0) {
      onOpen();
    }
    return nominatedMovies;
  });

  function restart() {
    removeAllNominations();
    onClose();
  }
  function keep() {
    removeAllNominations();
    addManyNominations(storedNominations);
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pick up where you left off</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Text>
                We noticed that you previously nominated some movies. Would you
                like to <b>continue</b> where you left off or <b>start fresh</b>
                ?
              </Text>
              <Box>
                <Text>Previous nominations:</Text>
                <UnorderedList>
                  {storedNominations.map(({ title }) => (
                    <ListItem>{title}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr="5px" onClick={restart}>
              Start Fresh
            </Button>
            <Button colorScheme="green" onClick={keep}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {layout === "two-column" ? <TwoColumnLayout /> : <OneColumnLayout />}
    </>
  );
};

export default Nomination;
