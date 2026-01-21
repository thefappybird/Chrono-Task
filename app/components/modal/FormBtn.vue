<template>
  <button
    v-focus="focus"
    :class="[btnType, { focused: isFocused }]"
    :type="type"
    @focus="onFocus"
    @blur="onBlur"
    :aria-label="btnLabel"
  >
    <p>{{ btnLabel }}</p>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    btnLabel: string;
    btnType: "button" | "toggle";
    type?: "button" | "submit" | "reset";
    focus?: boolean;
  }>(),
  {
    type: "button",
    focus: false,
  },
);
const { isFocused, onFocus, onBlur } = useFocused();
</script>

<style scoped lang="scss">
button {
  flex: 1 1 0;
  padding: 0.5rem;
  border: 1px solid var(--border);
  color: var(--foreground);
  border-radius: 0.5rem;
  transition:
    background 0.2s,
    color 0.2s,
    border 0.2s;
  text-wrap: nowrap;

  &.active {
    background: var(--primary);
    color: var(--primary-foreground);
    border-color: var(--primary);
    font-weight: 500;
  }
  &:hover:not(.active) {
    background-color: var(--muted-foreground);
    color: var(--sidebar-primary);
  }
}
.button {
  max-width: 100%;
}
.toggle {
  max-width: 33%;
}
</style>
