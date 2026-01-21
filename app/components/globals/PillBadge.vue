<template>
  <span class="pill" :class="classes" :style="styleVars">
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  bg: { type: String, required: true },
  fg: { type: String, required: true },
  border: { type: String, default: "transparent" },
  uppercase: { type: Boolean, default: false },
  dense: { type: Boolean, default: false },
});

const classes = computed(() => ({
  "pill--uppercase": props.uppercase,
  "pill--dense": props.dense,
}));

const styleVars = computed(() => ({
  background: props.bg,
  color: props.fg,
  borderColor: props.border,
}));
</script>

<style scoped lang="scss">
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 700;
  font-size: 0.75rem;
  border: 1px solid transparent;
  line-height: 1.2;
  white-space: nowrap;
}

.pill--uppercase {
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.pill--dense {
  padding: 0.1rem 0.35rem;
  font-size: 0.7rem;
}
</style>
