<template>
  <NuxtLink class="text-primary-beige hover:opacity-70 transition-opacity duration-300 ease-in-out text-xl font-medium uppercase px-6 py-1 rounded-full" :to="to">{{ label }}</NuxtLink> 
</template>

<script setup lang="ts">
type Link = {
  label: string;
  to: string;
}

defineProps<Link>()
</script>

<style lang="pcss" scoped>
a {
  &.router-link-active {
    background-color: var(--color-primary-red);
  }
}
</style>
