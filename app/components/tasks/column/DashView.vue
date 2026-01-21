<template>
  <div class="dashboard" aria-label="Dashboard">
    <TaskColumnSkeleton
      v-if="loading"
      v-for="index in 3"
      :key="index"
      :card-count="3"
    />
    <TaskColumn
      v-else
      v-for="col in columns"
      :key="col.id"
      :col="col"
      tabindex="0"
      role="region"
      :aria-labelledby="`${col.id}-title`"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: Column[];
}>();

const loading = inject("loading");
</script>

<style scoped lang="scss">
.dashboard {
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  overflow-x: auto;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(300px, 1fr));
  }
}
</style>
