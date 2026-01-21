<template>
  <div
    class="task-card-expanded"
    :class="{ 'task-card-expanded--expanded': isExpanded }"
    v-focus-trap
  >
    <div class="task-card-expanded__header" @click="onHeaderClick">
      <span class="task-card-expanded__title">{{ task.title }}</span>
      <PillBadge
        :label="task.priority"
        v-bind="priorityColors(task.priority)"
        uppercase
      />
    </div>

    <div v-if="isExpanded" class="task-card-expanded__details">
      <p class="task-card-expanded__name">
        {{ task.assignee || "Unassigned" }}
      </p>
      <p class="task-card-expanded__description">
        {{ task.description || "No description" }}
      </p>
      <div class="task-card-expanded__meta">
        <div v-if="task.tags.length" class="task-card-expanded__tags">
          <PillBadge
            v-for="tag in task.tags"
            :key="tag"
            :label="tag"
            v-bind="tagColors"
          />
        </div>
      </div>
      <div class="task-card-expanded__footer">
        <PillBadge
          :label="task.status"
          v-bind="statusColors(task.status)"
          uppercase
        />
        <div v-if="showActions" class="task-card-expanded__actions">
          <ActionBtn
            icon="material-symbols:edit-outline"
            :title="`Edit ${task.title}`"
            @click.stop="openModal('edit', task.id ?? '')"
          />
          <ActionBtn
            icon="material-symbols:delete-outline"
            :title="`Delete ${task.title}`"
            @click.stop="openModal('delete', task.id ?? '')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    task: Task;
    expandable?: boolean;
    expanded?: boolean;
    showActions?: boolean;
  }>(),
  {
    expandable: false,
    expanded: true,
    showActions: true,
  },
);

const emit = defineEmits<{
  (e: "toggle", expanded: boolean): void;
}>();

const { openModal } = useModalStore();

// Internal expanded state (used when expandable is true)
const internalExpanded = ref(props.expanded);

// Computed to determine actual expanded state
const isExpanded = computed(() => {
  if (props.expandable) {
    return internalExpanded.value;
  }
  return props.expanded;
});

function onHeaderClick() {
  if (props.expandable) {
    internalExpanded.value = !internalExpanded.value;
    emit("toggle", internalExpanded.value);
  }
}

// Watch for external expanded prop changes when expandable
watch(
  () => props.expanded,
  (val) => {
    if (props.expandable) {
      internalExpanded.value = val;
    }
  },
);

function priorityColors(priority: Task["priority"]) {
  const map: Record<Task["priority"], { bg: string; fg: string }> = {
    high: { bg: "var(--destructive)", fg: "var(--destructive-foreground)" },
    medium: { bg: "var(--warning)", fg: "var(--background)" },
    low: { bg: "var(--success)", fg: "var(--background)" },
  };
  return map[priority];
}

function statusColors(status: Task["status"]) {
  const map: Record<Task["status"], { bg: string; fg: string }> = {
    todo: { bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
    "in-progress": { bg: "var(--primary)", fg: "var(--primary-foreground)" },
    done: { bg: "var(--success)", fg: "var(--background)" },
  };
  return map[status];
}

const tagColors = {
  bg: "var(--accent)",
  fg: "var(--accent-foreground)",
};
</script>

<style scoped lang="scss">
.task-card-expanded {
  background: var(--background);
  color: var(--foreground);
  padding: 0.75rem;
  border-radius: calc(var(--radius) * 0.8);
  box-shadow: 0 1px 2px oklch(0.13 0.01 260 / 0.07);
  border: 1px solid var(--border);
  margin-bottom: 0.5rem;
  margin: 0.25rem;
  min-width: 250px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: var(--primary);
  }

  &--expanded {
    box-shadow: 0 2px 8px oklch(0.13 0.01 260 / 0.12);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  &__title {
    font-weight: 600;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__details {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
  }

  &__name {
    font-weight: bold;
  }

  &__description {
    font-size: 0.875rem;
    color: var(--foreground);
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
