<script setup lang="ts">
const { isOpen } = storeToRefs(useModalStore());

const isReady = ref(false);

onMounted(() => {
  isReady.value = true;
});
</script>

<template>
  <div class="loader-wrapper" v-if="!isReady">
    <img src="/target.gif" alt="Loading" class="logo" />
    <h1>ChronoTask</h1>
  </div>
  <main class="flex" :class="isOpen && ' no-scroll'" v-else>
    <div id="content" class="flex">
      <TheHeader />
      <NuxtPage />
    </div>
  </main>
</template>
<style lang="scss" scoped>
#content {
  width: 100%;
  flex-direction: column;
}
.main {
  height: 100%;
}
.loader-wrapper {
  position: fixed;
  inset: 0;
  background: white; /* or brand color */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: black;
}

/* Logo animation */
.logo {
  width: 80px; /* adjust to your logo */
}
@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
