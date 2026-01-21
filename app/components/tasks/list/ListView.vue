<template>
  <div class="list-view" aria-label="List View">
    <div
      class="list-row"
      v-for="col in columns"
      :key="col.id"
      :data-col-id="col.id"
    >
      <div class="list-col">
        <div class="flex list-header">
          <h1>{{ col.title }}</h1>
          <button class="standard-btn flex">
            <Icon name="ic:outline-plus" width="24" height="24" />
          </button>
        </div>
        <VirtualTaskCards
          class="lists"
          v-if="!loading"
          :tasks="col.tasks"
          horizontal
          @drop="onDrop($event, col, 'status')"
          @dragenter.prevent
          @dragover.prevent
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: Column[];
  minCardWidth?: number;
}>();

const loading = inject("loading");
const { onDrop } = useColumns();
</script>

<style scoped lang="scss">
.list-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 1rem;
}
.list-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
}

.list-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 275px;
  overflow: hidden;
  border: 1px solid grey;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    button {
      align-items: center;
      color: var(--sidebar-foreground);
    }
  }
  .lists {
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow-x: auto;
  }
}
</style>
