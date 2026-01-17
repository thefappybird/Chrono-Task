<template>
    <div class="recent">
      <header class="col-header">
        <div class="skeleton-title"></div>
      </header>
      <div class="flex log-cont" v-for="i in 4" :key="i">
        <div class="skeleton-bullet"></div>
        <div class="log">
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
    @use "~/assets/styles/globals.scss" as *;
  
    .recent {
      @include column-layout;
    }
  
    .skeleton-bullet {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      margin-top: 0.25rem;
      flex-shrink: 0;
    }
  
    .log-cont {
      padding: 0.75rem;
      gap: 0.5rem;
  
      .log {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
    }
  
    .skeleton-title {
      height: 1.25rem;
      width: 100px;
      border-radius: 0.25rem;
    }
  
    .skeleton-text {
      height: 0.875rem;
      width: 100%;
      border-radius: 0.25rem;
  
      &.short {
        width: 70%;
      }
    }
  
    .skeleton-bullet,
    .skeleton-title,
    .skeleton-text {
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
  