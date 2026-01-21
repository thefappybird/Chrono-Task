import { defineStore } from "pinia";

export const useViewStore = defineStore("view", () => {
  const view = useLocalStorage<ViewType>("view-mode", "board");

  function toggleView(type: ViewType) {
    view.value = type;
  }

  return {
    view,
    toggleView,
  };
});
