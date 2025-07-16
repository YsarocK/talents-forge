<template>
  <div class="relative" id="contact">
    <div class=" top-0 left-0 w-full h-full grid grid-rows-2 grid-cols-[var(--main-grid-columns)] bg-[#110d0e]">
      <div class="col-span-1 row-span-2 relative overflow-hidden">
        <div class="contact-background z-0 absolute top-0 left-[-30%] w-[250%] h-[60%]"></div>
        <div class="relative px-10 py-6 top-0 left-0 w-full flex flex-col gap-8">
          <img src="/images/logo/complex_light.svg" alt="Le Talent ça se forge" class="w-24 aspect-square" />
          <p class="text-primary-beige text-5xl font-bold uppercase">Contactez nous <span class="text-primary-red">aujourd'hui</span></p>
          <ul class="max-w-[80%] flex flex-col gap-8">
            <li class="flex items-center pb-2 text-primary-beige border-b border-primary-beige/20">
               <video src="/videos/contact/flamme.webm" preload="auto" autoplay muted loop class="w-20 z-[10]" />
              <div class="flex flex-col gap-0.5 -ml-5">
                <p class="text-xl font-bold">Adresse :</p>
                <p class="font-poppins text-xs">13 Rue de rochefort, Bât A2, Appt 18</p>
              </div>
            </li>
            <li class="flex items-center pb-2 text-primary-beige border-b border-primary-beige/20">
               <video src="/videos/contact/flamme.webm" preload="auto" autoplay muted loop class="w-20 z-[10]" />
              <div class="flex flex-col gap-0.5 -ml-5">
                <p class="text-xl font-bold">Email :</p>
                <p class="font-poppins text-xs">contact@tofill.com</p>
              </div>
            </li>
            <li class="flex items-center pb-2 text-primary-beige border-b border-primary-beige/20">
               <video src="/videos/contact/flamme.webm" preload="auto" autoplay muted loop class="w-20 z-[10]" />
              <div class="flex flex-col gap-0.5 -ml-5">
                <p class="text-xl font-bold">Téléphone :</p>
                <p class="font-poppins text-xs">+33 0 00 00 00 00</p>
              </div>
            </li>
          </ul>
          <div class="flex flex-col gap-2 text-primary-beige">
            <div class="flex items-center pb-2  ">
              <video src="/videos/contact/flamme.webm" preload="auto" autoplay muted loop class="w-20 z-[10]" />
              <div class="flex flex-col gap-0.5 -ml-5">
                <p class="text-xl font-bold">Écrivez-nous :</p>
              </div>
            </div>
            <form class="grid grid-cols-2 border text-lg border-primary-beige/20 rounded-2xl">
              <input type="text" placeholder="Nom :" class="outline-none px-3 py-1 bg-transparent border-b border-primary-beige/20 border-r">
              <input type="text" placeholder="Prénom :" class="outline-none px-3 py-1 bg-transparent border-b border-primary-beige/20">
              <input type="email" placeholder="Email :" class="outline-none px-3 py-1 bg-transparent border-b border-primary-beige/20 border-r">
              <input type="tel" placeholder="Téléphone :" class="outline-none px-3 py-1 bg-transparent border-b border-primary-beige/20">
              <input type="text" placeholder="Objet :" class="outline-none px-3 py-1 bg-transparent col-span-2 border-b border-primary-beige/20">
              <textarea placeholder="Message :" class="outline-none col-span-2 px-3 py-1 bg-transparent"></textarea>
            </form>
          </div>
        </div>
      </div>
      <div class="col-span-4 row-span-2 bg-primary-black relative">
        <video src="/videos/contact/background.webm" preload="auto" autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<style lang="pcss" scoped>
.contact-background {
  background: #D15431;
  background: radial-gradient(ellipse at top center,rgb(209, 84, 49) 0%, rgb(140, 43, 33) 20%, rgb(17, 13, 14) 70%);
}

form input::placeholder,
form textarea::placeholder {
  color: var(--primary-beige);
}
</style>