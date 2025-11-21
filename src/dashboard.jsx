import React from "react";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      {/* Left: Notes list */}
      <aside className="flex w-80 shrink-0 flex-col border-r bg-white/90">
        {/* Header */}
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-semibold">
            N
          </div>
          <div>
            <div className="text-sm font-semibold">Sagar's Notes app</div>
            <div className="text-xs text-gray-500">Dashboard</div>
          </div>
        </div>

        {/* Notes list (static) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {mockNotes.map((note, index) => (
            <div
              key={note.id}
              className={`flex cursor-default flex-col rounded-xl border p-3 text-sm shadow-sm ${
                index === 0 ? "border-indigo-500 bg-indigo-50/60" : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{note.title}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                {note.preview}
              </p>
              <div className="mt-2 text-[11px] text-gray-400">Last updated · {note.updated}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right: Open note */}
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

        {/* Editable area (visual only) */}
        <section className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto flex h-full max-w-3xl flex-col rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Title
              <input
                className="mt-1 w-full rounded-lg border px-3 py-2 text-lg bg-white font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Example: Product planning notes"
                defaultValue={mockOpenNote.title}
              />
            </label>

            <label className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-500">
              Body
              <textarea
                className="mt-1 h-full min-h-[220px] w-full resize-none rounded-xl bg-white border px-3 py-2 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type your notes here (this is just a mock editor, no save logic yet)."
                defaultValue={mockOpenNote.body}
              />
            </label>

            <div className="mt-4 flex items-center justify-between border-t pt-3 text-[11px] text-gray-500">
              <span>Created · {mockOpenNote.created}</span>
              <span>Last updated · {mockOpenNote.updated}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static mock data for the dashboard (no behavior / no state)
// ---------------------------------------------------------------------------
const mockNotes = [
  {
    id: "1",
    title: "Daily planning ",
    preview: "Outline today’s tasks, meetings, and quick notes...",
    updated: "Today, 10:24 AM",
  },
  {
    id: "2",
    title: "Project: Notes app redesign",
    preview: "Questions about layout, search, and tagging for the next iteration...",
    updated: "Yesterday, 5:12 PM",
  },
  {
    id: "3",
    title: "Ideas: keyboard shortcuts",
    preview: "Cmd+N for new note, Cmd+K quick jump, inline formatting options...",
    updated: "Nov 17, 2025",
  },
  {
    id: "4",
    title: "Meeting notes — team sync",
    preview: "Decisions, action items, and follow-ups from the weekly check-in...",
    updated: "Nov 15, 2025",
  },
];

const mockOpenNote = {
  title: "Project: Notes app redesign",
  body:
    "This is a sample note body. Use this area to experiment with your layout, spacing, and typography. " +
    "In the real app, typing here would update the currently selected note on the left. Right now it's just a static example.",
  created: "Nov 14, 2025",
  updated: "Yesterday, 5:12 PM",
};
