<template>
  <div class="relative w-full h-full flex bg-gradient-to-b from-[#BF5430] to-[#301913] p-4">
    <div class="w-full my-auto bg-white p-4 relative">
      <img :src="data.imageUrl" alt="Influencer" class="w-full h-full object-contain" />
      <p class="text-white uppercase text-4xl font-[900] orientation-portrait absolute bottom-6 right-4 opacity-60" style="writing-mode: vertical-lr;">{{ data.name }}</p>
    </div>
    <div class="absolute bottom-24 left-0 py-3 px-2 bg-red-500">
      <p class="text-white text-2xl font-bold">{{ data.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '../data';

type Props = {
  data: Slide;
}

defineProps<Props>();
</script>