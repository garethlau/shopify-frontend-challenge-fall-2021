import React from "react";
import {
  Box,
  Wrap,
  WrapItem,
  Grid,
  Image,
  Text,
  Heading,
  HStack,
  CloseButton,
  useColorModeValue,
  Center,
  Flex,
  Alert,
  AlertIcon,
  Icon,
  Button,
} from "@chakra-ui/react";
import useNominations from "../hooks/useNominations";
import { GiPartyPopper } from "react-icons/gi";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const FallbackImage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Center
      w="100px"
      h="150px"
      bg={useColorModeValue("gray.800", "gray.100")}
      borderTopRadius="md"
      justifyContent="center"
    >
      <Text my="auto" color={useColorModeValue("white", "black")}>
        {title}
      </Text>
    </Center>
  );
};

const NominatedMovieCard: React.FC<{
  imdbId: string;
  title: string;
  poster: string;
  removeNomination: (imdbId: string) => void;
}> = ({ imdbId, title, poster, removeNomination }) => {
  return (
    <Box h="auto" w="100px" m="5px" align="center">
      <Image
        w="100px"
        h="150px"
        objectFit="cover"
        src={poster}
        borderTopRadius="md"
        fallback={<FallbackImage title={title} />}
      />
      <Box align="center" w="100%">
        <Button
          onClick={() => removeNomination(imdbId)}
          size="sm"
          colorScheme="red"
          isFullWidth
          borderTopRadius="0"
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};

const NominatedMoviesShowcase: React.FC<{}> = () => {
  const { nominations, removeNomination } = useNominations();
  return (
    <Box p={2}>
      <Heading align="center">Nominations</Heading>

      {nominations.length === 5 && (
        <Alert borderRadius="sm" status="success">
          🎉 You've nominated 5 movies!
        </Alert>
      )}
      {nominations.length > 0 ? (
        <HStack w="auto" h="auto" overflowX="auto" pb="5px">
          <AnimateSharedLayout>
            {nominations.map(({ title, poster, imdbId }) => (
              <motion.div layout key={imdbId}>
                <AnimatePresence>
                  <NominatedMovieCard
                    imdbId={imdbId}
                    title={title}
                    poster={poster}
                    removeNomination={removeNomination}
                  />
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimateSharedLayout>
        </HStack>
      ) : (
        <Text align="center">You haven't nominated any movies.</Text>
      )}
    </Box>
  );
};

export default NominatedMoviesShowcase;