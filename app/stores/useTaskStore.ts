export const useTaskStore = defineStore("tasks", () => {
  const rawTasks = useLocalStorage<Task[]>("tasks", []);

  const tasksByStatus = computed(() => {
    const statuses: Status[] = ["todo", "in-progress", "done"];
    const columns: Record<Status, Task[]> = {
      todo: [],
      "in-progress": [],
      done: [],
    };

    statuses.forEach((status) => {
      columns[status] = rawTasks.value
        .filter((task) => task.status === status)
        .sort(
          (a, b) =>
            (a.position ?? 0) - (b.position ?? 0) ||
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
    });

    return columns;
  });

  const allTasks = computed(() => {
    return [...rawTasks.value].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  });

  const tasksByDate = computed(() => {
    const grouped: Record<string, Task[]> = {};

    rawTasks.value.forEach((task) => {
      const dateKey = new Date(task.updatedAt).toISOString().split("T")[0];
      if (dateKey) {
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(task);
      }
      return;
    });

    return grouped;
  });

  function addTask(task: Task) {
    const exists = rawTasks.value.find((t) => t.id === task.id);
    if (!exists) {
      rawTasks.value.unshift(task);
    }
  }

  function updateTask(task: Task) {
    const index = rawTasks.value.findIndex((t) => t.id === task.id);
    if (index >= 0) {
      rawTasks.value[index] = task;
    }
  }

  function removeTask(taskId: string) {
    rawTasks.value = rawTasks.value.filter((t) => t.id !== taskId);
  }

  function getTaskById(taskId: string) {
    return rawTasks.value.find((t) => t.id === taskId);
  }

  function updateTasks(tasks: Task[]) {
    rawTasks.value = tasks;
  }

  return {
    // State
    rawTasks,
    // Computed
    tasksByStatus,
    allTasks,
    tasksByDate,
    // Methods
    addTask,
    updateTask,
    removeTask,
    getTaskById,
    updateTasks,
  };
});
