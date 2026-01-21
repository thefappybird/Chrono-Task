const dropIndex = ref<number | null>(null);

// Shared task sorting: by position if available, otherwise by updatedAt
function sortTasks(tasks: Task[]): Task[] {
  return tasks.slice().sort((a, b) => {
    if (a.position != null && b.position != null)
      return a.position - b.position;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

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
  const { items, update, readOne } = useCrud();
  const columns = ref<Column[]>([]);

  function readColumns(
    filterKey: FilterKey | null = null,
    filter: string | string[] | null = null,
  ) {
    try {
      const cols: Column[] = [
        { id: "todo", title: "To Do", tasks: [] },
        { id: "in-progress", title: "In Progress", tasks: [] },
        { id: "done", title: "Completed", tasks: [] },
      ];

      for (const column of cols) {
        const sorted = sortTasks(
          items.value.filter((task: Task) => task.status === column.id),
        );
        column.tasks = filterTasks(sorted, filterKey, filter);
      }

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

    // Build date groups
    const groups: Record<string, Task[]> = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      groups[d.toISOString().slice(0, 10)] = [];
    }

    // Assign tasks by createdAt date
    for (const task of items.value) {
      const dateKey = new Date(task.createdAt).toISOString().slice(0, 10);
      if (groups[dateKey]) groups[dateKey].push(task);
    }

    // Create sorted columns with filtering applied
    const cols: Column[] = Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, tasks]) => ({
        id: date,
        title: date,
        tasks: filterTasks(sortTasks(tasks), filterKey, filter),
      }));

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
