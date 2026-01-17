<template>
  <button class="task-card flex">
    <div v-if="task.tags && task.tags.length > 0" id="tags" class="flex tag-container">
      <div v-for="tag in task.tags" class="tag-badge">
        <p class="tag">{{tag}}</p>
      </div>
    </div> 
    <h4>{{ task.title }}</h4>
    <p class="description">{{ task.description }}</p>
    <div id="stats" class="flex stats">
      <div class="priority-badge " :class="task.priority"><p>{{task.priority}}</p></div>
      <div class="flex date" v-if="task.dueDate">
        <Icon name="mdi:calendar-outline" height="20" width="20"/>
        <p>{{ task.dueDate }}</p>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    task: Task
  }>()
</script>

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
    color: var(--accent);
    text-align: left;
    &:hover{
      border-color: var(--primary);
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
    .tag-container{
      gap: 0.2rem;
      .tag-badge{
        @include badge;
        background-color: var(--muted-foreground);
        color:gray;
      }
    }
    .description{
      color: gray;
    }
    .stats{
      justify-content: space-between;
      .priority-badge{
        @include badge;
      }
      .date{
        gap: 0.2rem;
      }
    }
  }
  p{
    font-size: 13px;
  }
  .high{
    color: red;
    background-color: rgb(121, 53, 53)
  }
  .low{
    color: rgb(29, 177, 29);
    background-color: rgb(60, 77, 60);
  }
  .medium{
    color: orange;
    background-color: rgb(109, 88, 49)
  }
</style>