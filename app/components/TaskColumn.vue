<template>
  <section :id="col.id" class="task-column flex">
    <header class="col-header flex">
      <div class="flex title">
        <h3>{{ col.title }}</h3>
        <TheBadge :value="col.tasks.length"/>
      </div>
      <div class="actions flex">
       <button class="standard-btn flex"><Icon name="ic:outline-plus" width="24" height="24" /></button>
       <button class="standard-btn flex"><Icon name="pepicons-pencil:dots-x" width="20" height="20" /></button>
      </div>
    </header>
    <div class="col-cards flex">
      <TaskCard v-for="task in col.tasks" :key="task.id" :task="task"/>
    </div>
    <div class=" add-btn">
      <button class="flex standard-btn">
        <Icon name="ic:outline-plus" width="24" height="24" /><p>Add Task</p>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps<({
    col: Column,
    loading: boolean
  })>()
</script>

<style lang="scss" scoped>
  @use "~/assets/styles/globals.scss" as *;
  
  .task-column{
    @include column-layout;
    .col-cards{
      padding: 1rem;
      flex-direction: column;
      gap: 0.5rem;
    }
    .add-btn{
      padding: 1rem;
      margin-top: auto;
      button{
        color: var(--foreground);
        width: 100%;
      }
    }
  }


</style>