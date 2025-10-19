<template>
  <div class="w-full h-full flex justify-center items-center relative bg-black">
    <div class="marquee marquee-top absolute top-0 left-0 w-full overflow-hidden">
      <div class="marquee-text text-white text-lg font-medium whitespace-nowrap">
        <span v-for="i in 10" :key="`top-${i}`">{{ data.name }}&nbsp;</span>
      </div>
    </div>
    
    <div class="marquee marquee-bottom absolute bottom-0 left-0 w-full overflow-hidden">
      <div class="marquee-text text-white text-lg font-medium whitespace-nowrap">
        <span v-for="i in 10" :key="`bottom-${i}`" class="marquee-text-item">{{ data.name }}&nbsp;</span>
      </div>
    </div>
    
    <div class="marquee marquee-left absolute top-0 left-0 h-full overflow-hidden">
      <div class="marquee-text-vertical text-white text-lg font-medium">
        <div v-for="i in 10" :key="`left-${i}`" class="vertical-text">{{ data.name }}&nbsp;</div>
      </div>
    </div>
    
    <div class="marquee marquee-right absolute top-0 right-0 h-full overflow-hidden">
      <div class="marquee-text-vertical text-white text-lg font-medium">
        <div v-for="i in 10" :key="`right-${i}`" class="vertical-text">{{ data.name }}&nbsp;</div>
      </div>
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

<style lang="pcss" scoped>
.marquee {
  background-color: black;
}

.marquee-top .marquee-text {
  animation: marquee-horizontal 5s linear infinite;
}

.marquee-bottom .marquee-text {
  animation: marquee-horizontal-reverse 5s linear infinite;
}

.marquee-left .marquee-text-vertical {
  animation: marquee-vertical 20s linear infinite;
}

.marquee-right .marquee-text-vertical {
  animation: marquee-vertical-reverse 20s linear infinite;
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  margin: 10px 0;
}

@keyframes marquee-horizontal {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-horizontal-reverse {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes marquee-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}

@keyframes marquee-vertical-reverse {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
}
</style>