export const initialNotes = [
    {
      id: "1",
      title: "Daily planning",
      preview: "Outline today’s tasks, meetings, and quick notes...",
      body:
        "Today’s plan:\n\n" +
        "- Review open tasks for the notes app\n" +
        "- Plan next UI improvements\n" +
        "- Capture any ideas that come up\n\n" +
        "Use this note to quickly jot down what needs to happen.",
      created: "Nov 17, 2025",
      updated: "Today, 10:24 AM",
    },
    {
      id: "2",
      title: "Project: Notes app redesign",
      preview: "Questions about layout, search, and tagging for the next iteration...",
      body:
        "This is a sample note body for the notes app redesign.\n\n" +
        "- Left: list of notes\n" +
        "- Right: editable note area\n" +
        "- Later: search flag, auto-save, and shortcuts\n\n" +
        "Right now we are focusing on basic selection & editing.",
      created: "Nov 14, 2025",
      updated: "Yesterday, 5:12 PM",
    },
    {
      id: "3",
      title: "Ideas: keyboard shortcuts",
      preview:
        "Cmd+N for new note, Cmd+K quick jump, inline formatting options...",
      body:
        "Keyboard shortcut ideas:\n\n" +
        "- Cmd/Ctrl + N → new note\n" +
        "- Cmd/Ctrl + F → focus search\n" +
        "- Cmd/Ctrl + B/I/U → formatting (future)\n\n" +
        "Keep collecting ideas here.",
      created: "Nov 10, 2025",
      updated: "Nov 17, 2025",
    },
    {
      id: "4",
      title: "Meeting notes — team sync",
      preview:
        "Decisions, action items, and follow-ups from the weekly check-in...",
      body:
        "Weekly team sync notes:\n\n" +
        "Decisions:\n" +
        "- Start with a simple notes dashboard\n" +
        "- Ship small, frequent commits\n\n" +
        "Action items:\n" +
        "- Implement selection state\n" +
        "- Improve editor UX\n" +
        "- Add new/delete in later commits.",
      created: "Nov 8, 2025",
      updated: "Nov 15, 2025",
    },
  ];
  
  // Default selected note when the app starts.
export const DEFAULT_SELECTED_NOTE_ID = "2";
  