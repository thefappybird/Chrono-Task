<template>
  <div class="skeleton-cont">
    <h2>{{ title }}</h2>
    <div class="skeleton header" />
    <div class="skeleton line" />
    <div class="skeleton area" />
    <div class="skeleton small" />
    <div class="skeleton buttons" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped lang="scss">
@use "~/assets/styles/globals.scss" as *;

.skeleton-cont {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  .skeleton {
    --skeleton-muted: rgba(255, 255, 255, 0.06);
    --skeleton-highlight: rgba(255, 255, 255, 0.12);
    @include skeleton-shimmer();
    border-radius: 6px;
  }
  .header {
    height: 28px;
    width: 40%;
  }
  .line {
    height: 14px;
    width: 80%;
  }
  .area {
    height: 90px;
    width: 100%;
  }
  .small {
    height: 14px;
    width: 30%;
  }
  .buttons {
    height: 40px;
    width: 50%;
    margin-left: auto;
  }
}
</style>
