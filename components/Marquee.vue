<template>
  <div class="marquee-container text-primary-beige py-10">
    <div class="marquee text-2xl font-bold">
      <span v-for="i in 20" :key="i">DÉCOUVREZ NOS TALENTS -&nbsp;</span>
    </div>
  </div>
</template>

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
