<template>
    <section id="stats" class="flex stat-column">
      <div class="stat-cards">
        <StatCardSkeleton v-for="i in 4" :key="i" />
      </div>
      <RecentTasksSkeleton />
    </section>
  </template>
  
  <style lang="scss" scoped>
    .stat-column {
      flex-direction: column;
      gap: 1rem;
      height: 100%;
  
      .stat-cards {
        display: grid;
        gap: 1rem;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
  