<template>
  <div class="stat-card flex">
    <div class="flex summary">
      <Icon :name="stat.icon" height="20" width="20"/>
      <p :class="stat.trend == 'up'? 'green': 'red'">{{ stat.change }}</p>
    </div>
    <div class="label">
      <h1>{{ stat.value }}</h1>
      <h4>{{ stat.label }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    stat: Stat
  }>()
</script>

<style lang="scss" scoped>
.stat-card {
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  .summary{
    justify-content: space-between;
  }
  .label{
    h4{
      color:gray
    }
  }
}
.green{
  color: green;
}
.red{
  color: red;
}
</style>