const items = useLocalStorage<Task[]>("tasks", []);

export function useCrud() {
  const user = useUser();
  const activity = useActivity();
  function delay(ms = 400, retries = 5, failureRate = 0.5): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const tryDelay = () => {
        setTimeout(() => {
          attempts++;

          if (Math.random() < failureRate) {
            if (attempts < retries) {
              tryDelay(); // retry
            } else {
              reject(new Error("Random simulated error after retries"));
            }
          } else {
            resolve();
          }
        }, ms);
      };

      tryDelay();
    });
  }

  async function create(data: Partial<Task>, options: CrudOptions = {}) {
    const optimisticItem: Task = {
      ...data,
      id: crypto.randomUUID(),
      assignee: options.user ?? "Alexander Banaag III",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Task;
    const previousItems = items.value.slice();
    items.value.unshift(optimisticItem);
    try {
      await delay(400, 5, 0.2);
      user.addTask(optimisticItem);
      logActivity("task:create", optimisticItem.id);
      return optimisticItem;
    } catch (error) {
      items.value = previousItems;
      throw Object.assign(error as Error, {
        id: optimisticItem.id,
        optimistic: true,
      });
    }
  }

  async function read(options: CrudOptions = {}) {
    await delay(400, 0, 0); //read has no failure simulation

    return [...items.value].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }

  async function readOne(id?: string) {
    await delay(400, 0, 0); //readOne has no failure simulation
    if (!id) throw new Error("No ID provided to readOne");

    return items.value.find((item: Task) => item.id === id);
  }

  async function update(data: Partial<Task>, id?: string) {
    if (id === undefined) throw new Error("No ID provided to update");
    const prevItem = await readOne(id);
    if (!prevItem) return;

    // 30% chance to simulate another user editing this task
    if (Math.random() < 0.3) activity.simulateOtherUserEditing(id);
    if (!activity.checkAndBlockIfEdited(id)) {
      throw Object.assign(
        new Error("Edit conflict: another user is editing this task."),
        {
          id,
          optimistic: false,
          conflict: true,
        },
      );
    }

    const optimisticItem: Task = {
      ...prevItem,
      ...data,
      updatedAt: new Date(),
    };
    items.value = replaceById(items.value, id, () => optimisticItem);

    try {
      await delay(400, 5, 0.2);
      user.updateTask(optimisticItem);
      logActivity("task:update", optimisticItem.id);
      return optimisticItem;
    } catch (error) {
      // rollback
      items.value = replaceById(items.value, id, (item) =>
        item.updatedAt === optimisticItem.updatedAt ? prevItem : item,
      );
      throw Object.assign(error as Error, {
        id,
        optimistic: true,
      });
    }
  }

  async function remove(id?: string) {
    if (id === undefined) throw new Error("No ID provided to update");
    const prevItem = items.value.find((item) => item.id === id);
    if (!prevItem) return; // idempotent
    items.value = items.value.filter((item) => item.id !== id);
    try {
      await delay(400, 5, 0.2);
      user.removeTask(id);
      logActivity("task:delete", id);
    } catch (error) {
      const stillDeleted = !items.value.some((item) => item.id === id);
      if (stillDeleted) items.value = [...items.value, prevItem];
      throw Object.assign(error as Error, {
        id,
        optimistic: true,
      });
    }
  }

  function logActivity(action: Action, taskId?: string) {
    try {
      if (!taskId) throw new Error("No taskId provided for activity log");
      const currentUserId =
        user.getUser()?.id ?? localStorage.getItem("userId") ?? "";
      activity.addActivity({
        userId: currentUserId,
        taskId,
        action,
        time: new Date().toISOString(),
      });
    } catch (e) {}
  }

  return {
    items,
    create,
    read,
    readOne,
    update,
    remove,
  };
}
