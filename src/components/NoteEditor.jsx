import React from "react";

/**
 * NoteEditor
 *
 * Right-hand side of the dashboard. Shows:
 * - Top header for the open note (delete button placeholder)
 * - Open note
 *
*/
export default function NoteEditor({ note }) {
  if (!note) {
    return (
      <main className="flex min-w-0 flex-1 items-center justify-center text-sm text-gray-500">
        No note selected.
      </main>
    );
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* Top bar for current note */}
      <header className="flex items-center justify-between border-b bg-white/90 px-4 py-3">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Open Note</h1>
        </div>
        <div className="hidden text-xs text-gray-500 sm:block">
          (Delete button goes here)
        </div>
      </header>

      {/* Editable area (visual only for now) */}
      <section className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto flex h-full max-w-3xl flex-col rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
          <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Title
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-lg bg-white font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Example: Product planning notes"
              defaultValue={note.title}
            />
          </label>

          <label className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-500">
            Body
            <textarea
              className="mt-1 h-full min-h-[220px] w-full resize-none rounded-xl bg-white border px-3 py-2 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your notes here (this is just a mock editor, no save logic yet)."
              defaultValue={note.body}
            />
          </label>

          <div className="mt-4 flex items-center justify-between border-t pt-3 text-[11px] text-gray-500">
            <span>Created · {note.created}</span>
            <span>Last updated · {note.updated}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
