export const searchResolvers: Record<FilterKey, (task: Task) => string[]> = {
  title: (task) => [task.title],
  tags: (task) => task.tags ?? [],
  assignee: (task) => [task.assignee ?? ""],
  priority: (task) => [task.priority],
};
