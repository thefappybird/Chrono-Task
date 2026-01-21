<template>
  <div class="tag-input">
    <label :for="id">{{ label }}</label>

    <div class="tag-container">
      <span v-for="(tag, index) in modelValue" :key="tag" class="tag">
        {{ tag }}
        <button type="button" aria-label="Remove tag" @click="remove(index)">
          ×
        </button>
      </span>

      <input
        :id="id"
        v-model="input"
        type="text"
        :placeholder="placeholder"
        @keydown.enter.prevent="add"
        @keydown.backspace="removeLast"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[];
  label: string;
  placeholder?: string;
  id?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const input = ref("");

function add() {
  const value = input.value.trim();
  if (!value || props.modelValue.includes(value)) return;

  emit("update:modelValue", [...props.modelValue, value]);
  input.value = "";
}

function remove(index: number) {
  const next = [...props.modelValue];
  next.splice(index, 1);
  emit("update:modelValue", next);
}

function removeLast() {
  if (!input.value && props.modelValue.length) {
    remove(props.modelValue.length - 1);
  }
}
</script>

<style scoped lang="scss">
.tag-input {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  min-height: 2.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);

  &:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--ring);
  }
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  background-color: var(--accent);
  color: var(--accent-foreground);

  button {
    all: unset;
    cursor: pointer;
    font-size: 0.85rem;
    padding: 0 0.25rem;
    line-height: 1;

    &:focus-visible {
      outline: 2px solid var(--ring);
      border-radius: 50%;
    }
  }
}

input {
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
  color: var(--foreground);
}
</style>
