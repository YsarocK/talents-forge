<template>
  <header class="py-3 px-20 flex justify-between items-center bg-primary-black border-b border-primary-beige">
    <h1 class="text-primary-beige font-bold text-2xl">Le TALENT ça se FORGE</h1>
    <nav class="flex items-center gap-12">
      <ul class="flex gap-12">
        <li class="uppercase" v-for="link in links" :key="link.label">
          <NavLink :to="link.to" :label="link.label" />
        </li>
      </ul>
      <img src="/images/logo/simple_light.svg" alt="Le Talent ça se forge" class="w-10 h-10" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { Link } from '~/components/NavLink.vue';

const links: Link[] = [
  {
    label: 'Accueil',
    to: '/'
  },
  {
    label: 'Talents',
    to: '/#talents'
  },
  {
    label: 'Collaboration',
    to: '/#partners'
  },
  {
    label: 'À propos',
    to: '/#about'
  },
  {
    label: 'Contact',
    to: '/#contact'
  }
]
</script>