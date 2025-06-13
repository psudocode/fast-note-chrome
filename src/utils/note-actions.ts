import { storage } from "./storage";
import { Note, NoteCreateAndUpdate } from "types/note";
import { generateId } from "./utils";

// use the key "notes" and save note as stringified JSON
export const noteStorageKey = "notes";

export const noteBaseActions = {
    getAll: async (): Promise<Note[]> => {
        const notes = await storage.get(noteStorageKey);
        return notes ? (JSON.parse(notes as string) as Note[]) : [];
    },
    
    getById: async (id: string): Promise<Note | null> => {
        const notes = await noteActions.getAll();
        return notes.find((note) => note.id === id) || null;
    },
    
    create: async (note: NoteCreateAndUpdate): Promise<void> => {
        const notes = await noteActions.getAll();
        notes.push({ 
            ...note, 
            id: generateId(), 
            createdAt: new Date(), 
            updatedAt: new Date(),
            title: note.title ?? "",
            content: note.content ?? "",
            sortOrder: notes.length + 1,
        });
        await storage.set(noteStorageKey, JSON.stringify(notes));
    },
    
    update: async (id: string, updates: NoteCreateAndUpdate): Promise<void> => {
        const notes = await noteActions.getAll();
        const index = notes.findIndex((note) => note.id === id);
        if (index !== -1) {
        notes[index] = { ...notes[index], ...updates, updatedAt: new Date() };
        await storage.set(noteStorageKey, JSON.stringify(notes));
        }
    },
    
    delete: async (id: string): Promise<void> => {
        let notes = await noteActions.getAll();
        notes = notes.filter((note) => note.id !== id);
        await storage.set(noteStorageKey, JSON.stringify(notes));
    },
};

export const notePinning = {

    pinNote: async (id: string): Promise<void> => {
        const notes = await noteActions.getAll();
        const index = notes.findIndex((note) => note.id === id);
        if (index !== -1) {
            notes[index].isPinned = true;
            await storage.set(noteStorageKey, JSON.stringify(notes));
        }
    },
    unpinNote: async (id: string): Promise<void> => {
        const notes = await noteActions.getAll();           
        const index = notes.findIndex((note) => note.id === id);
        if (index !== -1) {
            notes[index].isPinned = false;
            await storage.set(noteStorageKey, JSON.stringify(notes));
        }
    },
};

// sorting
export const noteSorting = {

    sortNotes: async (order: "asc" | "desc"): Promise<void> => {
        const notes = await noteActions.getAll();
        notes.sort((a, b) => {
            if (order === "asc") {
                return a.sortOrder! - b.sortOrder!;
            } else {
                return b.sortOrder! - a.sortOrder!;
            }
        });
        await storage.set(noteStorageKey, JSON.stringify(notes));
    }
};



// combined actions
const noteActions = {
    ...noteBaseActions,
    ...notePinning,
    ...noteSorting  
}

export default noteActions;