// hooks for managing notes
import { useState, useEffect, useContext } from "react";
import NotesContext from "../contexts/notes/notes-context";

const useNotes = () => {
  const { notes, refreshNotes } = useContext(NotesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        refreshNotes();
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();

    // Listener for storage changes
    const handleStorageChange = () => {
      fetchNotes();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }
  , [refreshNotes]);

  return { notes, loading };
};
export default useNotes;
export { useNotes };