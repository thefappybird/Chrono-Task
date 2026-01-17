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
        background: linear-gradient(
          90deg,
          var(--muted, #e0e0e0) 25%,
          var(--muted-foreground, #f0f0f0) 50%,
          var(--muted, #e0e0e0) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }
    }
  
    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  </style>
  