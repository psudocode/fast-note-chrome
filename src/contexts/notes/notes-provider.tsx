import React, { useState, useEffect } from "react";
import noteActions from "./../../utils/note-actions";
import NotesContext from "./../../contexts/notes/notes-context";
import { Note } from "types/note";

// Provider component
export const NotesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Function to refresh data from storage
  const refreshNotes = async () => {
    // Replace this with your actual storage fetching logic
    const updatedData = await noteActions.getAll();
    // pinned notes should always be at the top
    updatedData.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1; // a is pinned, b is not
      if (!a.isPinned && b.isPinned) return 1; // b is pinned, a is not
      return 0; // both are either pinned or not pinned
    });
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
