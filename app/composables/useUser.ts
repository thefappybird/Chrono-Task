const users = useLocalStorage<User[]>("users", []);
export function useUser() {
  const currentUser = localStorage.getItem("userId");

  const getUser = () => {
    const userId = currentUser ?? "";
    return users.value.find((u) => u.id === userId) ?? null;
  };

  const syncUser = (user: User) => {
    users.value = replaceById(users.value, user.id, () => user);
  };

  const addTask = (task: Task) => {
    const user = getUser();
    if (!user) return;
    user.Tasks.unshift(task);
    syncUser(user);
  };

  const removeTask = (taskId: string) => {
    const user = getUser();
    if (!user) return;
    user.Tasks = user.Tasks.filter((t) => t.id !== taskId);
    syncUser(user);
  };

  const updateTask = (updated: Task) => {
    const user = getUser();
    if (!user) return;
    user.Tasks = [updated, ...user.Tasks.filter((t) => t.id !== updated.id)];
    syncUser(user);
  };

  return { getUser, addTask, removeTask, updateTask };
}
