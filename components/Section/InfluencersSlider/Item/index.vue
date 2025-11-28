<template>
  <div class="relative" 
  >
  <div class="cube-container">
    <div class="cube" ref="cubeElement" :style="{
      transform: `translate3d(0, 0, 0) scale3d(${transformValues.scale}, ${transformValues.scale}, ${transformValues.scale}) rotateX(${transformValues.rotationX}deg) rotateY(${transformValues.rotationY}deg) rotateZ(${transformValues.rotationZ}deg)`
    }">
        <div class="cube-face front">
          <SectionInfluencersSliderItemFront :data="data" />
        </div>
        <div aria-hidden="true" class="cube-face back"></div>
        <div class="cube-face right">
          <SectionInfluencersSliderItemBack :data="data" />
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
import type { Slide } from '../data';

type Props = {
  data: Slide;
  isActive: boolean;
}

const props = defineProps<Props>();

const backVideo = ref<HTMLVideoElement | null>(null);
const frontVideo = ref<HTMLVideoElement | null>(null);
const cubeElement = ref<HTMLElement | null>(null);

const state = ref<'initial' | 'hovered'>('initial');

const isAnimating = ref(false);
const pendingAction = ref<'leave' | null>(null);
const isSectionVisible = ref(false);
const hasAnimatedOnce = ref(false);

// Store transform values for manual transform construction
const transformValues = reactive({
  scale: 1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
});

const videoDuration = ref(2.5); // Duration in seconds for animations

const startVideos = () => {
  // Start both videos at 1/8 of the animation
  const videoDelay = videoDuration.value / 6;
  
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
      ease: "power2.out",
      force3D: true // Force GPU acceleration with matrix3d
    });
  }
  if (backVideo.value) {
    gsap.to(backVideo.value, {
      scale: targetScale,
      duration: duration,
      delay: delay,
      ease: "power2.out",
      force3D: true // Force GPU acceleration with matrix3d
    });
  }
};

const activateAnimation = () => {
  // For the first animation, only trigger if section is visible
  if (!hasAnimatedOnce.value && !isSectionVisible.value) {
    return;
  }
  
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
        deactivateAnimation();
      }
    }
  });

  // Step 1: Scale down and rotate to first position
  // Animate transform values - GSAP will optimize with matrix3d via translate3d/scale3d
  tl.to(transformValues, {
    scale: 0.4,
    rotationY: (-1 * (360 * 2)) - 60, // 2 full rotations
    rotationZ: -10,
    duration: videoDuration.value / 2,
    ease: "power2.out"
  }, 0)
  // Animate videos scale to follow cube
  .call(() => {
    animateVideosScale(0.5, videoDuration.value / 2);
  }, [], 0)
  // Step 2: Scale back up and rotate to final position
  .to(transformValues, {
    scale: 1,
    rotationZ: 0,
    rotationY: (-1 * (360 * 2)) - 90, // 2 full rotations
    duration: videoDuration.value / 2,
    ease: "power2.out"
  }, videoDuration.value / 2 - 0.2)
  // Animate videos scale back up
  .call(() => {
    animateVideosScale(1, videoDuration.value / 2);
  }, [], videoDuration.value / 2 - 0.2);

  state.value = 'hovered';
  hasAnimatedOnce.value = true;
};

const deactivateAnimation = () => {
  if (state.value === 'initial') return;

  if (isAnimating.value) {
    pendingAction.value = 'leave';
    return;
  }
  
  isAnimating.value = true;
  
  // Kill any ongoing animations
  gsap.killTweensOf(transformValues);
  
  // Start videos immediately (same as hover)
  startVideos();
  
  // Create reverse animation timeline with same parameters as hover
  const tl = gsap.timeline({
    onComplete: () => {
      resetVideos();
      isAnimating.value = false;
      
      // Check if there's a pending action to execute
      if (pendingAction.value === 'leave') {
        pendingAction.value = null;
        deactivateAnimation();
      }
    }
  });

  // Step 1: Scale down and rotate back (reverse of hover animation)
  // Animate transform values - GSAP will optimize with matrix3d via translate3d/scale3d
  tl.to(transformValues, {
    scale: 0.4, // Same as hover
    rotationY: (-1 * (360 * 2)) - 60, // 2 full rotations in reverse direction
    rotationZ: -10, // Opposite of hover
    duration: videoDuration.value / 2,
    ease: "power2.out" // Same easing as hover
  }, 0)
  // Animate videos scale to follow cube
  .call(() => {
    animateVideosScale(0.5, videoDuration.value / 2);
  }, [], 0)
  // Step 2: Scale back to normal and rotate to initial position (0, 0)
  .to(transformValues, {
    scale: 1,
    rotationZ: 0,
    rotationY: 0, // Back to initial position
    duration: videoDuration.value / 2,
    ease: "power2.out" // Same easing as hover
  }, videoDuration.value / 2 - 0.2)
  // Animate videos scale back up
  .call(() => {
    animateVideosScale(1, videoDuration.value / 2);
  }, [], videoDuration.value / 2 - 0.2);

  state.value = 'initial';
};

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

// Initialize transform values and set up intersection observer
onMounted(() => {
  transformValues.scale = 1;
  transformValues.rotationX = 0;
  transformValues.rotationY = 0;
  transformValues.rotationZ = 0;
  
  // Find the section parent (with id="talents")
  const section = document.getElementById('talents');
  if (!section) return;
  
  // Set up Intersection Observer to detect when section enters viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isSectionVisible.value = true;
          
          // If slide is active and hasn't animated yet, trigger animation
          if (props.isActive && !hasAnimatedOnce.value) {
            activateAnimation();
          }
        } else {
          isSectionVisible.value = false;
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the section is visible
      rootMargin: '0px'
    }
  );
  
  observer.observe(section);
  
  // Cleanup on unmount
  onUnmounted(() => {
    observer.disconnect();
  });
});

watch(() => props.isActive, (newVal, oldVal) => {
  if(oldVal && !newVal) {
    deactivateAnimation();
  } else if(!oldVal && newVal) {
    // Only activate if section is visible OR if we've already animated once
    if (isSectionVisible.value || hasAnimatedOnce.value) {
      activateAnimation();
    }
  }
});

// Cleanup GSAP animations on unmount
onUnmounted(() => {
  gsap.killTweensOf(transformValues);
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
  transform: translate3d(-50%, -50%, 0);
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
  perspective: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  backface-visibility: hidden;
}

.cube {
  position: relative;
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
  transform-style: preserve-3d;
  will-change: transform;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transform-origin: center center;
}

.cube-face {
  position: absolute;
  width: var(--cube-width);
  aspect-ratio: var(--cube-aspect-ratio);
  background-size: cover;
  background-position: center;
  backface-visibility: hidden;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.front {
  transform: translate3d(0, 0, calc(var(--cube-width) / 2));
}

.back {
  transform: rotateY(180deg) translate3d(0, 0, calc(var(--cube-width) / 2));
  background-color: #160F1B;
}

.right {
  transform: rotateY(90deg) translate3d(0, 0, calc(var(--cube-width) / 2));
}

.left {
  transform: rotateY(-90deg) translate3d(0, 0, calc(var(--cube-width) / 2));
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
  transform: translate3d(0, 0, 0);
  contain: layout style paint;
}
</style> 