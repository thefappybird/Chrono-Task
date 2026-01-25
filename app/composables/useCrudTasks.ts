export function useCrud() {
  const taskStore = useTaskStore();
  const user = useUser();
  const activity = useActivity();
  const { broadcastActivity } = useWebSocket();

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

    // Optimistic update to store
    taskStore.addTask(optimisticItem);

    try {
      await delay(400, 5, 0.2);
      user.addTask(optimisticItem);
      logActivity("task:create", optimisticItem.id);
      return optimisticItem;
    } catch (error) {
      // Rollback
      taskStore.removeTask(optimisticItem.id!);
      throw Object.assign(error as Error, {
        id: optimisticItem.id,
        optimistic: true,
      });
    }
  }

  async function read(options: CrudOptions = {}) {
    await delay(400, 0, 0);
    return taskStore.allTasks;
  }

  async function readOne(id?: string) {
    await delay(400, 0, 0);
    if (!id) throw new Error("No ID provided to readOne");
    return taskStore.getTaskById(id) ?? null;
  }

  async function update(data: Partial<Task>, id?: string) {
    if (id === undefined) throw new Error("No ID provided to update");
    const prevItem = taskStore.getTaskById(id);
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

    // Optimistic update to store
    taskStore.updateTask(optimisticItem);

    try {
      await delay(400, 5, 0.2);
      user.updateTask(optimisticItem);
      logActivity("task:update", optimisticItem.id);
      return optimisticItem;
    } catch (error) {
      // Rollback
      taskStore.updateTask(prevItem);
      throw Object.assign(error as Error, {
        id,
        optimistic: true,
      });
    }
  }

  async function remove(id?: string) {
    if (id === undefined) throw new Error("No ID provided to update");
    const prevItem = taskStore.getTaskById(id);
    if (!prevItem) return; // idempotent

    // Optimistic removal from store
    taskStore.removeTask(id);

    try {
      await delay(400, 5, 0.2);
      user.removeTask(id);
      logActivity("task:delete", id);
    } catch (error) {
      // Rollback
      taskStore.addTask(prevItem);
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
      const loggedActivity = activity.addActivity({
        userId: currentUserId,
        taskId,
        action,
        time: new Date().toISOString(),
      });
      broadcastActivity(loggedActivity);
    } catch (e) {}
  }

  return {
    create,
    read,
    readOne,
    update,
    remove,
  };
}
