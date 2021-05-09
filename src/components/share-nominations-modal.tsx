import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
  Text,
  Input,
  Box,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { MovieBase } from "../interfaces/Movie";
import useTextInput from "../hooks/useTextInput";
import { ORIGIN } from "../env";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nominations: MovieBase[];
  isComplete: boolean;
}

const ShareNominationsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  nominations,
  isComplete,
}) => {
  const name = useTextInput("");
  const toast = useToast();
  const nominationsLeft = 5 - nominations.length;

  async function copyMagicLink() {
    const imdbIds = nominations.map((movie) => movie.imdbId);
    const magicLink = `${ORIGIN}/view?name=${name.value}&nominations=${imdbIds}`;
    await navigator.clipboard.writeText(magicLink);
    toast({
      status: "success",
      title: "Copied to clipboard",
      isClosable: true,
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share your nominations</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={2}>
            {!isComplete ? (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                You need to nominate {nominationsLeft} more movie
                {nominationsLeft > 1 && "s"}.
              </Alert>
            ) : (
              <>
                <Box>
                  <Text>Display name:</Text>
                  <Input
                    disabled={!isComplete}
                    placeholder="e.g. John Doe"
                    value={name.value}
                    onChange={name.onChange}
                  />
                </Box>
                <Box>
                  <Text>Your nominations</Text>
                  {nominations.map(({ title }) => (
                    <li>{title}</li>
                  ))}
                </Box>
              </>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            disabled={!isComplete || name.value === ""}
            isFullWidth
            onClick={copyMagicLink}
          >
            Copy Shareable Link
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareNominationsModal;
