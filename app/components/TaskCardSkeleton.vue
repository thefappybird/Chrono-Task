<template>
    <div class="task-card flex">
      <div class="flex tag-container">
        <div class="skeleton-tag"></div>
        <div class="skeleton-tag"></div>
      </div>
      <div class="skeleton-title"></div>
      <div class="skeleton-description"></div>
      <div class="skeleton-description short"></div>
    </div>
  </template>
  
  <style lang="scss" scoped>
    @mixin badge(){
      border-radius: 1rem;
      padding: 0.25rem 0.75rem;
    }
  
    .task-card{
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 0.5rem;
  
      .tag-container{
        gap: 0.2rem;
        .skeleton-tag{
          @include badge;
          height: 20px;
          width: 60px;
          border-radius: 1rem;
        }
      }
  
      .skeleton-title {
        height: 1.25rem;
        width: 70%;
        border-radius: 0.25rem;
      }
  
      .skeleton-description {
        height: 1rem;
        width: 100%;
        border-radius: 0.25rem;
  
        &.short {
          width: 60%;
        }
      }
  
      .stats{
        justify-content: space-between;
  
        .skeleton-priority {
          @include badge;
          height: 24px;
          width: 70px;
        }
  
        .date {
          gap: 0.2rem;
  
          .skeleton-icon {
            width: 20px;
            height: 20px;
            border-radius: 0.25rem;
          }
  
          .skeleton-date {
            height: 1rem;
            width: 80px;
            border-radius: 0.25rem;
          }
        }
      }
  
      .skeleton-tag,
      .skeleton-title,
      .skeleton-description,
      .skeleton-priority,
      .skeleton-icon,
      .skeleton-date {
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
  