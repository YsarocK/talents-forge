<template>
  <section ref="sectionRef" class="h-[90dvh] relative" id="partners">
    <video ref="backgroundVideo" src="/videos/partners/background.webm" preload="auto" muted playsinline class="absolute top-0 left-0 w-full h-full object-cover" />
    <div ref="swiperContainer" class="absolute left-0 right-0 bottom-20 flex items-center justify-center opacity-0">
      <swiper
        :modules="[Autoplay]"
        :slides-per-view="2"
        :space-between="5"
        :centered-slides="true"
        :loop="true"
        :autoplay="{
          delay: 1500,
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
        class="w-full partners-swiper"
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
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { gsap } from 'gsap'
import 'swiper/css'

const sectionRef = ref(null)
const backgroundVideo = ref(null)
const swiperContainer = ref(null)

const setupVideoFadeIn = () => {
  if (!backgroundVideo.value || !swiperContainer.value) return

  const video = backgroundVideo.value
  let hasTriggered = false
  
  const handleLoadedMetadata = () => {
    if (hasTriggered) return
    
    const duration = video.duration
    if (!duration || isNaN(duration)) return
    
    const fadeInTime = duration - 3.5 // 3.5 secondes avant la fin
    
    // Fonction pour déclencher le fade-in
    const triggerFadeIn = () => {
      if (hasTriggered || !swiperContainer.value) return
      hasTriggered = true
      
      gsap.to(swiperContainer.value, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      })
    }
    
    // Écouter le timeupdate pour déclencher au bon moment
    const handleTimeUpdate = () => {
      if (hasTriggered) {
        video.removeEventListener('timeupdate', handleTimeUpdate)
        return
      }
      
      // Vérifier si on est dans la dernière seconde (en tenant compte de la boucle)
      const currentTime = video.currentTime
      if (currentTime >= fadeInTime && currentTime < duration) {
        triggerFadeIn()
      }
    }
    
    video.addEventListener('timeupdate', handleTimeUpdate)
    
    // Si la vidéo est déjà en cours de lecture et qu'on a dépassé le moment
    if (video.currentTime >= fadeInTime && video.currentTime < duration) {
      triggerFadeIn()
    }
  }
  
  if (video.readyState >= 1) {
    // Les métadonnées sont déjà chargées
    handleLoadedMetadata()
  } else {
    video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })
  }
}

onMounted(() => {
  if (!sectionRef.value || !backgroundVideo.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && backgroundVideo.value) {
          backgroundVideo.value.play().catch(() => {
            // Handle autoplay restrictions
          })
          // Configurer le fade-in une fois que la vidéo est visible
          setupVideoFadeIn()
        } else if (backgroundVideo.value) {
          backgroundVideo.value.pause()
        }
      })
    },
    {
      threshold: 0.4 // 40% visible
    }
  )

  observer.observe(sectionRef.value)

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style scoped>
.partners-swiper {
  padding: 20px 0;
}

.partners-swiper .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>