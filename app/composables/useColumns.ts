const dropIndex = ref<number | null>(null);

// Shared filtering logic for tasks
function filterTasks(
  tasks: Task[],
  filterKey: FilterKey | null,
  filter: string | string[] | null,
): Task[] {
  if (!filterKey || !filter) return tasks;

  const tokens = normalizeFilter(filter);
  return tasks.filter((task) => {
    const searchableValues = searchResolvers[filterKey](task).map((v) =>
      v.toLowerCase(),
    );
    return tokens.every((token) =>
      searchableValues.some((value) => value.includes(token)),
    );
  });
}

export function useColumns() {
  const taskStore = useTaskStore();
  const { tasksByStatus, tasksByDate } = storeToRefs(taskStore);
  const { update, readOne } = useCrud();
  const columns = ref<Column[]>([]);

  function readColumns(
    filterKey: FilterKey | null = null,
    filter: string | string[] | null = null,
  ) {
    try {
      const cols: Column[] = [
        {
          id: "todo",
          title: "To Do",
          tasks: filterTasks(tasksByStatus.value.todo, filterKey, filter),
        },
        {
          id: "in-progress",
          title: "In Progress",
          tasks: filterTasks(
            tasksByStatus.value["in-progress"],
            filterKey,
            filter,
          ),
        },
        {
          id: "done",
          title: "Completed",
          tasks: filterTasks(tasksByStatus.value.done, filterKey, filter),
        },
      ];

      columns.value = cols;
      return cols;
    } catch (error) {
      throw error;
    }
  }

  // Group tasks into columns by createdAt date (YYYY-MM-DD)
  function readColumnsByDate(
    filterKey: FilterKey | null = null,
    filter: string | string[] | null = null,
  ) {
    // Date range: start of current month to end of next month
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 2, 0);

    // Create columns for each date in the range
    const cols: Column[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().slice(0, 10);
      const tasksForDate = tasksByDate.value[dateKey] || [];
      cols.push({
        id: dateKey,
        title: dateKey,
        tasks: filterTasks(tasksForDate, filterKey, filter),
      });
    }

    columns.value = cols;
    return cols;
  }
  function startDrag(event: DragEvent, item: Task) {
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      if (item.id) event.dataTransfer.setData("taskId", item.id);
    }
  }
  function onDragOver(event: DragEvent, index: number) {
    dropIndex.value = index;
  }
  async function onDrop(
    event: DragEvent,
    list: Column, // already the target column
    condition?: "date" | "status",
  ) {
    const taskId = event.dataTransfer?.getData("taskId");
    if (!taskId) return;

    const task = await readOne(taskId);
    if (!task) return;
    const columnTasks = list.tasks; // use the column passed in

    if (task.status === list.id) {
      const oldIndex = columnTasks.findIndex((t) => t.id === task.id);
      if (oldIndex === -1) return;

      // fallback if dropIndex not set
      const newIndex = dropIndex.value ?? columnTasks.length - 1;

      if (oldIndex === newIndex) return;

      columnTasks.splice(oldIndex, 1);
      columnTasks.splice(newIndex, 0, task);

      // update positions
      columnTasks.forEach((t, i) => (t.position = i));
    } else {
      // moving to a different column
      let itemToUpdate = {};
      if (condition === "date") {
        itemToUpdate = { createdAt: list.id as string };
      } else {
        itemToUpdate = { status: list.id as Status };
      }
      await update(itemToUpdate, taskId);
    }

    dropIndex.value = null;
  }

  return {
    columns,
    onDragOver,
    readColumns,
    readColumnsByDate,
    startDrag,
    onDrop,
  };
}
