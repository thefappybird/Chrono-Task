<template>
  <div class="stat-card flex">
    <div class="flex summary">
      <div class="skeleton-icon"></div>
      <div class="skeleton-change"></div>
    </div>
    <div class="label">
      <div class="skeleton-value"></div>
      <div class="skeleton-label"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/globals.scss" as *;

.stat-card {
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;

  .summary {
    justify-content: space-between;
  }

  .label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.skeleton-icon {
  width: 20px;
  height: 20px;
  border-radius: 0.25rem;
}

.skeleton-change {
  width: 40px;
  height: 1rem;
  border-radius: 0.25rem;
}

.skeleton-value {
  height: 2rem;
  width: 80%;
  border-radius: 0.25rem;
}

.skeleton-label {
  height: 1rem;
  width: 60%;
  border-radius: 0.25rem;
}

.skeleton-icon,
.skeleton-change,
.skeleton-value,
.skeleton-label {
  @include skeleton-shimmer();
}
</style>
