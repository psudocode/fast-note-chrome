import React, { createContext, useEffect, useState } from "react";
import noteActions from "./note-actions";
import { Note } from "types/note";

// Create the context
const NotesContext = createContext({
  notes: [] as Note[],
  refreshNotes: () => {},
});

// Provider component
export const NotesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Function to refresh data from storage
  const refreshNotes = async () => {
    // Replace this with your actual storage fetching logic
    const updatedData = await noteActions.getAll();
    setNotes(updatedData);
  };

  useEffect(() => {
    // Initial load
    refreshNotes();

    // Listener for storage changes
    const handleStorageChange = () => {
      refreshNotes();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <NotesContext.Provider value={{ notes, refreshNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
