export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  // SSR: no window/localStorage
  if (typeof window === "undefined") {
    return ref(initialValue) as Ref<T>;
  }

  const stored = localStorage.getItem(key);
  let parsed: T = initialValue;
  if (stored) {
    try {
      parsed = JSON.parse(stored) as T;
    } catch {
      parsed = initialValue;
    }
  }

  const state = ref<T>(parsed) as Ref<T>;
  watch(
    state,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    { deep: true },
  );

  return state;
}
