import { useContext } from "react";
import MovieDetailsModalContext from "../contexts/movie-details-modal";

export default function useMovieDetailsModal() {
  const context = useContext(MovieDetailsModalContext);

  if (!context) {
    throw new Error(
      "useMovieDetailsModal must be used within MovieDetailsModalProvider"
    );
  }

  return context;
}
