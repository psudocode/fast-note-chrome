import Notes from "components/atoms/notes/notes";
import useNotes from "hooks/useNotes";
import { Download, Settings, Trash, Upload } from "lucide-react";
import { useState } from "react";
import {
  downloadNotesAsJSONFile,
  importNotesFromJSONFile,
} from "./../utils/utils";
import { storage } from "./../utils/storage";
import { toast } from "sonner";
import { useConfirm } from "@razmisoft/react-confirm";
function App() {
  const [isToolsShown, setToolsShown] = useState(false);
  return (
    <main>
      <Header />
      {/* hamburger menu */}
      <button
        className="fixed top-3 right-2 bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
        aria-label="Toggle Tools"
        title="Toggle Tools"
        type="button"
        data-testid="toggle-tools-button"
        onClick={() => setToolsShown(!isToolsShown)}
      >
        <Settings size={14} className="text-white" />
      </button>
      <Tools isShown={isToolsShown} />
      <Notes />
    </main>
  );
}

export const Header = () => {
  return (
    <header className="flex flex-col justify-center p-3 bg-gray-950 text-white">
      <h1 className="text-xl font-bold mr-3">Fast Note</h1>
      <p className="text-sm italic text-gray-400">
        A simple note-taking extension
      </p>
    </header>
  );
};

type ToolProps = {
  isShown: boolean;
};

export const Tools: React.FC<ToolProps> = ({ isShown = false }) => {
  const { notes } = useNotes();
  const { confirm } = useConfirm();
  const handleExport = () => {
    if (notes.length === 0) {
      alert("No notes to export");
      return;
    }
    downloadNotesAsJSONFile(notes);
  };

  const handleClearAllNotes = async () => {
    try {
      await storage.clear();
      toast.success("All notes cleared successfully!");
    } catch (error) {
      console.error("Error clearing notes:", error);
      toast.error("Failed to clear notes. Please try again.");
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    try {
      const notes = await importNotesFromJSONFile(file);
      toast.success(`Imported ${notes.length} notes successfully!`);
    } catch (error) {
      console.error("Error importing notes:", error);
      toast.error("Failed to import notes. Please check the file format.");
    }
  };

  if (!isShown) return null;
  return (
    <div className={`flex flex-col p-3 bg-gray-900 text-white justify-end`}>
      <div className="flex space-x-4">
        <button
          className="bg-gray-700 p-2 rounded-lg justify-center items-center flex hover:bg-blue-700 transition-colors duration-200 text-xs"
          onClick={handleExport}
        >
          <Download size={14} className="inline mr-1" />
          Export
        </button>
        <label
          className="bg-gray-700 p-2 rounded-lg justify-center items-center flex hover:bg-blue-700 transition-colors duration-200 text-xs cursor-pointer"
          htmlFor="import-notes"
        >
          <input
            type="file"
            id="import-notes"
            accept=".json"
            className="hidden"
            onChange={handleUpload}
          />
          <Upload size={14} className="inline mr-1" />
          Import
        </label>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <button
          className="bg-red-700 p-2 rounded-lg justify-center items-center flex hover:bg-red-700 transition-colors duration-200 text-xs"
          onClick={() => {
            confirm({
              title: "Delete All Notes",
              description:
                "Are you sure you want to delete all notes? This action cannot be undone.",
              onConfirm: () => handleClearAllNotes(),
            });
          }}
        >
          <Trash size={14} className="inline mr-1" />
          Delete All Notes
        </button>
      </div>
    </div>
  );
};

export default App;
