<template>
  <div class="task-filter" v-focus-trap>
    <div class="task-filter__filter">
      <SelectField
        title="filterKey"
        label="Filter By"
        :options="['Assignee', 'Title', 'Priority', 'Tags']"
        v-model="filterKey"
      />
    </div>
    <div class="flex task-filter__filter" v-if="filterKey !== null">
      <SelectField
        v-if="filterKey === 'priority'"
        title="filterValue"
        label="Value"
        :options="['Low', 'Medium', 'High']"
        v-model="filterValue"
      />
      <TagField
        v-else-if="filterKey === 'tags'"
        label="Tags"
        placeholder="Press enter to add tag"
        v-model="tagsValue"
      />
      <FormField
        v-else
        title="filterValue"
        label="Value"
        v-model="filterValue"
        :placeholder="placeholderText"
        :focus="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "update:columns", columns: Column[]): void;
}>();
const { view } = storeToRefs(useViewStore());
const { readColumns, readColumnsByDate } = useColumns();
const { handleError } = useHandleError();

const filterKey = ref<FilterKey | null>(null);
const filterValue = ref<string>("");
const tagsValue = ref<string[]>([]);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const placeholderText = computed<string>(() => {
  if (filterKey.value === "priority") return "Low, Medium, High";
  if (filterKey.value === "assignee") return "e.g. Alice";
  return "Enter filter text";
});

watch(filterKey, async () => {
  if (filterKey) await resetFilter();
});

// Submit handler
async function applyFilter() {
  try {
    let value: string | string[] = "";
    switch (filterKey.value) {
      case "priority":
        value = filterValue.value.toLowerCase();
        break;
      case "tags":
        value = tagsValue.value;
        break;
      default:
        value = filterValue.value;
        break;
    }
    let filteredColumns;
    if (view.value !== "calendar")
      filteredColumns = await readColumns(filterKey.value as FilterKey, value);
    else {
      filteredColumns = await readColumnsByDate(
        filterKey.value as FilterKey,
        value,
      );
    }
    if (filteredColumns) emit("update:columns", filteredColumns);
  } catch (err) {
    handleError(err, "Failed to apply filter.", "bad", null);
  }
}

// Reset filter to default (no filter)
async function resetFilter() {
  filterValue.value = "";
  tagsValue.value = [];
  try {
    let allColumns;
    if (view.value !== "calendar") allColumns = await readColumns();
    else allColumns = await readColumnsByDate();
    if (allColumns) emit("update:columns", allColumns);
  } catch (err) {
    handleError(err, "Failed to reset filter.", "bad", null);
  }
}

watch(
  () => [filterValue.value, tagsValue.value],
  ([newFilter, newTags], [oldFilter, oldTags]) => {
    if (
      newFilter === oldFilter &&
      JSON.stringify(newTags) === JSON.stringify(oldTags)
    )
      return;

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (
        !filterValue.value ||
        (filterValue.value.trim() === "" &&
          (!tagsValue.value || tagsValue.value.length === 0))
      ) {
        resetFilter();
      } else {
        applyFilter();
      }
    }, 450);
  },
  { deep: true },
);

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer as unknown as number);
});
</script>

<style scoped lang="scss">
.task-filter {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  &__filter {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    background-color: var(--popover);
    color: var(--popover-foreground);
    border: 1px solid var(--border);
    padding: 1rem;
    z-index: 10;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    gap: 0.75rem;
  }
}
</style>
