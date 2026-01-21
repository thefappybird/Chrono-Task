<template>
  <div v-if="isOpen" id="modal" class="modal-bg" @click="modalStore.closeModal">
    <div class="modal-content" @click.stop>
      <ModalEditCreate v-if="modalType !== 'delete'" />
      <ModalDelete v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
const modalStore = useModalStore();

const { isOpen, modalType } = storeToRefs(modalStore);
</script>

<style scoped lang="scss">
.modal-bg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  background-color: rgba(15, 15, 15, 0.7);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: auto;
  .modal-content {
    background-color: var(--secondary);
    color: var(--foreground);
    padding: 1rem;
    border-radius: 0.5rem;
    max-width: 350px;
    width: 80%;
  }
}
</style>
