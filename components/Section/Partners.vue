<template>
  <section class="h-screen relative" id="partners">
    <video src="/videos/partners/background.webm" preload="auto" autoplay muted playsinline class="absolute top-0 left-0 w-full h-full object-cover" />
    <!-- <div class="absolute left-0 right-0 bottom-10 flex items-center justify-center h-96">
      <swiper
        :modules="[Autoplay]"
        :slides-per-view="2"
        :space-between="5"
        :centered-slides="true"
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :breakpoints="{
          640: {
            slidesPerView: 3,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50
          }
        }"
        class="w-full"
      >
        <swiper-slide v-for="i in 6" :key="i">
          <div class="flex items-center justify-center h-full">
            <img 
              :src="`/images/partners/${i}.svg`" 
              :alt="`Partner ${i}`"
              class="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div> -->
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
</script>

<style scoped>
.swiper {
  padding: 20px 0;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>