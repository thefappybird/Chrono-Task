<template>
  <sidebar class="flex" :class="{'opened': isOpen}">
    <SideTitle @toggle-sidebar="toggleSidebar"/>
    <div class="sidebar-section flex">
       <NavBtn v-for="item in navItems" :item="item"/>
       <div id="right-side" class="flex">
        <div v-if="isOpen" class="flex input-field " :class="{'focused': isFocused}">
          <Icon name="ic:baseline-search" width="24" height="24" />
          <input type="text" placeholder="Search Tasks" @focus="onFocus" @blur="onBlur"/>
        </div>
      </div>
    </div>
  </sidebar>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import type { NavItem } from '~/utils/models';

const isOpen = ref(false);
provide('is-open', isOpen);

function toggleSidebar (){
  isOpen.value = !isOpen.value;
}

const isFocused = ref<boolean>(false);

function onFocus(){
  isFocused.value = true;
}
function onBlur(){
  isFocused.value = false;
}

const navItems: NavItem[] = [
  { icon: "dashicons:align-right", label: "Dashboard", active: true },
  { icon: "mingcute:inbox-line", label: "Inbox", badge: 3 },
  { icon: "iconamoon:check-square-light", label: "My Tasks" },
  { icon: "material-symbols:star-outline", label: "Favorites" },
  { icon: "mdi:calendar-outline", label: "Calendar" },
  { icon: "mynaui:users", label: "Team" },
]

const projects = [
  { name: "Website Redesign", color: "bg-primary" },
  { name: "Mobile App", color: "bg-chart-3" },
  { name: "Marketing", color: "bg-chart-4" },
]


</script>

<style lang="scss" scoped>
  sidebar{
    flex-direction: column;
    max-width: fit-content;
    width: 100%;
    overflow-y: auto;
    border-right: 1px solid var(--border);
    gap: 0.5rem;
    #right-side{
      .input-field{
        border: 1px solid var(--border);
        padding: 0.5rem;
        border-radius: 0.5rem;
        gap: 0.5rem;
        align-items: center;
        transition: border-color 0.2s ease;
        input{
          color: var(--foreground);
        }
      }

      .focused{
        border-color: var(--primary);
        outline: 2px solid var(--ring);
        outline-offset: 2px;
      }
    }
  }
  .opened{
    min-width: fit-content;
  }
</style>