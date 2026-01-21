import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([]);

  function addToast(description: string, type: "good" | "bad") {
    const newToast = {
      id: crypto.randomUUID(),
      description,
      type,
      timestamp: new Date(),
    };
    toasts.value.unshift(newToast);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 10000);
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter((toast: Toast) => toast.id !== id);
  }

  return {
    toasts,
    addToast,
    removeToast,
  };
});
