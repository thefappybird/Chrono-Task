<template>
  <button class="flex standard-btn " :class="{ active: item.active, inactive: !item.active }">
    <Icon :name="item.icon" />
    <p v-if="isOpen">{{ item.label }}</p>
    <TheBadge v-if="isOpen && item.badge && item.badge > 0" :value="item.badge"/>
  </button>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { Ref } from 'vue';
import type { NavItem } from '~/utils/models';

const props = defineProps<{
    item: NavItem,
}>()

const isOpen = inject<Ref<boolean>>('is-open');
</script>

<style lang="scss" scoped>
  .active{
    font-weight: bold;
    color: var(--sidebar-primary);
    background-color: var(--muted-foreground);
  }
  .inactive{
    color: var(--sidebar-foreground);
  }
</style>