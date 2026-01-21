export function priorityColors(priority: Task["priority"]) {
  const map: Record<Task["priority"], { bg: string; fg: string }> = {
    high: { bg: "var(--destructive)", fg: "var(--destructive-foreground)" },
    medium: { bg: "var(--warning)", fg: "var(--background)" },
    low: { bg: "var(--success)", fg: "var(--background)" },
  };
  return map[priority];
}

export function statusColors(status: Task["status"]) {
  const map: Record<Task["status"], { bg: string; fg: string }> = {
    todo: { bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
    "in-progress": { bg: "var(--primary)", fg: "var(--primary-foreground)" },
    done: { bg: "var(--success)", fg: "var(--background)" },
  };
  return map[status];
}

export const tagColors = {
  bg: "var(--accent)",
  fg: "var(--accent-foreground)",
};
