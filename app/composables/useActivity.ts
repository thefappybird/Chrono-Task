const activities = useLocalStorage<Activity[]>("activities", []);
const users = useLocalStorage<User[]>("users", []);
const tasks = useLocalStorage<Task[]>("tasks", []);

export function useActivity() {
  const toast = useToastStore();

  const generatorRunning = ref(false);
  let timer: number | null = null;

  function addActivity(data: Partial<Activity>, type?: "good" | "bad") {
    const activity: Activity = {
      id: data.id ?? crypto.randomUUID(),
      taskId: data.taskId ?? "",
      userId: data.userId ?? "",
      action: (data.action as Action) ?? "editing:start",
      time: data.time ?? new Date().toISOString(),
    };
    activities.value.unshift(activity);
    showActivityToast(activity, type);
    return activity;
  }

  function showActivityToast(
    activity: Activity,
    overrideType?: "good" | "bad",
  ) {
    const user = users.value.find((u) => u.id === activity.userId);
    const task = tasks.value.find((t) => t.id === activity.taskId);
    const username = user?.name ?? "Someone";
    const taskTitle = task?.title ? `: '${task.title}'` : "";
    let description = "";
    let type: "good" | "bad" = overrideType ?? "good";
    switch (activity.action) {
      case "task:editing":
        description = `${username} is editing a task ${taskTitle}`;
        break;
      case "task:create":
        description = `${username} created a new task ${taskTitle}`;
        break;
      case "task:update":
        description = `${username} updated a task ${taskTitle}`;
        break;
      case "task:delete":
        description = `${username} deleted a task ${taskTitle}`;
        type = "bad";
        break;
      default:
        description = `${username} did something ${taskTitle}`;
    }
    toast.addToast(description, type);
  }

  function createRandomActivity() {
    if (!users.value.length) return;
    const randomUser =
      users.value[Math.floor(Math.random() * users.value.length)];
    const actionPool: Action[] = [
      "task:editing",
      "task:create",
      "task:update",
      "task:delete",
    ];
    const action = actionPool[Math.floor(Math.random() * actionPool.length)];
    const maybeTask = tasks.value.length
      ? tasks.value[Math.floor(Math.random() * tasks.value.length)]
      : undefined;
    if (randomUser) {
      addActivity({
        userId: randomUser.id,
        taskId: maybeTask?.id,
        action,
        time: new Date().toISOString(),
      });
    }
  }

  function startGenerator(minSeconds = 5, maxSeconds = 15) {
    if (generatorRunning.value) return;
    generatorRunning.value = true;
    const scheduleNext = () => {
      if (!generatorRunning.value) return;
      const minMs = Math.max(0, Math.floor(minSeconds) * 1000);
      const maxMs = Math.max(minMs, Math.floor(maxSeconds) * 1000);
      const delta = maxMs - minMs;
      const intervalMs = minMs + Math.floor(Math.random() * (delta + 1));
      timer = window.setTimeout(() => {
        createRandomActivity();
        scheduleNext();
      }, intervalMs) as unknown as number;
    };
    scheduleNext();
  }

  function stopGenerator() {
    if (timer) {
      clearTimeout(timer as number);
      timer = null;
    }
    generatorRunning.value = false;
  }

  function simulateOtherUserEditing(taskId: string) {
    const currentUserId = localStorage.getItem("userId") ?? "";
    const otherUsers = users.value.filter((u) => u.id !== currentUserId);
    if (!otherUsers.length) return;
    const randomUser =
      otherUsers[Math.floor(Math.random() * otherUsers.length)];
    if (randomUser) {
      addActivity({
        userId: randomUser.id,
        taskId,
        action: "task:editing",
        time: new Date().toISOString(),
      });
    }
  }

  function isTaskRecentlyEditedByOther(taskId: string) {
    const currentUserId = localStorage.getItem("userId") ?? "";
    const now = Date.now();
    return activities.value.some(
      (a) =>
        a.taskId === taskId &&
        a.action === "task:editing" &&
        a.userId !== currentUserId &&
        now - new Date(a.time).getTime() <= 10000,
    );
  }

  function checkAndBlockIfEdited(taskId: string) {
    if (isTaskRecentlyEditedByOther(taskId)) {
      toast.addToast("Another user is currently editing this task!", "bad");
      return false;
    }
    return true;
  }

  onBeforeUnmount(() => stopGenerator());

  return {
    activities,
    addActivity,
    createRandomActivity,
    startGenerator,
    stopGenerator,
    generatorRunning,
    simulateOtherUserEditing,
    isTaskRecentlyEditedByOther,
    checkAndBlockIfEdited,
  };
}
