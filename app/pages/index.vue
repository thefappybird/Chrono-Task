<script setup lang="ts">
import { ref, onMounted } from 'vue';

const taskColumn = ref<Column[]>([]);
const loading = ref<boolean>(false)

onMounted(async () => {
  try {
    loading.value = true;
    if(taskColumn.value.length == 0){
      const response = await fetchTasks();
      if(response){
        taskColumn.value = response
      }
    }
  } catch (error) {
    console.log(error);
  }finally{
    loading.value = false;
  }
})
</script>

<template>
  <section id="dashboard-section">
    <TaskColumnSkeleton v-if="loading" v-for="index in 4" :key="index" :card-count="3"/>
    <TaskColumn v-else v-for="col in taskColumn" key="col.id" :col="col" :loading="loading"/>
    <TheStats/>
  </section>
</template>

<style lang="scss" scoped>
  #dashboard-section{
    width: 100%;
    height: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    // Medium screens - 2 columns
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    // Large screens - 4 columns (or auto-fit for all columns)
    @media (min-width: 1024px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

</style>
