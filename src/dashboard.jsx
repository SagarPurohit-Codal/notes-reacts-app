import React, { useState } from "react";
import NotesSidebar from "./components/NotesSidebar";
import NoteEditor from "./components/NoteEditor";
import {
  initialNotes,
  DEFAULT_SELECTED_NOTE_ID,
} from "./data/mockNotes";

const STORAGE_KEY = "notes-app-notes";

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

// Helper function to create a new note
function createEmptyNote() {
  const now = new Date();
  return {
    id: generateId(),
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
  const [unsavedNoteIds, setUnsavedNoteIds] = useState(() => new Set());
  // const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

    setUnsavedNoteIds((prev) => {
      const next = new Set(prev);
      next.add(noteId);
      return next;
    });

    // setHasUnsavedChanges(true);
  };

  const handleAddNote = () => {
    const newNote = createEmptyNote();
    setNotes((prev) => [newNote,...prev]);
    setSelectedNoteId(newNote.id);
    // setHasUnsavedChanges(true);

    setUnsavedNoteIds((prev) => {
      const next = new Set(prev);
      next.add(newNote.id);
      return next;
    });
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => {
      const filteredNotes = prevNotes.filter((note) => note.id !== noteId);
  
      if (noteId === selectedNoteId) {
        setSelectedNoteId(null);
      }

      return filteredNotes;
    });

    setUnsavedNoteIds((prev) => {
      const next = new Set(prev);
      next.delete(noteId);
      return next;
    });

    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const stored = raw ? JSON.parse(raw) : [];
        const storedArr = Array.isArray(stored) ? stored : [];
  
        const nextStored = storedArr.filter((n) => n.id !== noteId);
  
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStored));
      } catch (err) {
        console.error("Failed to update localStorage after delete:", err);
      }
    }
  };

  //Save individual note to local storage

  const handleSaveNote = (noteId) => {
    const noteToSave = notes.find((n) => n.id === noteId);
    if (!noteToSave) return;
  
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : [];
      const storedArr = Array.isArray(stored) ? stored : [];
  
      const exists = storedArr.some((n) => n.id === noteId);
  
      const nextStored = exists
        ? storedArr.map((n) => (n.id === noteId ? noteToSave : n))
        : [noteToSave, ...storedArr];
  
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStored));
  
      // mark as saved
      setUnsavedNoteIds((prev) => {
        const next = new Set(prev);
        next.delete(noteId);
        return next;
      });
    } catch (err) {
      console.error("Failed to save note to localStorage:", err);
    }
  };

  
  // Save all notes to localStorage 
  const handleSaveNotes = () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      // setHasUnsavedChanges(false);
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
        unsavedNoteIds={unsavedNoteIds}
      />

      <NoteEditor
        note={selectedNote}
        onChangeNote={handleUpdateNote}
        onAddNote={handleAddNote}
        hasNotes={notes.length > 0}
        onDeleteNote={handleDeleteNote}
        onSaveNote={handleSaveNote}
        unsavedNoteIds={unsavedNoteIds}
        />
    </div>
  );
}
