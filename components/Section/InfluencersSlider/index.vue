<template>
  <section class="flex flex-col justify-between" id="talents">
    <Marquee />

    <div class="relative">
      <video src="/videos/sliders/sparkles.webm" preload="auto" autoplay muted playsinline loop class="absolute top-0 left-0 w-full h-full object-cover" />
      
      <nav class="absolute inset-0 m-auto top-1/2 -translate-y-1/2 z-10 flex gap-82 w-fit pointer-events-none">
        <button
          @click="goToPrevious"
          class="cursor-pointer pointer-events-auto"
          aria-label="Previous slide"
        >
          <video src="/videos/arrow.webm" preload="auto" autoplay muted playsinline loop class="w-20 h-20 rotate-180" />
        </button>
        
        <button
          @click="goToNext"
          class="cursor-pointer pointer-events-auto"
          aria-label="Next slide"
        >
          <video src="/videos/arrow.webm" preload="auto" autoplay muted playsinline loop class="w-20 h-20" />
        </button>
      </nav>

      <div class="swiper-container" id="influencers-slider-container">
        <div class="swiper influencers-swiper">
          <div class="swiper-wrapper">
            <SectionInfluencersSliderItem class="swiper-slide" v-for="(slide, index) in slidesData" :key="slide.id" :data="slide" :is-active="activeSlideIndex === index"/>
          </div>
        </div>
        
      </div>
    </div>

    <Marquee />
  </section>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import 'swiper/css/bundle';
import { slidesData } from './data';

const swiper = ref<Swiper | null>(null);
const activeSlideIndex = ref(0);

onMounted(() => {
  swiper.value = new Swiper('.influencers-swiper', {
    loop: true,
    spaceBetween: 100,
    centeredSlides: true,
    speed: 600,
    effect: 'slide',
    watchSlidesProgress: true,
    slidesPerView: 1.2,
    allowTouchMove: false,
    simulateTouch: false,
    breakpoints: {
      768: {
        slidesPerView: 1.2,
      },
      1024: {
        slidesPerView: 2.2,
      },
      1280: {
        slidesPerView: 3.2,
      },
    },
    on: {
      slideChange: (swiper) => {
        activeSlideIndex.value = swiper.realIndex;
      },
    },
  });

  // Initialize the active slide index
  if (swiper.value) {
    activeSlideIndex.value = swiper.value.realIndex;
  }
});

// Navigation methods
const goToPrevious = () => {
    swiper.value?.slidePrev();
};

const goToNext = () => {
  swiper.value?.slideNext();
};
</script>

<style lang="pcss">
#influencers-slider-container {
  .influencers-swiper {
    padding: 20px 0;
  }

  .swiper-slide {
    aspect-ratio: 9/15 !important;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
  }

  .swiper-slide:not(.swiper-slide-active, .swiper-slide-prev, .swiper-slide-next) {
    transform: scale(0.8);
  }

  .swiper-slide:has(+ .swiper-slide-prev) {
    transform: scale(0.8) translateX(35px) !important;
  }
  
  .swiper-slide-next ~ .swiper-slide {
    transform: scale(0.8) translateX(-35px) !important;
  }

  .swiper-slide-prev,
  .swiper-slide-next {
    transform: scale(0.9);
  }

  .swiper-slide-active {
    transform: scale(1);
  }
}
</style>