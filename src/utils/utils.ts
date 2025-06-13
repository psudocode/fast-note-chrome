
import { Note } from 'types/note';
import { v4 as uuidv4 } from 'uuid';
import {storage} from './storage'

export const generateId = (): string => {
  return uuidv4();
};


export const downloadNotesAsJSONFile = (notes: Note[]) => {
  const blob = new Blob([JSON.stringify(notes, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `notes-${new Date().toISOString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); 
}

// import JSON into the storage
export const importNotesFromJSONFile = async (file: File): Promise<Note[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        // get current notes from storage
        const currentNotes = await storage.get('notes');
        
        const content = event.target?.result as string;
        const notes: Note[] = JSON.parse(content);
        // Validate notes structure
        if (!Array.isArray(notes)) {
          throw new Error("Invalid notes format");
        }
        // Add unique IDs if missing
        const updatedNotes = notes.map(note => ({
          ...note,
          id: generateId(),
        }));
        const combinedNotes = currentNotes ? [...JSON.parse(currentNotes as string), ...updatedNotes] : updatedNotes;
        // Remove duplicates based on ID
        await storage.set('notes', JSON.stringify(combinedNotes.filter((note, index, self) =>
          index === self.findIndex((n) => n.id === note.id)
        )));
        resolve(updatedNotes);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}