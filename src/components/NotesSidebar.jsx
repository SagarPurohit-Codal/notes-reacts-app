import React from "react";

/**
 * NotesSidebar
 *
 * Left-hand side of the dashboard. Shows:
 * - Small header with app name
 * - List of notes
 *
 */

const getPreview = (body) => {
    if (!body) return "";
    const firstLine = body.split("\n")[0].trim();
    return firstLine.length > 60
      ? firstLine.slice(0, 60) + "..."
      : firstLine;
  };

export default function NotesSidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onAddNote,
}) {
  return (
    <aside className="flex w-80 shrink-0 flex-col border-r bg-white/90">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-semibold">
          N
        </div>
        <div>
          <div className="text-sm font-semibold">Sagar&apos;s Notes app</div>
          <div className="text-xs text-gray-500">Dashboard</div>
        </div>
        {/* New note button */}
        <button
            type="button"
            onClick={onAddNote}
            className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-200 transition ml-auto"
        >
            + New
        </button>

      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {notes.map((note) => {
          const isActive = note.id === selectedNoteId;

          return (
            <button
              key={note.id}
              type="button"
              onClick={() => onSelectNote?.(note.id)}
              className={[
                "flex w-full flex-col rounded-xl border p-3 text-left text-sm shadow-sm",
                "transition-colors",
                isActive
                  ? "border-indigo-500 bg-indigo-50/60"
                  : "border-gray-200 bg-white hover:bg-gray-50",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{note.title}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                {getPreview(note.body)}
              </p>
              <div className="mt-2 text-[11px] text-gray-400">
                Last updated · {note.updated}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
