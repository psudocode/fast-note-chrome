import { createContext } from "react";
import { Note } from "types/note";

// Create the context
const NotesContext = createContext({
  notes: [] as Note[],
  refreshNotes: () => {},
});

export default NotesContext;