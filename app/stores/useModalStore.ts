import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const modalType = ref<ModalType | null>(null);
  const interactingId = ref<string | null>(null);

  function openModal(type: ModalType, id: string | null = null) {
    isOpen.value = true;
    modalType.value = type;
    interactingId.value = id;
  }

  function closeModal() {
    isOpen.value = false;
    modalType.value = null;
    interactingId.value = null;
  }

  return {
    isOpen,
    modalType,
    interactingId,
    closeModal,
    openModal,
  };
});
