function randomId() {
  return crypto.randomUUID();
}

function randomPriority() {
  const priorities: Priority[] = ["low", "medium", "high"];
  const idx = Math.floor(Math.random() * priorities.length);
  return priorities[idx] ?? "low";
}

function randomStatus() {
  const statuses: Status[] = ["todo", "in-progress", "done"];
  const idx = Math.floor(Math.random() * statuses.length);
  return statuses[idx] ?? "todo";
}

function randomName() {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
  ];

  const first =
    firstNames[Math.floor(Math.random() * firstNames.length)] ?? "User";
  const last =
    lastNames[Math.floor(Math.random() * lastNames.length)] ?? "Anonymous";

  return `${first} ${last}`;
}

function randomTitle() {
  const titles = [
    "Design UI",
    "Fix bug",
    "Write docs",
    "Test feature",
    "Deploy app",
    "Refactor code",
    "Plan sprint",
    "Review PR",
    "Update dependencies",
    "Optimize DB",
  ];
  const idx = Math.floor(Math.random() * titles.length);
  const title = titles[idx] ?? "Task";
  return title + " #" + Math.floor(Math.random() * 1000);
}
function randomTags(max = 5): string[] {
  const tags = [
    "Design",
    "Fix",
    "Write",
    "Test",
    "Deploy",
    "Refactor",
    "Plan",
    "Review",
    "Update",
    "Optimize",
  ];

  const count = Math.floor(Math.random() * max) + 1; // 1 → max
  const shuffled = [...tags].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}

function randomDescription() {
  const descs = [
    "Lorem ipsum dolor sit amet.",
    "Consectetur adipiscing elit.",
    "Sed do eiusmod tempor.",
    "Incididunt ut labore et dolore.",
    "Magna aliqua.",
  ];
  const idx = Math.floor(Math.random() * descs.length);
  return descs[idx] ?? "No description.";
}

function randomAction() {
  const actions: Action[] = [
    "task:editing",
    "task:create",
    "task:update",
    "task:delete",
  ];
  const idx = Math.floor(Math.random() * actions.length);
  return actions[idx] ?? "task:create";
}

function randomTime() {
  return new Date(
    Date.now() - Math.floor(Math.random() * 100000000),
  ).toISOString();
}

function getRandomDayInPastWeek() {
  const today = new Date();
  const daysToSubtract = Math.floor(Math.random() * 7);
  today.setDate(today.getDate() - daysToSubtract);
  return today;
}
export function seedLocalStorage(): Task[] | null {
  if (!localStorage.getItem("tasks") || !localStorage.getItem("users")) {
    // Create users
    const users: User[] = Array.from({ length: 9 }, (_, i) => ({
      id: randomId(),
      name: randomName(),
      avatarUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
      Tasks: [],
    }));

    users.push({
      id: "04566f3e-e396-4106-9c82-da9fc3f1a6cd",
      name: "Alexander Banaag III",
      avatarUrl: `https://i.pravatar.cc/150?img=${10}`,
      Tasks: [],
    });

    // Create tasks
    const tasks: Task[] = Array.from({ length: 100 }, () => {
      const user = users[Math.floor(Math.random() * users.length)];
      const day = getRandomDayInPastWeek();
      const task: Task = {
        id: randomId(),
        assignee: user?.name ?? "",
        title: randomTitle(),
        description: randomDescription(),
        priority: randomPriority(),
        status: randomStatus(),
        tags: randomTags(),
        createdAt: day,
        updatedAt: day,
      };
      user?.Tasks.push(task);
      return task;
    });

    // Create activities
    const activities: Activity[] = Array.from({ length: 50 }, () => {
      const user = users[Math.floor(Math.random() * users.length)];
      const task = tasks[Math.floor(Math.random() * tasks.length)];
      return {
        id: randomId(),
        taskId: task?.id || "",
        userId: user?.id || "",
        action: randomAction(),
        time: randomTime(),
      };
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("activities", JSON.stringify(activities));

    return tasks;
  }

  return null;
}
