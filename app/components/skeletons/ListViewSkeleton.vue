<template>
  <div class="list-view skeleton">
    <div v-for="i in rowCount" :key="i" class="list-row">
      <div class="list-col">
        <div class="list-header flex">
          <span class="skeleton-title"></span>
          <span class="skeleton-btn"></span>
        </div>
        <div class="lists">
          <div v-for="j in getCardCount(i)" :key="j" class="list-card">
            <div class="skeleton-card-title"></div>
            <div class="skeleton-card-desc"></div>
            <div class="skeleton-card-badge"></div>
            <div class="flex buttons-gap">
              <div class="skeleton-card-badge"></div>
              <div class="skeleton-card-badge"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  rowCount?: number;
}>();

const rowCount = props.rowCount ?? 3;

function getCardCount(index: number): number {
  const counts = [4, 3, 2];
  return counts[index % counts.length] ?? 3;
}
</script>

<style scoped lang="scss">
@use "~/assets/styles/globals.scss" as *;

.list-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 1rem;
}

.list-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
}

.list-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 275px;
  overflow: hidden;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
  }

  .lists {
    display: flex;
    gap: 1rem;
    width: 100%;
    height: 100%;
    overflow-x: auto;
  }
  .buttons-gap {
    margin-top: auto;
    justify-content: space-between;
  }
}

.list-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
  height: 100%;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
}

.skeleton {
  .skeleton-title {
    height: 2em;
    width: 120px;
    border-radius: 0.25rem;
    @include skeleton-shimmer();
  }

  .skeleton-btn {
    width: 24px;
    height: 24px;
    border-radius: 0.25rem;
    @include skeleton-shimmer();
  }

  .skeleton-card-title {
    height: 1rem;
    width: 80%;
    border-radius: 0.25rem;
    @include skeleton-shimmer();
  }

  .skeleton-card-desc {
    height: 3rem;
    width: 100%;
    border-radius: 0.25rem;
    @include skeleton-shimmer();
  }

  .skeleton-card-badge {
    height: 1.25rem;
    width: 60px;
    border-radius: 1rem;
    @include skeleton-shimmer();
  }
}
</style>
