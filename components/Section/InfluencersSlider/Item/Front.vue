<template>
  <div class="relative w-full h-full flex bg-orange-400 p-4">
    <div class="w-full my-auto bg-white p-4">
      <img :src="data.imageUrl" alt="Influencer" class="w-full h-full object-contain" />
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