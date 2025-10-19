<template>
  <NuxtLink :class="isActive ? 'active-link' : ''" class="text-primary-beige  transition-all duration-200 ease-in-out text-xl font-medium uppercase px-6 py-1 rounded-full group" :to="to">
    <span class="group-hover:opacity-70 transition-all duration-200 ease-in-out">{{ label }}</span>
  </NuxtLink> 
</template>

<script setup lang="ts">
export type Link = {
  label: string;
  to: string;
}

const props = defineProps<Link>()

const path = computed(() => {
  return useRoute().fullPath;
})

const isActive = computed(() => {
  return path.value === props.to;
})
</script>

<style lang="pcss" scoped>
a {
  &.active-link {
    background-color: var(--color-primary-red);
  }
}
</style>
