<template>
  <button>
    <Icon class="icon" :name="icon" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<style scoped>
.icon {
  scale: 140%;
  color: var(--foreground);
}
</style>
