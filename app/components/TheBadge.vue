<template>
    <div class="badge">
        <p>{{ value }}</p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        value: number
    }>()
</script>

<style lang="scss" scoped>
    @use "~/assets/styles/globals.scss" as *;
    .badge{
        @include circle;
        color: black;
        margin-left: auto;
    }
</style>