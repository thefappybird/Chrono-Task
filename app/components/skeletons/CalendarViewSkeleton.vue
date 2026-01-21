<template>
  <div class="calendar-grid skeleton">
    <div v-for="i in columnCount" :key="i" class="calendar-column">
      <div class="calendar-column-header">
        <span class="skeleton-date"></span>
        <span class="skeleton-count"></span>
      </div>
      <div class="calendar-tasks">
        <div v-for="j in getTaskCount(i)" :key="j" class="calendar-task">
          <div class="calendar-task__header">
            <span class="skeleton-title"></span>
            <span class="skeleton-badge"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  columnCount?: number;
}>();

const columnCount = props.columnCount ?? 5;

function getTaskCount(index: number): number {
  // Vary task count per column for realistic look
  const counts = [2, 3, 1, 4, 2];
  return counts[index % counts.length] ?? 2;
}
</script>

<style scoped lang="scss">
@use "~/assets/styles/globals.scss" as *;

.calendar-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(300px, 1fr);
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  height: 80vh;
  background: var(--background);
}

.calendar-column {
  display: flex;
  flex-direction: column;
  background: var(--card);
  border-radius: var(--radius);
  min-width: 300px;
  max-height: 100%;
  overflow: hidden;
  border: 1px solid var(--border);
}

.calendar-column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--popover);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
}

.calendar-tasks {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.calendar-task {
  background: var(--background);
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border-radius: calc(var(--radius) * 0.8);
  border: 1px solid var(--border);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
}

.skeleton {
  .skeleton-date {
    height: 1rem;
    width: 100px;
    border-radius: 0.25rem;
    @include skeleton-shimmer();
  }

  .skeleton-count {
    height: 1.25rem;
    width: 28px;
    border-radius: 1rem;
    @include skeleton-shimmer();
  }

  .skeleton-title {
    height: 1rem;
    width: 70%;
    border-radius: 0.25rem;
    @include skeleton-shimmer();
  }

  .skeleton-badge {
    height: 1.25rem;
    width: 50px;
    border-radius: 0.25rem;
    @include skeleton-shimmer();
  }
}
</style>
