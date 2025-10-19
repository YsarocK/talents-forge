<template>
  <div class="bg-primary-black min-h-screen flex flex-col sticky">
    <Header class="sticky top-0 z-20" />
    <main class="flex flex-col content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="pcss">
html {
  scroll-behavior: smooth;
}

main {
  section {
    scroll-margin-top: 65px;
  }
}
</style>

<script setup lang="ts">
useHead({
  title: 'Talent\'s Forge',
  meta: [
    { name: 'description', content: 'Le Talent ça se Forge' }
  ]
})
</script>