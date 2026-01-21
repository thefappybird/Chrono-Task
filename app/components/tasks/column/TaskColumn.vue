<template>
  <section :id="col.id" class="task-column flex drop-zone">
    <header class="col-header flex">
      <div class="flex title">
        <h3>{{ col.title }}</h3>
      </div>
      <div class="actions flex">
        <button @click="openModal('create')" class="standard-btn flex">
          <Icon name="ic:outline-plus" width="24" height="24" />
        </button>
      </div>
    </header>
    <VirtualTaskCards
      :tasks="col.tasks"
      @drop="onDrop($event, col, 'status')"
      @dragenter.prevent
      @dragover.prevent
    />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  col: Column;
}>();

const { onDrop } = useColumns();

const { openModal } = useModalStore();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/globals.scss" as *;

.task-column {
  @include column-layout;
  flex: 1 1 0;
  .add-btn {
    padding: 1rem;
    margin-top: auto;
    button {
      color: var(--foreground);
      width: 100%;
    }
  }
}
</style>
