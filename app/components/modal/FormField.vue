<template>
  <div class="flex" :aria-label="label">
    <label :for="title">{{ label }}</label>
    <textarea
      class="input-field"
      v-focus="focus"
      v-if="field === 'area'"
      :name="title"
      :class="{ focused: isFocused }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <input
      v-else
      v-focus="focus"
      class="input-field"
      type="text"
      :name="title"
      :class="{ focused: isFocused }"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    label: string;
    placeholder?: string;
    field?: "area" | "input";
    modelValue?: string;
    focus?: boolean;
  }>(),
  {
    focus: false,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const { isFocused, onFocus, onBlur } = useFocused();

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  emit("update:modelValue", val);
}
</script>

<style scoped lang="scss">
@use "~/assets/styles/globals.scss" as *;
div {
  @include vertical-cont;
  width: 100%;
  label {
    font-weight: 500;
  }
  input {
    padding: 0.75rem;
  }
}
</style>
