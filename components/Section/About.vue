<template>
  <section class="relative h-screen" id="about">
    <div class="absolute top-0 left-0 w-full h-full grid grid-rows-2 grid-cols-[var(--main-grid-columns)] bg-primary-beige gap-[1px]">
      <div class="col-span-2 bg-primary-black relative">
        <video src="/videos/about/03_top_left_frame.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
        <div class="absolute p-20 top-0 left-0 w-full flex justify-center items-center">
          <p class="text-primary-beige text-8xl font-bold uppercase">Qui<br/> sommes<br/> nous ?</p>
          <div class="w-full h-full flex justify-center items-center">
            <video src="/videos/arrow.webm" preload="auto" autoplay muted loop class="w-20 h-20 rotate-90" />
          </div>
        </div>
      </div>
      <div class="col-span-3 bg-primary-black relative">
        <video src="/videos/about/04_top_right_frame.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
        <div class="absolute p-20 top-0 left-0 flex w-full h-full flex-col justify-center items-center">
          <img src="/images/logo/colored-horizontal.svg" alt="Logo" class=" w-full h-full object-contain" />
        </div>
      </div>
      <div class="col-span-2 bg-primary-black relative">
        <video src="/videos/about/02_bottom_left_frame.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
        <div class="absolute p-20 top-0 left-0 flex flex-col justify-center items-center">
          <p class="text-primary-beige font-[sans-serif] text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Amet, consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Amet, consectetur.</p>
        </div>
      </div>
      <div class="col-span-3 bg-primary-black relative">
        <video src="/videos/about/01_bottom_right_frame.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>

    </div>
  </section>
</template>