<template>
  <section
    id="dashboard-section"
    v-memo="[taskColumn, loading, view, showOptions]"
  >
    <ActionButtons :updateColumns="updateColumns" v-if="showOptions" />
    <button class="toggle-options" @click="toggleOptions">
      <Icon
        v-if="showOptions"
        name="teenyicons:up-solid"
        width="24"
        height="24"
      />
      <Icon v-else name="teenyicons:down-solid" width="24" height="24" />
    </button>
    <template v-if="view === 'board'">
      <DashView v-if="!loading" :columns="taskColumn" />
      <div v-else class="flex columns-skeleton">
        <TaskColumnSkeleton v-for="i in 3" :key="i" />
      </div>
    </template>
    <template v-else-if="view === 'list'">
      <ListView v-if="!loading" :columns="taskColumn" />
      <ListViewSkeleton v-else />
    </template>
    <template v-else-if="view === 'calendar'">
      <CalendarView v-if="!loading" :columns="taskColumn" />
      <CalendarViewSkeleton v-else />
    </template>
  </section>
</template>

<script setup lang="ts">
const taskColumn = ref<Column[]>([]);
const loading = ref<boolean>(false);
const showOptions = ref(false);
const { items } = useCrud();
const { readColumns, readColumnsByDate } = useColumns();
const { handleError } = useHandleError();
const { view } = storeToRefs(useViewStore());
// useWebSocket();

provide("loading", loading);

function toggleOptions() {
  showOptions.value = !showOptions.value;
}

onMounted(async () => {
  try {
    loading.value = true;
    const seededTasks = seedLocalStorage();
    // If we just seeded, sync to the reactive items ref
    if (seededTasks) {
      items.value = seededTasks;
    }
    if (taskColumn.value.length == 0) {
      let response;
      if (view.value !== "calendar") response = await readColumns();
      else response = await readColumnsByDate();
      if (response) {
        taskColumn.value = response;
      }
    }
  } catch (err) {
    handleError(err, "Could not fetch tasks.", "bad", null);
  } finally {
    loading.value = false;
  }
});

watch(
  [items, view],
  async () => {
    try {
      let response;
      loading.value = true;
      if (view.value !== "calendar") response = await readColumns();
      else response = await readColumnsByDate();
      if (response) {
        taskColumn.value = response;
      }
    } catch (err) {
      handleError(err, "Could not fetch tasks.", "bad", null);
    } finally {
      loading.value = false;
    }
  },
  { deep: true },
);
function updateColumns(filteredColumns: Column[]) {
  taskColumn.value = filteredColumns;
}
</script>

<style lang="scss" scoped>
.toggle-options {
  display: flex;
  align-items: center;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  scale: 180%;
  margin: 0 auto;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}

.toggle-options:hover {
  animation: bounce 1s;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-8px);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-4px);
  }
  80% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}

.columns-skeleton {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
}
</style>
