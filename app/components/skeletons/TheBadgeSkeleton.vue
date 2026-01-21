<template>
  <div class="badge skeleton-badge">
    <div class="skeleton-circle"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/globals.scss" as *;

.badge {
  @include circle;
  margin-left: auto;
}

.skeleton-badge {
  .skeleton-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    @include skeleton-shimmer();
  }
}
</style>
