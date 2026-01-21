export function useTaskForm(
  modalType: Ref<"create" | "edit" | "delete" | null>,
  task: Ref<Task | null>,
) {
  const statusOptions = computed(() =>
    modalType.value === "create"
      ? ["To Do"]
      : ["To Do", "In Progress", "Completed"],
  );

  const form = reactive({
    title: "",
    description: "",
    priority: "Low",
    status: statusOptions.value[0],
    tags: [] as string[],
  });

  const errors = reactive({
    title: "",
    description: "",
  });

  function reset() {
    form.title = "";
    form.description = "";
    form.priority = "Low";
    form.status = statusOptions.value[0];
    form.tags = [];
    errors.title = "";
    errors.description = "";
  }

  watch(
    () => modalType.value,
    (val) => {
      if (val === "create") reset();
    },
  );

  watch(
    task,
    (t) => {
      if (modalType.value === "edit" && t) {
        form.title = t.title;
        form.description = t.description;
        form.priority = modelPriorityToUI(t.priority);
        form.status = modelStatusToUI(t.status);
        form.tags = [...(t.tags ?? [])];
      }
    },
    { immediate: true },
  );

  const isValid = computed(() => {
    errors.title = "";
    errors.description = "";

    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.description.trim())
      errors.description = "Description is required";

    return !errors.title && !errors.description;
  });

  function toPayload(): Partial<Task> {
    return {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: uiPriorityToModel(form.priority),
      status: uiStatusToModel(form.status ?? "todo"),
      tags: form.tags,
    };
  }

  return {
    form,
    errors,
    statusOptions,
    isValid,
    reset,
    toPayload,
  };
}
