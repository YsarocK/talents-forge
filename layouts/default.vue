<template>
  <Transition name="fade" mode="out-in">
    <Loader v-if="isLoading" />
  </Transition>
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

.fade-leave-active {
  transition: opacity 0.4s ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
const { isLoading, waitForAssets } = useAssetsLoader()

onMounted(async () => {
  await nextTick()
  waitForAssets()
})

useHead({
  title: 'Talent\'s Forge',
  meta: [
    {
      name: 'description',
      content: 'Forgez des talents, des idées et des collaborations uniques. Talent\'s Forge connecte les talents pour créer des projets exceptionnels.'
    },
    { name: 'keywords', content: 'talents, influenceurs, collaborations, créateurs, agence, marketing, communication' }
  ]
})
</script>