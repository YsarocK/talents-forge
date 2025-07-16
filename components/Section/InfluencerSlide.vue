<template>
  <div class="swiper-slide relative" @mouseenter="handleHover">
    <video ref="backVideo" src="/videos/sliders/lines_back.webm" preload="auto" muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
    <div class="cube-container">
      <div class="cube" :style="{ transform: `scale(${scale}) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg)` }">
        <div class="cube-face front" :style="{ backgroundImage: `url(${data.imageUrl})` }"></div>
        <div aria-hidden="true" class="cube-face back"></div>
        <div class="cube-face right">
          <p class="text-white text-center text-2xl font-bold">
            {{ data.name }}
          </p>
        </div>
        <div aria-hidden="true" class="cube-face left"></div>
        <div aria-hidden="true" class="cube-face top"></div>
        <div aria-hidden="true" class="cube-face bottom"></div>
      </div>
    </div>
    <video ref="frontVideo" src="/videos/sliders/lines_front.webm" preload="auto" muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
  </div>
</template>

<script setup lang="ts">
type Props = {
  isActive: boolean;
  data: {
    imageUrl: string;
    name: string;
  }
}

const props = defineProps<Props>();

const scale = ref(1);
const rotation = reactive({
  y: 0,
  x: 0,
  z: 0,
});
const backVideo = ref<HTMLVideoElement | null>(null);
const frontVideo = ref<HTMLVideoElement | null>(null);

const videoTimeCodes = reactive({
  start: 3.6,
  end: 5.9,
});

const videoDuration = computed(() => { return videoTimeCodes.end - videoTimeCodes.start; })

const handleVideoTimeUpdate = (video: HTMLVideoElement) => {
  if (video.currentTime > videoTimeCodes.end) {
    video.currentTime = videoTimeCodes.start;
  }
};

const handleHover = () => {
  scale.value = 0.5;
  rotation.y = (-1 * (360 * 1)) - 60;
  rotation.z = -2;
  if (backVideo.value) {
    backVideo.value.currentTime = videoTimeCodes.start;
    backVideo.value.play();
    backVideo.value.addEventListener('timeupdate', () => handleVideoTimeUpdate(backVideo.value!));
  }
  if (frontVideo.value) {
    frontVideo.value.currentTime = videoTimeCodes.start;
    frontVideo.value.play();
    frontVideo.value.addEventListener('timeupdate', () => handleVideoTimeUpdate(frontVideo.value!));
  }

  setTimeout(() => {
    scale.value = 1;
    rotation.z = 0;
    rotation.y = (-1 * (360 * 1)) - 90;
  }, (videoDuration.value - 0.8) * 1000);
  
  setTimeout(() => {
    resetVideos();
  }, videoDuration.value * 1000);
};

const resetPosition = () => {
  scale.value = 1;
  rotation.y = 0;
  rotation.z = 0;
}

const resetVideos = () => {
  if (backVideo.value) {
    backVideo.value.pause();
    backVideo.value.currentTime = videoTimeCodes.start;
    backVideo.value.removeEventListener('timeupdate', () => handleVideoTimeUpdate(backVideo.value!));
  }
  if (frontVideo.value) {
    frontVideo.value.pause();
    frontVideo.value.currentTime = videoTimeCodes.start;
    frontVideo.value.removeEventListener('timeupdate', () => handleVideoTimeUpdate(frontVideo.value!));
  }
}

watch(() => props.isActive, (oldVal, newVal) => {
  if(oldVal && !newVal) {
    resetPosition();
    resetVideos();
  }
});
</script>

<style lang="pcss">
:root {
  --cube-width: 200px;
  --cube-aspect-ratio: 9/16;
}

.swiper-slide {
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
}

.cube-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
  perspective: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cube {
  position: relative;
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
  transform-style: preserve-3d;
  transition: all 1s cubic-bezier(.77,0,.18,1);
}

.cube-face {
  position: absolute;
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
  background-size: cover;
  background-position: center;
  backface-visibility: hidden;
}

.front {
  transform: translateZ(calc(var(--cube-width) / 2));
}

.back {
  transform: rotateY(180deg) translateZ(calc(var(--cube-width) / 2));
  background-color: #160F1B;
}

.right {
  transform: rotateY(90deg) translateZ(calc(var(--cube-width) / 2));
  background-color: #160F1B;
}

.left {
  transform: rotateY(-90deg) translateZ(calc(var(--cube-width) / 2));
  background-color: #160F1B;
}

.top {
  transform: rotateX(90deg) translateZ(calc(var(--cube-height) / 2));
  background-color: #160F1B;
}

.bottom {
  transform: rotateX(-90deg) translateZ(calc(var(--cube-height) / 2));
  background-color: #160F1B;
}
</style> 