// src/dashboard.jsx
import React from "react";
import NotesSidebar from "./components/NotesSidebar";
import NoteEditor from "./components/NoteEditor";
import { mockNotes, mockOpenNote } from "./data/mockNotes";

export default function Dashboard() {
  // For now, we pretend note with id "2" is selected.
  // A later commit will use useState for selection.
  const selectedNoteId = mockOpenNote.id;

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      <NotesSidebar notes={mockNotes} selectedNoteId={selectedNoteId} />
      <NoteEditor note={mockOpenNote} />
    </div>
  );
}
