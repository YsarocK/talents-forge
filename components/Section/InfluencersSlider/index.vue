<template>
  <section class="flex flex-col justify-between">
    <Marquee />

    <div class="relative py-16">
      <video src="/videos/sliders/sparkles.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      
      <nav class="absolute inset-0 m-auto top-1/2 -translate-y-1/2 z-10 flex gap-82 w-fit">
        <button
          @click="goToPrevious"
          class="cursor-pointer"
          aria-label="Previous slide"
        >
          <video src="/videos/arrow.webm" preload="auto" autoplay muted loop class="w-20 h-20 rotate-180" />
        </button>
        
        <button
          @click="goToNext"
          class="cursor-pointer"
          aria-label="Next slide"
        >
          <video src="/videos/arrow.webm" preload="auto" autoplay muted loop class="w-20 h-20" />
        </button>
      </nav>

      <div class="swiper-container" id="influencers-slider-container">
        <div class="swiper ">
          <div class="swiper-wrapper">
            <SectionInfluencerSlide class="swiper-slide" v-for="slide, index in slidesData" :key="slide.id" :data="slide" :is-active="index === 0" />
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

const slidesData = [
  { id: 1, content: 'Slide 1', imageUrl: 'https://picsum.photos/seed/picsum1/300/400', firstName: 'John', lastName: 'Doe' },
  { id: 2, content: 'Slide 2', imageUrl: 'https://picsum.photos/seed/picsum2/300/400', firstName: 'Jane', lastName: 'Doe' },
  { id: 3, content: 'Slide 3', imageUrl: 'https://picsum.photos/seed/picsum3/300/400', firstName: 'John', lastName: 'Doe' },
  { id: 4, content: 'Slide 4', imageUrl: 'https://picsum.photos/seed/picsum4/300/400', firstName: 'Jane', lastName: 'Doe' },
  { id: 5, content: 'Slide 5', imageUrl: 'https://picsum.photos/seed/picsum5/300/400', firstName: 'John', lastName: 'Doe' },
  { id: 6, content: 'Slide 6', imageUrl: 'https://picsum.photos/seed/picsum6/300/400', firstName: 'Jane', lastName: 'Doe' },
  { id: 7, content: 'Slide 7', imageUrl: 'https://picsum.photos/seed/picsum7/300/400', firstName: 'John', lastName: 'Doe' },
];

const swiper = ref<Swiper | null>(null);

onMounted(() => {
  swiper.value = new Swiper('.swiper', {
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
        slidesPerView: 2.2,
      },
      1024: {
        slidesPerView: 3.2,
      },
      1280: {
        slidesPerView: 4.2,
      },
    },
  });

});

// Navigation methods
const goToPrevious = () => {
  console.log('goToPrevious', swiper.value);
  swiper.value?.slidePrev();
};

const goToNext = () => {
  swiper.value?.slideNext();
};
</script>

<style lang="pcss">
#influencers-slider-container {
  .swiper-slide {
    aspect-ratio: 9/16 !important;
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