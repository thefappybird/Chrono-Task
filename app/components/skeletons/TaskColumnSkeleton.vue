<template>
  <section class="task-column flex skeleton">
    <header class="col-header flex">
      <div class="flex title">
        <div class="skeleton-text skeleton-title"></div>
      </div>
    </header>
    <div class="col-cards flex">
      <TaskCardSkeleton v-for="i in cardCount" :key="i" />
    </div>
    <div class="add-btn">
      <div class="skeleton-add-btn"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  cardCount?: number;
}>();

const cardCount = props.cardCount || 3;
</script>

<style lang="scss" scoped>
@use "~/assets/styles/globals.scss" as *;

.task-column {
  @include column-layout;
  .col-cards {
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  .add-btn {
    padding: 1rem;
    margin-top: auto;
  }
}

.skeleton {
  .skeleton-title {
    height: 1.5rem;
    width: 120px;
    border-radius: 0.25rem;
  }

  .skeleton-btn {
    width: 24px;
    height: 24px;
    border-radius: 0.25rem;
  }

  .skeleton-add-btn {
    width: 100%;
    height: 40px;
    border-radius: 0.25rem;
  }

  .skeleton-text,
  .skeleton-btn,
  .skeleton-add-btn {
    @include skeleton-shimmer();
  }
}
</style>
