import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Button,
  Text,
  Heading,
  Stack,
  Box,
  Tag,
  TagLabel,
  Skeleton,
  HStack,
  Avatar,
  Wrap,
  WrapItem,
  BoxProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import useNominations from "../hooks/useNominations";
import useMovie from "../hooks/queries/useMovie";
import { MovieBase } from "../interfaces";

interface Props {
  imdbId: string;
  close: () => void;
  isOpen: boolean;
}

const TagGroupSkeleton: React.FC<{ numTags?: number }> = ({ numTags = 2 }) => (
  <Wrap>
    {[...new Array(numTags)].map((_, index) => (
      <WrapItem>
        <Skeleton w="90px" h="24px" m="3px" key={index} />
      </WrapItem>
    ))}
  </Wrap>
);

const MovieDetailsModal: React.FC<Props> = ({ isOpen, close, imdbId }) => {
  const { nominations, removeNomination, addNomination } = useNominations();
  const isNominated = nominations.map(({ imdbId }) => imdbId).includes(imdbId);
  const { data: movie, isLoading } = useMovie(imdbId);

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{movie?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={2}>
            <Skeleton isLoaded={!isLoading} w="200px">
              <Text>{movie?.released !== "N/A" && movie?.released}</Text>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Text>{movie?.plot !== "N/A" && movie?.plot}</Text>
            </Skeleton>
            <Box>
              <Text>Directors</Text>
              {isLoading ? (
                <TagGroupSkeleton />
              ) : (
                <>
                  {movie?.directors?.map((director) => (
                    <Tag m="3px">
                      <TagLabel>{director}</TagLabel>
                    </Tag>
                  ))}
                </>
              )}
            </Box>
            <Box>
              <Text>Writers</Text>
              {isLoading ? (
                <TagGroupSkeleton numTags={2} />
              ) : (
                <>
                  {movie?.writers?.map((writer) => (
                    <Tag m="3px">
                      <TagLabel>{writer}</TagLabel>
                    </Tag>
                  ))}
                </>
              )}
            </Box>
            <Box>
              <Text>Actors</Text>
              {isLoading ? (
                <TagGroupSkeleton numTags={4} />
              ) : (
                <>
                  {movie?.actors?.map((actor) => (
                    <Tag m="3px">
                      <TagLabel>{actor}</TagLabel>
                    </Tag>
                  ))}
                </>
              )}
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter>
          {isNominated ? (
            <Button
              onClick={() => removeNomination(imdbId)}
              size="sm"
              colorScheme="red"
            >
              Remove
            </Button>
          ) : (
            <Button
              onClick={() => addNomination(movie as MovieBase)}
              colorScheme="green"
              size="sm"
            >
              Nominate
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MovieDetailsModal;
