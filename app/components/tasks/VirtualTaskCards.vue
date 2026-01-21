<template>
  <VList :data="tasks" #default="{ item, index }">
    <TaskCardExpanded
      :key="item.id"
      :task="item"
      :expandable="false"
      draggable="true"
      @dragstart="startDrag($event, item)"
      @dragover.prevent="onDragOver($event, index)"
    />
  </VList>
</template>

<script setup lang="ts">
import { VList } from "virtua/vue";
const { startDrag, onDragOver } = useColumns();

defineProps<{
  tasks: Task[];
}>();
</script>
