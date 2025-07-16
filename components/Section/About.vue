<template>
  <div class="relative h-screen">
    <div class="absolute top-0 left-0 w-full h-full grid grid-rows-2 grid-cols-[var(--main-grid-columns)] bg-primary-beige gap-[1px]">
      <div class="col-span-2 bg-primary-black relative">
        <video src="/videos/about/03_top_left_frame.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
      <div class="col-span-3 bg-primary-black relative">
        <video src="/videos/about/04_top_right_frame.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
      <div class="col-span-2 bg-primary-black relative">
        <video src="/videos/about/02_bottom_left_frame.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
      <div class="col-span-3 bg-primary-black relative">
        <video src="/videos/about/01_bottom_right_frame.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>

    </div>
  </div>
</template>