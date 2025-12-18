import React, { useState, useEffect } from "react";
import ModalPortal from "./ModalPortal";
/**
 * NoteEditor
 *
 * Right-hand side of the dashboard. Shows:
 * - Top header for the open note (delete button placeholder)
 * - Open note
 */

export default function NoteEditor({ note, onChangeNote, onSaveNotes, onAddNote, hasNotes, onDeleteNote, hasUnsavedChanges}) {

  const AUTO_DELETE_SECONDS = 5;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(AUTO_DELETE_SECONDS);
  const autoDeleteTimeoutRef = React.useRef(null);
  const intervalRef = React.useRef(null);

  useEffect(() => {
    if (!showDeleteModal) return;
  
    // clear any previous timers
    if (autoDeleteTimeoutRef.current) clearTimeout(autoDeleteTimeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  
    setSecondsLeft(AUTO_DELETE_SECONDS);
  
    // tick label every second
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
  
    // auto-delete after 5 seconds (even without confirmation)
    autoDeleteTimeoutRef.current = setTimeout(() => {
      onDeleteNote?.(note.id);
      setShowDeleteModal(false);
    }, AUTO_DELETE_SECONDS * 1000);

    return () => {
      if (autoDeleteTimeoutRef.current) clearTimeout(autoDeleteTimeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showDeleteModal, note?.id, onDeleteNote]);
  


  if (!note) {
    return (
        <main className="flex min-w-0 flex-1 items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm text-center">
                <h2 className="text-base font-semibold text-gray-900">
                {hasNotes ? "Select a note to edit" : "No notes yet"}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                {hasNotes
                    ? "Choose a note from the list on the left to start editing or create a new one."
                    : "Create your first note to get started."}
                </p>

                <button
                    type="button"
                    onClick={onAddNote}
                    className="mt-4 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 transition"
                >
                    + New Note
                </button>

                <p className="mt-3 text-xs text-gray-400">
                Tip: Don’t forget to hit <span className="font-medium">Save</span> after editing.
                </p>
            </div>
        </main>
    );
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white/90 px-4 py-3">
        <h1 className="text-sm font-semibold text-gray-900">Open Note</h1>

        <div className="hidden justify-center align-middle items-center gap-2 text-xs text-gray-500 sm:flex">
          {hasUnsavedChanges && (
            <span className="text-[11px] text-amber-600 font-medium">
              Unsaved changes
            </span>
          )}
          
          <button
            type="button"
            onClick={onSaveNotes}
            disabled={!hasUnsavedChanges}
            className={[
              "px-5 py-2 rounded-lg transition-colors text-xs font-semibold",
              hasUnsavedChanges
                ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                : "bg-gray-200 text-gray-500 cursor-not-allowed",
            ].join(" ")}
          >
            Save
          </button>
          <button
              type="button"
              onClick={() => {
                setSecondsLeft(AUTO_DELETE_SECONDS);
                setShowDeleteModal(true);
              }}
              className="p-2 bg-purple-400 text-white rounded-lg hover:bg-purple-700 active:bg-purple-800 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                      4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 
                      1 0 00-1 1v3M4 7h16"
                  />
              </svg>
          </button>
        </div>
      </header>

      {/* Editor */}
      <section className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto flex h-full flex-col rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
          <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Title
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-lg bg-white font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
              value={note.title}
              onChange={(e) =>
                onChangeNote?.(note.id, { title: e.target.value })
              }
              placeholder="Untitled note"
            />
          </label>

          <label className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-500">
            Body
            <textarea
              className="mt-1 h-full min-h-[220px] w-full resize-none rounded-xl bg-white border px-3 py-2 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500"
              value={note.body}
              onChange={(e) =>
                onChangeNote?.(note.id, { body: e.target.value })
              }
              placeholder="Start typing your notes…"
            />
          </label>

          <div className="mt-4 flex items-center justify-between border-t pt-3 text-[11px] text-gray-500">
            <span>Created · {note.created}</span>
            <span>Last updated · {note.updated}</span>
          </div>
        </div>
      </section>

      {/* Portal modal*/}
      {showDeleteModal && (
        <ModalPortal>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-lg border">
              <div className="p-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Delete this note?
                </h2>
                <p className="mt-1 text-xs text-gray-600">
                  This will auto-delete in {secondsLeft}s if not canceled.
                </p>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-3 py-1.5 rounded-lg border bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onDeleteNote?.(note.id);
                      setShowDeleteModal(false);
                    }}
                    className="relative overflow-hidden px-4 py-2 rounded-lg text-xs font-semibold text-white"
                  >
                    <span className="absolute inset-0 bg-purple-800" />

                    <span
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-700 opacity-95"
                      style={{
                        width: `${((AUTO_DELETE_SECONDS - secondsLeft) / AUTO_DELETE_SECONDS) * 100}%`,
                        transition: "width 1s linear",
                      }}
                    />

                    {/* Slight shine line at the leading edge */}
                    <span
                      className="absolute inset-y-0 left-0 w-2 bg-white/25 blur-sm"
                      style={{
                        transform: `translateX(${((AUTO_DELETE_SECONDS - secondsLeft) / AUTO_DELETE_SECONDS) * 100}%)`,
                        transition: "transform 1s linear",
                      }}
                    />

                    {/* Label */}
                    <span className="relative z-10">
                      Delete {secondsLeft > 0 ? `(${secondsLeft}s)` : ""}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

    </main>
  );
}
