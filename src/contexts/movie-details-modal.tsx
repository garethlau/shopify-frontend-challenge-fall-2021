import React, { createContext, useState, useContext } from "react";
import MovieDetailsModal from "../components/movie-details-modal";
import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";

interface Context extends UseDisclosureProps {
  open: (imdbId: string) => void;
  close: () => void;
  imdbId: string;
}

const MovieDetailsModalContext = createContext<Context | null>(null);

const MovieDetailsModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imdbId, setImdbId] = useState<string>("");

  function open(id: string) {
    setImdbId(id);
    onOpen();
  }

  function close() {
    setImdbId("");
    onClose();
  }

  return (
    <MovieDetailsModalContext.Provider
      value={{
        isOpen,
        open,
        close,
        imdbId,
      }}
    >
      <MovieDetailsModal imdbId={imdbId} isOpen={isOpen} close={close} />
      {children}
    </MovieDetailsModalContext.Provider>
  );
};

export { MovieDetailsModalProvider, MovieDetailsModalContext };
export default MovieDetailsModalContext;
