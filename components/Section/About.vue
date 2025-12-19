<template>
  <section class="relative md:min-h-screen" id="about">
    <div class="w-full grid grid-cols-1 md:grid-cols-[var(--main-grid-columns)] bg-primary-beige gap-[1px]">
      <div class="col-span-1 md:col-span-2 bg-primary-black relative">
        <video src="/videos/about/03_top_left_frame.webm" preload="auto" autoplay muted playsinline loop class="absolute top-0 left-0 w-full h-full object-cover" />
        <div class="relative p-20 w-full flex justify-center items-center">
          <p class="text-primary-beige text-5xl md:text-8xl font-bold uppercase">Qui<br/> sommes<br/> nous ?</p>
          <div class="w-full h-full flex justify-center items-center">
            <video src="/videos/arrow.webm" preload="auto" autoplay muted playsinline loop class="w-20 h-20 rotate-90" />
          </div>
        </div>
      </div>
      <div class="col-span-1 md:col-span-3 bg-primary-black relative">
        <video src="/videos/about/04_top_right_frame.webm" preload="auto" autoplay muted playsinline loop class="absolute top-0 left-0 w-full h-full object-cover" />
        <div class="absolute p-20 top-0 left-0 flex w-full h-full flex-col justify-center items-center">
          <img src="/images/logo/colored-horizontal.svg" alt="Logo" class=" w-full h-full object-contain" />
        </div>
      </div>
      <div class="col-span-1 md:col-span-2 bg-primary-black relative">
        <video src="/videos/about/02_bottom_left_frame.webm" preload="auto" autoplay muted playsinline loop class="absolute top-0 left-0 w-full h-full object-cover" />
        <div class="relative p-20  flex flex-col justify-center items-center text-primary-beige font-[sans-serif] text-xl">
          <div class="flex flex-col gap-4">
            <p>
              <strong>Chez Talent’s Forge, nous croyons que chaque talent mérite de briller.</strong>
              <br/>Notre mission ? Accompagner les créateurs et les personnalités dans la réalisation de contenus uniques, tout en favorisant leur développement personnel et professionnel.
              <br/>Nous sommes bien plus qu’un simple intermédiaire : nous sommes un partenaire de confiance, qui facilite les échanges entre marques et talents, en respectant l’identité de chacun. De la conception à la publication, nous guidons chaque étape pour que vos idées prennent vie avec authenticité et impact.
              <br/>
            </p>
            <p>Nos expertises couvrent : <br/></p>
            <ul class="list-disc list-inside">
              <li>La valorisation et la commercialisation des talents</li>
              <li>Le respect et la cohérence de l’image des marques</li>
              <li>La production vidéo en direct ou en différé</li>
              <li>L’accompagnement événementiel pour des expériences mémorables</li>
            </ul>
            <br/>
            <p>Rejoindre notre univers, c’est entrer dans une communauté où la créativité se forge, où les collaborations deviennent des histoires inspirantes. </p>
          </div>
        </div>
      </div>
      <div class="hidden md:block col-span-1 md:col-span-3 bg-primary-black relative">
        <video src="/videos/about/01_bottom_right_frame.webm" preload="auto" autoplay muted playsinline loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>

    </div>
  </section>
</template>