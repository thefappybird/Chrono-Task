<template>
    <div id="title" class="flex">
      <button class="flex" @click="$emit('toggle-sidebar')">
        <Icon v-if="isOpen" name="material-symbols:chevron-left"/>
        <Icon v-else name="material-symbols:chevron-right"/>
      </button>
      <h2 v-if="isOpen" class="text-bold text-black">ChronoTask</h2>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { Ref } from 'vue';

const emits = defineEmits<{
    (e: "toggle-sidebar"): void
}>();

const isOpen = inject<Ref<boolean>>('is-open');
</script>

<style lang="scss" scoped>
    #title{
        width: 100%;
        height: 3.5rem;
        align-items: center;
        justify-content: left;
        gap: 0.5rem;
        padding: 0.5rem;
        border-bottom: 1px solid var(--border);
        button{
            color: var(--foreground);
            padding: 0.5rem;
            align-items: center;
            &:hover{
                background-color: var(--accent);
            }
        }
    }
</style>
