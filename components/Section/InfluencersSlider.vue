<template>
  <section class="flex flex-col justify-between">
    <div class="marquee-container text-primary-beige py-10">
      <div class="marquee text-2xl font-bold">
        <span v-for="i in 20" :key="i">DÉCOUVREZ NOS TALENTS -&nbsp;</span>
      </div>
    </div>

    <div class="relative">
      <video src="/videos/sliders/sparkles.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      <div class="swiper-container" id="influencers-slider-container">
        <div class="swiper">
          <div class="swiper-wrapper py-16">
            <SectionInfluencerSlide
              v-for="slide in slidesData"
              :key="slide.id"
              :is-active="swiper?.activeIndex === slidesData.findIndex(s => s.id === slide.id)"
              :data="slide"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="marquee-container text-primary-beige py-10">
      <div class="marquee text-2xl font-bold">
        <span v-for="i in 20" :key="i">DÉCOUVREZ NOS TALENTS -&nbsp;</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import 'swiper/css/bundle';

const slidesData = [
  { id: 1, content: 'Slide 1', imageUrl: 'https://picsum.photos/seed/picsum1/300/400', name: 'John Doe' },
  { id: 2, content: 'Slide 2', imageUrl: 'https://picsum.photos/seed/picsum2/300/400', name: 'Jane Doe' },
  { id: 3, content: 'Slide 3', imageUrl: 'https://picsum.photos/seed/picsum3/300/400', name: 'John Doe' },
  { id: 4, content: 'Slide 4', imageUrl: 'https://picsum.photos/seed/picsum4/300/400', name: 'Jane Doe' },
  { id: 5, content: 'Slide 5', imageUrl: 'https://picsum.photos/seed/picsum5/300/400', name: 'John Doe' },
  { id: 6, content: 'Slide 6', imageUrl: 'https://picsum.photos/seed/picsum6/300/400', name: 'Jane Doe' },
  { id: 7, content: 'Slide 7', imageUrl: 'https://picsum.photos/seed/picsum7/300/400', name: 'John Doe' },
];


const swiper = ref<Swiper | null>(null);

onMounted(() => {
  swiper.value = new Swiper('.swiper', {
    slidesPerView: 5.8,
    loop: true,
    spaceBetween: 100,
    centeredSlides: true,
  });
});
</script>

<style lang="pcss" scoped>
.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
  /* Gradient background */
  background: linear-gradient(90deg, #301913 0%, #BF5430 100%);
  background-size: 100% 100%;
  animation: marquee-bg-move 30s linear infinite;
}

.marquee {
  display: inline-flex;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes marquee-bg-move {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}
</style>
