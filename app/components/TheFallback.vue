<template>
    <div class="loader-wrapper">
        <img
            src="/target.gif"
            alt="Loading"
            class="logo"
        />
        <h1>ChronoTask</h1>
    </div>
</template>

<script setup lang="ts">
  
</script>

<style lang="scss" scoped>
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