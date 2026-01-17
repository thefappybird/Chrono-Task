<template>
  <section id="stats" class="flex stat-column">
    <div class="stat-cards">
      <StatCardSkeleton v-if="statLoading" v-for="i in 4" :key="i" />
      <StatCard v-else v-for="stat in stats" :key="stat.label" :stat="stat"/>
    </div>
    <RecentTasks/>
  </section>
</template>

<script setup lang="ts">
    const statLoading = ref(false);
    const stats = ref<Stat[]>([])
    onMounted(async ()=>{
        try {
            statLoading.value = true;
            const response = await fetchStats();
            if(response){
                stats.value = response;
            }
        } catch (error) {
            console.log(error);
        }finally{
            statLoading.value = false
        }
    })
</script>

<style lang="scss" scoped>
  .stat-column{
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    .stat-cards{
      display: grid;
      gap: 1rem;
      width: 100%;
      grid-template-columns: repeat(2, 1fr);
    }
  }       
</style>