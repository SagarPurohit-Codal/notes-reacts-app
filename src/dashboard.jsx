import React, { useState } from "react";
import NotesSidebar from "./components/NotesSidebar";
import NoteEditor from "./components/NoteEditor";
import {
  initialNotes,
  DEFAULT_SELECTED_NOTE_ID,
} from "./data/mockNotes";

// Helper function to create a new note
function createEmptyNote() {
  const now = new Date();
  return {
    id: String(now.getTime()),
    title: "",
    body: "",
    created: now.toLocaleString(),
    updated: now.toLocaleString(),
  };
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

  const handleAddNote = () => {
    const newNote = createEmptyNote();
    setNotes((prev) => [newNote,...prev]);
    setSelectedNoteId(newNote.id);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onAddNote={handleAddNote}
      />

      <NoteEditor note={selectedNote} onChangeNote={handleUpdateNote} />
    </div>
  );
}
