// src/dashboard.jsx
import React, { useState } from "react";
import NotesSidebar from "./components/NotesSidebar";
import NoteEditor from "./components/NoteEditor";
import {
  initialNotes,
  DEFAULT_SELECTED_NOTE_ID,
} from "./data/mockNotes";

export default function Dashboard() {
  const [notes] = useState(initialNotes);

  const [selectedNoteId, setSelectedNoteId] = useState(
    DEFAULT_SELECTED_NOTE_ID
  );

  // Find the note that should be displayed on the right
  const selectedNote =
    notes.find((note) => note.id === selectedNoteId) || notes[0];

  const handleSelectNote = (noteId) => {
    setSelectedNoteId(noteId);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={handleSelectNote}
      />
      <NoteEditor note={selectedNote} />
    </div>
  );
}
