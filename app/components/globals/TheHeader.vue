<template>
  <header>
    <div class="flex header-title">
      <h2>Dashboard</h2> 
      <p>Welcome back! <span>Let's crush it today.</span></p>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  height: 3.5rem;
  width: 100%;
  border-bottom: 1px solid var(--border);
  .header-title{
   align-items: center;
   gap: 1rem;
   p{
    display: none;
    font-weight: 600;
    span{
      font-weight: 400;
      color: gray
    }
    @media (min-width: 768px) {
      display: block;
    }
   }
  }
  
}
</style>