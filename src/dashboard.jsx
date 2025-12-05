import React, { useState } from "react";
import NotesSidebar from "./components/NotesSidebar";
import NoteEditor from "./components/NoteEditor";
import {
  initialNotes,
  DEFAULT_SELECTED_NOTE_ID,
} from "./data/mockNotes";

const STORAGE_KEY = "notes-app-notes";

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

// Load notes from localStorage once on app start
function loadInitialNotes() {
  if (typeof window === "undefined") return initialNotes;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialNotes;

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load notes from localStorage:", err);
  }

  return initialNotes;
}

export default function Dashboard() {
  const [notes, setNotes] = useState(loadInitialNotes);

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

  // Save all notes to localStorage 
  const handleSaveNotes = () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      console.log("Notes saved to localStorage");
    } catch (err) {
      console.error("Failed to save notes to localStorage:", err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onAddNote={handleAddNote}
      />

      <NoteEditor note={selectedNote} onChangeNote={handleUpdateNote} onSaveNotes={handleSaveNotes}/>
    </div>
  );
}
