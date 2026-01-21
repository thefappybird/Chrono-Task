export function modelPriorityToUI(p?: Priority) {
  if (!p) return "Low";
  return p.charAt(0).toUpperCase() + p.slice(1);
}

export function uiPriorityToModel(s: string): Priority {
  return (s || "Low").toLowerCase() as Priority;
}

export function modelStatusToUI(s?: Status) {
  if (!s) return "To Do";
  if (s === "todo") return "To Do";
  if (s === "in-progress") return "In Progress";
  if (s === "done") return "Completed";
  return "To Do";
}

export function uiStatusToModel(s: string): Status {
  if (!s) return "todo";
  if (s === "To Do") return "todo";
  if (s === "In Progress") return "in-progress";
  if (s === "Completed") return "done";
  return "todo";
}
