<template>
    <RecentTasksSkeleton v-if="recentLoading"/>
    <div v-else class="recent" >
        <header class="col-header">
        <h4 class="title">Recent Activity</h4>
        </header>
        <div class="flex log-cont" v-for="activity in activities" :key="activity.id">
            <div class="bullet"/>
            <div class="log">
                <p><span>{{ activity.user }}</span> {{ activity.action }} <span>{{ activity.target }}</span></p>
                <p class="time">{{ activity.time }}</p>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    const recentLoading = ref(false);
    const activities = ref<Activity[]>([])
    onMounted(async ()=>{
        try {
            recentLoading.value = true;
            const response = await fetchActivity();
            if(response){
                activities.value = response;
            }
        } catch (error) {
            console.log(error);
        }finally{
            recentLoading.value = false
        }
    })
</script>

<style lang="scss" scoped>
 @use "~/assets/styles/globals.scss" as *;
  .recent{
    @include column-layout;
  }
  .bullet{
    @include circle;
    width: 0.75rem;
    height: 0.75rem;
    margin-top: 0.25rem;
  }
  .log-cont{
    padding: 0.75rem;
    gap: 0.5rem;
    .log{
        p{
            color: gray;
            span{
                color: var(--foreground);
            }
        }
    }
  }
</style>