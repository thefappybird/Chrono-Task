<template>
  <div class="calendar-grid" ref="calendarGrid">
    <div
      v-for="column in columns"
      :key="column.id"
      class="calendar-column"
      :class="{ 'calendar-column--today': column.id === today }"
      :ref="(el) => setColumnRef(el as HTMLElement, column.id)"
    >
      <div class="calendar-column-header">
        <span class="calendar-column-date">{{
          formatColumnDate(column.id)
        }}</span>
        <div class="calendar-column-actions">
          <span class="calendar-column-count">{{ column.tasks.length }}</span>
          <ActionBtn
            icon="ic:outline-plus"
            title="Add task"
            @click="openModal('create')"
          />
        </div>
      </div>
      <div
        class="calendar-tasks"
        @drop="onDrop($event, column, 'date')"
        @dragenter.prevent
        @dragover.prevent
      >
        <TaskCardExpanded
          v-for="(task, index) in column.tasks"
          :key="task.id"
          :task="task"
          :expandable="true"
          :expanded="expandedTasks.has(task.id!)"
          @toggle="(val) => onTaskToggle(task.id!, val)"
          draggable="true"
          @dragstart="startDrag($event, task)"
          @dragover.prevent="onDragOver($event, index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: Column[];
}>();
const { openModal } = useModalStore();
const calendarGrid = ref<HTMLElement | null>(null);
const columnRefs = new Map<string, HTMLElement>();
const expandedTasks = ref<Set<string>>(new Set());
const today = new Date().toISOString().slice(0, 10);
const { onDrop, startDrag, onDragOver } = useColumns();

function setColumnRef(el: HTMLElement | null, id: string) {
  if (el) columnRefs.set(id, el);
}

function onTaskToggle(taskId: string, expanded: boolean) {
  if (expanded) {
    expandedTasks.value.add(taskId);
  } else {
    expandedTasks.value.delete(taskId);
  }
}

function scrollToToday() {
  const todayEl = columnRefs.get(today);
  if (calendarGrid.value && todayEl) {
    calendarGrid.value.scrollTo({
      left: todayEl.offsetLeft - calendarGrid.value.offsetLeft,
      behavior: "smooth",
    });
  }
}

onMounted(async () => {
  await nextTick();
  scrollToToday();
});
</script>

<style scoped lang="scss">
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
  color: var(--card-foreground);

  &--today {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--ring);
  }
}

.calendar-column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--popover);
  color: var(--popover-foreground);
  padding: 0.75rem 1rem;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
}

.calendar-column-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.calendar-column-date {
  font-size: 0.9rem;
}

.calendar-column-count {
  background: var(--secondary);
  color: var(--secondary-foreground);
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 1rem;
}

.calendar-tasks {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.calendar-task-item {
  margin-bottom: 0.5rem;
}
</style>
