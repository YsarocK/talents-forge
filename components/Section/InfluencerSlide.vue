<template>
  <div class="relative" 
  @mouseenter="handleHover"
  >
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
     <video ref="backVideo" src="/videos/sliders/lines_back.webm" preload="auto" muted loop class="pointer-events-none absolute z-[-1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style="width: 400%; height: auto; object-fit: contain; transform-origin: center center;" />
     <video ref="frontVideo" src="/videos/sliders/lines_front.webm" preload="auto" muted loop class="pointer-events-none absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style="width: 400%; height: auto; object-fit: contain; transform-origin: center center;" />
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

const videoDuration = ref(2.5); // Duration in seconds for animations

const startVideos = () => {
  // Start both videos at 1/8 of the animation
  const videoDelay = videoDuration.value / 8;
  
  setTimeout(() => {
    if (frontVideo.value) {
      frontVideo.value.currentTime = 0;
      frontVideo.value.play();
    }
    if (backVideo.value) {
      backVideo.value.currentTime = 0;
      backVideo.value.play();
    }
  }, videoDelay * 1000);
};

const animateVideosScale = (targetScale: number, duration: number, delay: number = 0) => {
  if (frontVideo.value) {
    gsap.to(frontVideo.value, {
      scale: targetScale,
      duration: duration,
      delay: delay,
      ease: "power2.out"
    });
  }
  if (backVideo.value) {
    gsap.to(backVideo.value, {
      scale: targetScale,
      duration: duration,
      delay: delay,
      ease: "power2.out"
    });
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
    value: 0.4,
    duration: videoDuration.value / 2,
    ease: "power2.out"
  })
  // Animate videos scale to follow cube
  .call(() => {
    animateVideosScale(0.5, videoDuration.value / 2);
  }, [], 0)
  .to(rotation, {
    y: (-1 * (360 * 2)) - 60, // 2 full rotations
    z: -2,
    duration: videoDuration.value / 2,
    ease: "power2.out"
  }, 0) // Start at the same time as scale
  // Step 2: Scale back up and rotate to final position
  .to(scale, {
    value: 1,
    duration: videoDuration.value / 2,
    ease: "power2.out"
  }, videoDuration.value / 2 - 0.2)
  .to(rotation, {
    z: 0,
    y: (-1 * (360 * 2)) - 90, // 2 full rotations
    duration: videoDuration.value / 2,
    ease: "power2.out"
  }, videoDuration.value / 2 - 0.2)
  // Animate videos scale back up
  .call(() => {
    animateVideosScale(1, videoDuration.value / 2);
  }, [], videoDuration.value / 2 - 0.2);
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
    value: 0.3,
    duration: videoDuration.value / 2,
    ease: "power2.inOut"
  })
  .to(rotation, {
    y: (-1 * (360 * 2)) - 60, // 2 full rotations
    z: -2,
    duration: videoDuration.value / 2,
    ease: "power2.inOut"
  }, 0) // Start at the same time as scale
  // Animate videos scale to follow cube
  .call(() => {
    animateVideosScale(0.3, videoDuration.value / 2);
  }, [], 0)
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
  }, videoDuration.value / 2 - 0.2)
  // Animate videos scale back up
  .call(() => {
    animateVideosScale(1, videoDuration.value / 2);
  }, [], videoDuration.value / 2 - 0.2);
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
  if (frontVideo.value) {
    frontVideo.value.pause();
    frontVideo.value.currentTime = 0;
  }
  if (backVideo.value) {
    backVideo.value.pause();
    backVideo.value.currentTime = 0;
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
  will-change: transform;
  backface-visibility: hidden;
  transform: translate(-50%, -50%) translateZ(0);
}

.cube {
  position: relative;
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
  transform-style: preserve-3d;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.cube-face {
  position: absolute;
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
  background-size: cover;
  background-position: center;
  backface-visibility: hidden;
  will-change: transform;
  transform: translateZ(0);
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

video {
  max-width: unset;
  will-change: transform, scale;
  backface-visibility: hidden;
  transform: translateZ(0);
  contain: layout style paint;
}
</style> 