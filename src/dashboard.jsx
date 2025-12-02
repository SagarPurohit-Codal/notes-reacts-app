import React, { useState } from "react";
import NotesSidebar from "./components/NotesSidebar";
import NoteEditor from "./components/NoteEditor";
import {
  initialNotes,
  DEFAULT_SELECTED_NOTE_ID,
} from "./data/mockNotes";

// Helper: generate a short preview from the body text
function generatePreview(body) {
  if (!body) return "";
  const firstLine = body.split("\n")[0].trim();
  if (!firstLine) return "";

  return firstLine.length > 60
    ? firstLine.slice(0, 60) + "..."
    : firstLine;
}

export default function Dashboard() {
  const [notes, setNotes] = useState(initialNotes);

  const [selectedNoteId, setSelectedNoteId] = useState(
    DEFAULT_SELECTED_NOTE_ID
  );

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  const handleUpdateNote = (noteId, fields) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id !== noteId) return note;

        const updatedNote = {
          ...note,
          ...fields,
        };

        // update timestamp
        updatedNote.updated = new Date().toLocaleString();

        return updatedNote;
      })
    );
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
      />

      <NoteEditor note={selectedNote} onChangeNote={handleUpdateNote} />
    </div>
  );
}
