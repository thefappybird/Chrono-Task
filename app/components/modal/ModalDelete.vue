<template>
  <div
    aria-label="Delete Form"
    class="flex delete-cont"
    v-if="task && !loading"
    v-focus-trap
  >
    <h2>Delete {{ task.title }}?</h2>
    <p>Are you sure you want to delete {{ task.title }}?</p>
    <p class="warning">This change is irreversible!</p>
    <div class="flex end-btns">
      <FormBtn
        class="cancel"
        :disabled="deleting"
        btn-label="Yes, Delete"
        btn-type="button"
        @click="onConfirm"
      />
      <FormBtn
        :focus="true"
        :disabled="false"
        btn-label="Cancel"
        type="button"
        btn-type="button"
        @click="onCancel"
      />
    </div>
  </div>
  <ModalDeleteSkeleton v-else />
</template>

<script setup lang="ts">
const modalStore = useModalStore();
const { interactingId } = storeToRefs(modalStore);
const { handleError } = useHandleError();
const { task, loading } = useTask(interactingId.value);
const { remove } = useCrud();
const { addToast } = useToastStore();
const interacting = interactingId.value;

const deleting = ref(false);

async function onConfirm() {
  if (!interactingId.value && !interacting) return;

  deleting.value = true;
  try {
    modalStore.closeModal();
    if (interacting) await remove(interacting);
    addToast;
  } catch (err) {
    handleError(err, "Failed to delete task.", "bad", "delete");
  } finally {
    deleting.value = false;
  }
}

function onCancel() {
  modalStore.closeModal();
}
</script>

<style scoped lang="scss">
.delete-cont {
  flex-direction: column;
  gap: 0.5rem;
  .end-btns {
    gap: 0.5rem;
    margin-left: auto;
  }
  .warning {
    font-weight: bold;
    color: var(--destructive);
  }
}
</style>
