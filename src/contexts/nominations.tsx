import React, { createContext } from "react";
import usePersistantState from "../hooks/usePersistantState";
import { MovieBase } from "../interfaces";

const MAX_NOMINATIONS = 5;

const NominationsContext = createContext<{
  nominations: MovieBase[];
  addNomination: (movie: MovieBase) => void;
  addManyNominations: (movies: MovieBase[]) => void;
  removeNomination: (imdbId: string) => void;
  removeAllNominations: () => void;
  isComplete: boolean;
} | null>(null);

const NominationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nominations, setNominations] = usePersistantState<MovieBase[]>(
    [],
    "nominations"
  );

  function addNomination(movie: MovieBase) {
    if (MAX_NOMINATIONS === nominations.length) return;
    setNominations((prev) => [movie, ...prev]);
  }

  function removeNomination(imdbId: string) {
    setNominations((prev) => prev.filter((movie) => movie.imdbId !== imdbId));
  }

  function removeAllNominations() {
    setNominations([]);
  }

  function addManyNominations(movies: MovieBase[]) {
    setNominations((prev) => [...prev, ...movies]);
  }

  return (
    <NominationsContext.Provider
      value={{
        nominations,
        addNomination,
        addManyNominations,
        removeNomination,
        removeAllNominations,
        isComplete: nominations.length === MAX_NOMINATIONS,
      }}
    >
      {children}
    </NominationsContext.Provider>
  );
};

export { NominationsContext, NominationsProvider };
export default NominationsContext;
