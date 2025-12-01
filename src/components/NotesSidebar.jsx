import React from "react";

/**
 * NotesSidebar
 *
 * Left-hand side of the dashboard. Shows:
 * - Small header with app name
 * - List of notes
 *
 * For now this is "dumb" UI: it just receives notes + selectedNoteId
 * and displays them. It does NOT manage any state by itself.
 */
export default function NotesSidebar({ notes, selectedNoteId }) {
  return (
    <aside className="flex w-80 shrink-0 flex-col border-r bg-white/90">
      {/* Header */}
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-semibold">
          N
        </div>
        <div>
          <div className="text-sm font-semibold">Sagar&apos;s Notes app</div>
          <div className="text-xs text-gray-500">Dashboard</div>
        </div>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {notes.map((note) => {
          const isActive = note.id === selectedNoteId;

          return (
            <div
              key={note.id}
              className={[
                "flex flex-col rounded-xl border p-3 text-sm shadow-sm",
                "transition-colors",
                isActive
                  ? "border-indigo-500 bg-indigo-50/60"
                  : "border-gray-200 bg-white hover:bg-gray-50 cursor-default",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{note.title}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                {note.preview}
              </p>
              <div className="mt-2 text-[11px] text-gray-400">
                Last updated · {note.updated}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
