<template>
  <div class="relative" 
  @mouseenter="handleHover"
  @mouseleave="handleMouseLeave"
  >
    <video ref="backVideo" src="/videos/sliders/lines_back.webm" preload="auto" muted loop class="z-10 absolute top-0 left-0 w-full h-full object-cover" />
    <div class="cube-container">
      <div class="cube" ref="cubeElement" :style="{ 
        transform: `scale(${scale}) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg)` 
      }">
        <div class="cube-face front">
          <SectionInfluencerSlideFront :data="{
            imageUrl: data.imageUrl,
            firstName: data.firstName,
            lastName: data.lastName
          }" />
        </div>
        <div aria-hidden="true" class="cube-face back"></div>
        <div class="cube-face right">
          <SectionInfluencerSlideBack :data="{
            firstName: data.firstName,
            lastName: data.lastName,
            sentence: 'mdknsqdlqskn dqns'
          }" />
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
import { gsap } from 'gsap';

type Props = {
  isActive: boolean;
  data: {
    imageUrl: string;
    firstName: string;
    lastName: string;
  }
}

const props = defineProps<Props>();

const backVideo = ref<HTMLVideoElement | null>(null);
const frontVideo = ref<HTMLVideoElement | null>(null);
const cubeElement = ref<HTMLElement | null>(null);

const scale = ref(1);
const rotation = reactive({
  y: 0,
  x: 0,
  z: 0,
});

const isAnimating = ref(false);
const pendingAction = ref<'leave' | null>(null);

const videoTimeCodes = reactive({
  start: 4.1,
  end: 6.1,
});

const videoDuration = computed(() => { return videoTimeCodes.end - videoTimeCodes.start; })

const startVideos = () => {
  if (backVideo.value) {
    backVideo.value.currentTime = videoTimeCodes.start;
    backVideo.value.play();
  }
  if (frontVideo.value) {
    frontVideo.value.currentTime = videoTimeCodes.start;
    frontVideo.value.play();
  }
};

const handleHover = () => {
  // Prevent multiple animations
  if (isAnimating.value) return;
  
  isAnimating.value = true;
  
  // Start videos immediately
  startVideos();

  // Create GSAP timeline for smooth animation
  const tl = gsap.timeline({
    onComplete: () => {
      resetVideos();
      isAnimating.value = false;
      
      // Check if there's a pending action to execute
      if (pendingAction.value === 'leave') {
        pendingAction.value = null;
        handleMouseLeave();
      }
    }
  });

  // Step 1: Scale down and rotate to first position
  tl.to(scale, {
    value: 0.5,
    duration: videoDuration.value / 2,
    ease: "power2.out"
  })
  .to(rotation, {
    y: (-1 * (360 * 1)) - 60,
    z: -2,
    duration: videoDuration.value / 2,
    ease: "power2.out"
  }, 0) // Start at the same time as scale
  // Step 2: Scale back up and rotate to final position
  .to(scale, {
    value: 1,
    duration: videoDuration.value / 2,
    ease: "power2.inOut"
  }, videoDuration.value / 2 - 0.2)
  .to(rotation, {
    z: 0,
    y: (-1 * (360 * 1)) - 90,
    duration: videoDuration.value / 2,
    ease: "power2.inOut"
  }, videoDuration.value / 2 - 0.2);
};

const handleMouseLeave = () => {
  // If we're already animating, queue the leave action
  if (isAnimating.value) {
    pendingAction.value = 'leave';
    return;
  }
  
  isAnimating.value = true;
  
  // Kill any ongoing animations
  gsap.killTweensOf(scale);
  gsap.killTweensOf(rotation);
  
  // Start videos for reverse animation
  startVideos();
  
  // Create reverse animation timeline
  const tl = gsap.timeline({
    onComplete: () => {
      resetVideos();
      isAnimating.value = false;
      
      // Check if there's a pending action to execute
      if (pendingAction.value === 'leave') {
        pendingAction.value = null;
        handleMouseLeave();
      }
    }
  });

  // Step 1: Scale down and rotate back to first position
  tl.to(scale, {
    value: 0.5,
    duration: videoDuration.value / 2,
    ease: "power2.out"
  })
  .to(rotation, {
    y: (-1 * (360 * 1)) - 60,
    z: -2,
    duration: videoDuration.value / 2,
    ease: "power2.out"
  }, 0) // Start at the same time as scale
  // Step 2: Scale back up and rotate to initial position
  .to(scale, {
    value: 1,
    duration: videoDuration.value / 2,
    ease: "power2.inOut"
  }, videoDuration.value / 2 - 0.2)
  .to(rotation, {
    z: 0,
    y: 0,
    duration: videoDuration.value / 2,
    ease: "power2.inOut"
  }, videoDuration.value / 2 - 0.2);
};

const resetPosition = () => {
  gsap.to(scale, {
    value: 1,
    duration: videoDuration.value,
    ease: "power2.out"
  });
  gsap.to(rotation, {
    y: 0,
    z: 0,
    duration: videoDuration.value,
    ease: "power2.out"
  });
}

const resetVideos = () => {
  if (backVideo.value) {
    backVideo.value.pause();
    backVideo.value.currentTime = videoTimeCodes.start;
  }
  if (frontVideo.value) {
    frontVideo.value.pause();
    frontVideo.value.currentTime = videoTimeCodes.start;
  }
}

watch(() => props.isActive, (oldVal, newVal) => {
  if(oldVal && !newVal) {
    resetPosition();
    resetVideos();
  }
});

// Cleanup GSAP animations on unmount
onUnmounted(() => {
  gsap.killTweensOf(scale);
  gsap.killTweensOf(rotation);
});
</script>

<style lang="pcss">
:root {
  --cube-width: 276px;
  --cube-aspect-ratio: 9/15;
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