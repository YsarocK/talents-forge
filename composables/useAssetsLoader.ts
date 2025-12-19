interface UseAssetsLoaderReturn {
  isLoading: Ref<boolean>
  loadedCount: Ref<number>
  totalCount: Ref<number>
  waitForAssets: () => Promise<void>
}

export const useAssetsLoader = (): UseAssetsLoaderReturn => {
  const isLoading = ref(true)
  const loadedCount = ref(0)
  const totalCount = ref(0)

  const waitForAssets = (): Promise<void> => {
    return new Promise((resolve) => {
      // SSR guard - skip on server
      if (import.meta.server) {
        isLoading.value = false
        resolve()
        return
      }

      // Exclude loader video (has data-loader attribute)
      const videos = document.querySelectorAll<HTMLVideoElement>('video:not([data-loader])')
      const images = Array.from(document.querySelectorAll<HTMLImageElement>('img')).filter((img) => {
        const src = img.src.toLowerCase()
        return /\.(jpg|jpeg|png|webp)(\?.*)?$/.test(src)
      })

      const totalAssets = videos.length + images.length
      totalCount.value = totalAssets

      if (totalAssets === 0) {
        isLoading.value = false
        resolve()
        return
      }

      let loaded = 0
      const abortController = new AbortController()
      const autoplayVideos: HTMLVideoElement[] = []

      const finishLoading = () => {
        if (!isLoading.value) return // Already finished
        abortController.abort()
        isLoading.value = false
        // Start all autoplay videos now that loader is gone
        autoplayVideos.forEach((video) => {
          video.play().catch(() => {
            // Autoplay blocked by browser policy - ignore silently
          })
        })
        resolve()
      }

      const checkAllLoaded = () => {
        loaded++
        loadedCount.value = loaded
        if (loaded >= totalAssets) {
          finishLoading()
        }
      }

      // Handle videos
      videos.forEach((video) => {
        // Force preload to ensure video data is fetched
        video.preload = 'auto'

        // Pause autoplay videos - we'll start them after loader is removed
        const hasAutoplay = video.hasAttribute('autoplay')
        if (hasAutoplay) {
          video.pause()
          autoplayVideos.push(video)
        }

        // First frame is available (HAVE_CURRENT_DATA or better)
        if (video.readyState >= 2) {
          checkAllLoaded()
          return
        }

        // Wait for first frame to be ready
        video.addEventListener('loadeddata', checkAllLoaded, {
          once: true,
          signal: abortController.signal,
        })

        video.addEventListener(
          'error',
          () => {
            console.warn('Video failed to load:', video.src)
            checkAllLoaded()
          },
          { once: true, signal: abortController.signal }
        )
      })

      // Handle images
      images.forEach((img) => {
        if (img.complete && img.naturalHeight !== 0) {
          checkAllLoaded()
          return
        }

        img.addEventListener('load', checkAllLoaded, {
          once: true,
          signal: abortController.signal,
        })
        img.addEventListener(
          'error',
          () => {
            console.warn('Image failed to load:', img.src)
            checkAllLoaded()
          },
          { once: true, signal: abortController.signal }
        )
      })
    })
  }

  return {
    isLoading,
    loadedCount,
    totalCount,
    waitForAssets,
  }
}
