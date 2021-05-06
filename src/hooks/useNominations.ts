import { useContext } from "react";
import NominationsContext from "../contexts/nominations";

export default function useNominations() {
  const context = useContext(NominationsContext);

  if (!context) {
    throw new Error("useNominations must be used within NominationsProvider");
  }

  return context;
}
