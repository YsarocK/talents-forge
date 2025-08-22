<template>
  <section class="relative h-screen">
    <div class="absolute top-0 left-0 w-full h-full grid grid-rows-2 grid-cols-[var(--main-grid-columns)] bg-primary-beige gap-[1px]">
      <div class="col-span-1 bg-primary-black relative">
        <video src="/videos/home_logo_blurred.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
      <div class="col-span-3 py-16 px-8 bg-primary-black relative">
        <h1 class="z-10 font-bold text-primary-beige text-5xl flex flex-col gap-3 relative">Forgez des talents<br/><span class="font-medium">Des idées et des</span><br/>Collaborations Uniques</h1>
        <video src="/videos/home_gradient.webm" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
      <div class="col-span-1 bg-primary-black" aria-hidden />
      <div class="col-span-4 bg-primary-black">
        <video src="/videos/home_logo_animated.webm" autoplay muted loop class="w-full h-full object-cover" />
      </div>
      <div class="col-span-1 bg-primary-black" aria-hidden />
    </div>
  </section>
</template>