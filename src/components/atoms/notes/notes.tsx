import { Copy, Edit, FileText, LucideIcon, Pin, Plus, X } from "lucide-react";
import { Note } from "types/note";
import noteActions from "./../../../utils/note-actions";
import { FormEvent, useState } from "react";
import useNotes from "hooks/useNotes";
import { Toaster, toast } from "sonner";
import { useConfirm } from "@razmisoft/react-confirm";

export const NoteItem = ({ note }: { note: Note }) => {
  const { confirm } = useConfirm();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const handlePinToggle = async () => {
    if (note.isPinned) {
      await noteActions.unpinNote(note.id);
    } else {
      await noteActions.pinNote(note.id);
    }
    toast.success(note.isPinned ? "Note unpinned!" : "Note pinned!");
  };

  const handleDelete = async () => {
    await noteActions.delete(note.id);
    toast.success("Note deleted successfully!");
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(note.content)
      .then(() => {
        toast.success("Note content copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy note content: " + error.message);
      });
  };

  const handleUpdateNote = async (updates: Partial<Note>) => {
    await noteActions.update(note.id, updates);
  };

  // editing and expanding cannot be done at the same time
  const toggleEditing = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
    setIsEditing(!isEditing);
  };
  const toggleExpanded = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <li
      key={note.id}
      className="flex flex-col mb-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex bg-slate-700 hover:bg-slate-600 cursor-pointer items-center transition-colors duration-200 p-1 relative min-h-9 ${
          isExpanded ? "rounded-b-none rounded-t-lg" : "rounded-lg"
        }`}
      >
        {note.isPinned ? (
          <Pin size={16} className="" />
        ) : (
          <FileText size={16} className="" />
        )}

        <div
          className="flex flex-1 items-center truncate"
          onClick={() => toggleExpanded()}
        >
          <span className="font-semibold ml-2">{note.title}</span>
        </div>
        {hovered && (
          <div className="absolute right-0 top-1 mr-2 bg-slate-600 pl-2">
            <IconButton
              icon={Pin}
              onClick={handlePinToggle}
              isActive={note.isPinned}
            />
            <IconButton
              icon={Edit}
              onClick={() => toggleEditing()}
              isActive={isEditing}
            />
            <IconButton
              icon={Copy}
              onClick={() => handleCopy()}
              isActive={false}
            />
            <IconButton
              icon={X}
              onClick={() =>
                confirm({
                  title: "Delete Item",
                  description: "Are you sure you want to delete this item?",
                  onConfirm: () => handleDelete(),
                })
              }
              isActive={false}
            />
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="bg-slate-200 p-2 rounded-b-lg">
          <p className="text-gray-800">{note.content}</p>
        </div>
      )}
      {isEditing && (
        <div className="bg-slate-200 p-2 rounded-b-lg">
          <input
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => handleUpdateNote({ title: e.target.value })}
            className="w-full p-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <textarea
            className="w-full h-24 p-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={note.content}
            onChange={(e) =>
              handleUpdateNote({ content: e.target.value, title: note.title })
            }
            placeholder="Edit your note content here..."
          />
        </div>
      )}
    </li>
  );
};
export const NoteList = ({ notes }: { notes: Note[] }) => {
  return (
    <ul className="list-none">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
      {notes.length === 0 && (
        <p className="text-gray-500">No notes available.</p>
      )}
    </ul>
  );
};

const IconButton = ({
  icon: Icon,
  onClick,
  isActive = false,
}: {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}) => {
  return (
    <button
      className={`p-2 rounded-lg transition-colors duration-200 mr-1 ${
        isActive ? "bg-gray-500" : "bg-slate-700 hover:bg-gray-500 text-white"
      }`}
      onClick={onClick}
    >
      <Icon size={13} />
    </button>
  );
};

export const NewNoteForm = ({
  onSubmit,
}: {
  onSubmit: (title: string, content: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded-lg bg-slate-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 rounded-lg bg-slate-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-black text-white p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200 text-sm"
      >
        Add Note
      </button>
    </form>
  );
};
export const Notes = () => {
  const { notes, loading } = useNotes();
  const [formVisible, setFormVisible] = useState(false);

  const handleAddNote = async (title: string, content: string) => {
    await noteActions.create({ title, content });
    setFormVisible(false);
    toast.success("Note added successfully!");
  };

  if (loading) {
    return <p className="text-gray-500">Loading notes...</p>;
  }

  return (
    <div className="p-4 min-w-80">
      <button
        onClick={() => setFormVisible(!formVisible)}
        className="bg-slate-700 text-white p-2 text-xs rounded-lg mb-2 hover:bg-slate-600 transition-colors duration-200"
      >
        {formVisible ? (
          <span className="flex items-center">
            <X size={12} className="mr-1" />
            Close Form
          </span>
        ) : (
          <span className="flex items-center">
            <Plus size={12} className="mr-1" />
            Add new note
          </span>
        )}
      </button>
      {formVisible && (
        <div className="mb-4 bg-slate-700 p-3 rounded-lg">
          <NewNoteForm onSubmit={handleAddNote} />
        </div>
      )}
      <NoteList notes={notes} />
      <Toaster />
    </div>
  );
};
export default Notes;
