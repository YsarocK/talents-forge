<template>
  <header class="py-1 px-4 md:px-20 flex justify-between items-center bg-primary-black border-b border-primary-beige relative z-50">
    <img src="/images/logo/colored-horizontal.svg" alt="Le Talent ça se forge" class="size-20" />
    
    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center gap-12">
      <ul class="flex gap-12">
        <li class="uppercase" v-for="link in links" :key="link.label">
          <NavLink :to="link.to" :label="link.label" />
        </li>
      </ul>
    </nav>

    <!-- Mobile Burger Button -->
    <button
      ref="burgerButton"
      @click="toggleMenu"
      class="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50"
      aria-label="Toggle menu"
    >
      <span ref="line1" class="burger-line"></span>
      <span ref="line2" class="burger-line"></span>
      <span ref="line3" class="burger-line"></span>
    </button>

    <!-- Mobile Menu Overlay -->
    <div
      ref="menuOverlay"
      class="fixed inset-0 bg-primary-black z-40 md:hidden"
      style="display: none;"
    >
      <nav ref="menuNav" class="h-full flex flex-col justify-center items-center gap-8">
        <ul class="flex flex-col gap-8 text-center">
          <li class="uppercase menu-item" v-for="link in links" :key="link.label">
            <NavLink
              :to="link.to"
              :label="link.label"
              @click="closeMenu"
              class="text-2xl"
            />
          </li>
        </ul>
        <img src="/images/logo/colored-horizontal.svg" alt="Le Talent ça se forge" class="size-20 mt-8 menu-item" />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import type { Link } from '~/components/NavLink.vue'

const links: Link[] = [
  {
    label: 'Accueil',
    to: '/'
  },
  {
    label: 'Talents',
    to: '/#talents'
  },
  {
    label: 'Collaboration',
    to: '/#partners'
  },
  {
    label: 'À propos',
    to: '/#about'
  },
  {
    label: 'Contact',
    to: '/#contact'
  }
]

const burgerButton = ref<HTMLElement | null>(null)
const line1 = ref<HTMLElement | null>(null)
const line2 = ref<HTMLElement | null>(null)
const line3 = ref<HTMLElement | null>(null)
const menuOverlay = ref<HTMLElement | null>(null)
const menuNav = ref<HTMLElement | null>(null)

const isMenuOpen = ref(false)

const toggleMenu = () => {
  if (isMenuOpen.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

const openMenu = () => {
  if (!menuOverlay.value || !line1.value || !line2.value || !line3.value) return

  isMenuOpen.value = true
  menuOverlay.value.style.display = 'block'
  document.body.style.overflow = 'hidden'

  // Animation du menu overlay
  gsap.fromTo(
    menuOverlay.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: 'power2.out' }
  )

  // Animation des lignes du burger
  gsap.to(line1.value, {
    rotation: 45,
    y: 8,
    duration: 0.3,
    ease: 'power2.out'
  })
  gsap.to(line2.value, {
    opacity: 0,
    duration: 0.2,
    ease: 'power2.out'
  })
  gsap.to(line3.value, {
    rotation: -45,
    y: -8,
    duration: 0.3,
    ease: 'power2.out'
  })

  // Animation des items du menu
  if (menuNav.value) {
    const items = menuNav.value.querySelectorAll('.menu-item')
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: index * 0.1,
          ease: 'power2.out'
        }
      )
    })
  }
}

const closeMenu = () => {
  if (!menuOverlay.value || !line1.value || !line2.value || !line3.value) return

  isMenuOpen.value = false
  document.body.style.overflow = ''

  // Animation de fermeture du menu
  gsap.to(menuOverlay.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      if (menuOverlay.value) {
        menuOverlay.value.style.display = 'none'
      }
    }
  })

  // Animation des lignes du burger
  gsap.to(line1.value, {
    rotation: 0,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  })
  gsap.to(line2.value, {
    opacity: 1,
    duration: 0.2,
    ease: 'power2.out'
  })
  gsap.to(line3.value, {
    rotation: 0,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  })

  // Animation de sortie des items
  if (menuNav.value) {
    const items = menuNav.value.querySelectorAll('.menu-item')
    items.forEach((item) => {
      gsap.to(item, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: 'power2.in'
      })
    })
  }
}

// Fermer le menu si on clique en dehors
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      isMenuOpen.value &&
      menuOverlay.value &&
      burgerButton.value &&
      !menuOverlay.value.contains(event.target as Node) &&
      !burgerButton.value.contains(event.target as Node)
    ) {
      closeMenu()
    }
  }

  window.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style lang="pcss" scoped>
.burger-line {
  width: 28px;
  height: 2px;
  background-color: var(--color-primary-beige);
  transition: all 0.1s ease;
  display: block;
}
</style>