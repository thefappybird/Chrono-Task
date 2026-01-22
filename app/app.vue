<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <LazyTheModal />
  <LazyTheToast />
  <Analytics />
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>
