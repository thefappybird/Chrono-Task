export function useTask(id: string | null) {
  const task = ref<Task | null>(null);
  const loading = ref(false);

  onMounted(async () => {
    if (!id) return;

    try {
      loading.value = true;
      const result = await useCrud().readOne(id);
      if (result) task.value = result;
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error(err);
      }
    } finally {
      loading.value = false;
    }
  });

  return { task, loading };
}
