<template>
  <footer class="flex items-center bg-primary-black border-t border-primary-beige">
    <nav class=" text-primary-beige w-full">
      <ul class="grid grid-cols-1 md:grid-cols-[var(--main-grid-columns)] gap-[1px] bg-primary-beige">
        <li class="flex justify-center items-center text-primary text-xl font-medium uppercase py-1.5 bg-primary-black">
          <NuxtLink to="#contact">Contactez nous !</NuxtLink>
        </li>
        <li class="flex justify-center text-primary text-xl font-medium uppercase py-1.5 bg-primary-black" v-for="link in links" :key="link.label">
          <NavLink :to="link.to" :label="link.label" />
        </li>
        <li class="bg-primary-black" aria-hidden />
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts">
type Link = {
  label: string;
  to: string;
}

const links: Link[] = [
  {
    label: 'Linkedin',
    to: 'https://'
  },
  {
    label: 'Instagram',
    to: 'https://'
  },
  {
    label: 'Twitter',
    to: 'https://'
  }
]
</script>