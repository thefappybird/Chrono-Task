<template>
  <div class="delete-skeleton" aria-hidden="true">
    <h2>Delete Task</h2>
    <div class="skeleton line" />
    <div class="skeleton line short" />

    <div class="btn-row">
      <div class="skeleton btn" />
      <div class="skeleton btn" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/styles/globals.scss" as *;
.delete-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton {
  --skeleton-muted: rgba(255, 255, 255, 0.06);
  --skeleton-highlight: rgba(255, 255, 255, 0.12);
  @include skeleton-shimmer();
  border-radius: 6px;
}
.title {
  height: 1.25rem;
  width: 60%;
}

.line {
  height: 0.75rem;
  width: 100%;

  &.short {
    width: 80%;
  }
}

.btn-row {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;

  .btn {
    width: 5.5rem;
    height: 2rem;
    border-radius: 0.5rem;
  }
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
