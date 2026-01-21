<template>
  <div class="flex select-field" :aria-label="label">
    <label :for="title">{{ label }}</label>
    <div class="flex buttons">
      <FormBtn
        v-for="option in options"
        :key="option"
        :class="{
          active: selected?.toLocaleLowerCase() === option.toLocaleLowerCase(),
        }"
        type="button"
        btn-type="toggle"
        @click="select(option)"
        :btn-label="option"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  label: string;
  modelValue?: string | null;
  options: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();

const selected = ref(props.modelValue ?? (props.options[0] || null));

watch(
  () => props.modelValue,
  (val) => {
    if (val && props.options.includes(val)) {
      selected.value = val;
    }
  },
);

function select(option: string) {
  if (selected.value?.toLocaleLowerCase() === option.toLocaleLowerCase()) {
    selected.value = null;
  } else {
    selected.value = option.toLocaleLowerCase();
  }

  emit("update:modelValue", selected.value);
}
</script>

<style scoped lang="scss">
@use "~/assets/styles/globals.scss" as *;
.select-field {
  @include vertical-cont;
  width: 100%;
  label {
    font-weight: 500;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
}
</style>
