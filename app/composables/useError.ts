export function useHandleError() {
  const { addToast } = useToastStore();
  const { openModal } = useModalStore();

  function handleError(
    err: unknown,
    toastMessage: string,
    toastType: "good" | "bad",
    modalType: ModalType | null,
  ) {
    const error = err as OptimisticError;
    if (error.optimistic) {
      console.error("error", error);
      addToast(toastMessage, toastType);
      if (modalType) openModal(modalType, error.id);
    }
  }
  return {
    handleError,
  };
}
