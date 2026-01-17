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
      background: linear-gradient(
        90deg,
        var(--muted, #e0e0e0) 25%,
        var(--muted-foreground, #f0f0f0) 50%,
        var(--muted, #e0e0e0) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
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
  