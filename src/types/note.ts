export type Note = {
  id: string; // Unique identifier for the note
  title: string; // Title of the note
  content: string; // Content of the note
  createdAt: Date; // Timestamp when the note was created
  updatedAt: Date; // Timestamp when the note was last updated
  isPinned?: boolean; // Optional flag to indicate if the note is pinned
  sortOrder?: number; // Optional field to determine the order of notes
}

export type NoteCreateAndUpdate = {
  title?: string; // Optional title update
  content?: string; // Optional content update
  isPinned?: boolean; // Optional flag to update pinned status
  sortOrder?: number; // Optional field to update the order of notes
};

