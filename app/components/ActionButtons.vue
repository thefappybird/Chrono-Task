<template>
  <div aria-label="User Controls" class="flex user-controls">
    <FilterTasks @update:columns="updateColumns" />
    <div class="select-field">
      <SelectField
        title="view"
        label="Change View"
        :options="viewOptions"
        :model-value="viewRef"
        @update:model-value="onViewChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  updateColumns: (filteredColumns: Column[]) => void;
}>();
const viewStore = useViewStore();
const view = storeToRefs(viewStore).view;

const viewRef = ref(view);

const viewOptions = ["Board", "List", "Calendar"];

function onViewChange(value: string | null) {
  viewStore.toggleView(value as ViewType);
}
</script>

<style scoped lang="scss">
.user-controls {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
}

.select-field {
  width: 250px;
}
</style>
