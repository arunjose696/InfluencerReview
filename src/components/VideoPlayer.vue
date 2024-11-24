<template>
  <div class="video-container">
    <div id="player"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      player: null,
      currentVideoIndex: 0,
      videos: [
  {
    id: "CzY0265VwWk",
    start: 122.52,
    end: 145.04
  },
  {
    id: "CgTuyknwB5E",
    start: 254.72,
    end: 256.88
  },
  {
    id: "OSmA2HiE_zA",
    start: 206.76,
    end: 230.4
  },
  {
    id: "Qh1pvOwOyE4",
    start: 140.72,
    end: 181.08
  }
]
    }
  },
  mounted() {
    // Load YouTube IFrame Player API
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = this.createNewPlayer
    } else {
      this.createNewPlayer()
    }
  },
  methods: {
    getPlayerDimensions() {
      const screenWidth = window.innerWidth
      let width

      if (screenWidth <= 480) {
        // Mobile phones
        width = screenWidth - 32  // 16px padding on each side
      } else if (screenWidth <= 768) {
        // Tablets
        width = Math.min(screenWidth - 40, 600)
      } else if (screenWidth <= 1024) {
        // Small laptops
        width = Math.min(screenWidth - 48, 800)
      } else {
        // Larger screens
        width = Math.min(screenWidth - 64, 1000)
      }

      const height = (width * 9) / 16  // maintain 16:9 ratio
      return { width, height }
    },

    createNewPlayer() {
      const video = this.videos[this.currentVideoIndex]
      const { width, height } = this.getPlayerDimensions()

      this.player = new window.YT.Player('player', {
        videoId: video.id,
        width,
        height,
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        },
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        },
      })

      window.addEventListener('resize', this.handleResize)
    },

    handleResize() {
      if (this.player && this.player.setSize) {
        const { width, height } = this.getPlayerDimensions()
        this.player.setSize(width, height)
      }
    },

    onPlayerReady() {
      this.playNextVideo()
    },

    playNextVideo() {
      if (this.currentVideoIndex < this.videos.length) {
        const video = this.videos[this.currentVideoIndex]
        this.player.loadVideoById({
          videoId: video.id,
          startSeconds: video.start,
          endSeconds: video.end
        })
      }
    },

    onPlayerStateChange(event) {
      if (event.target.getCurrentTime() >= this.videos[this.currentVideoIndex].end) {
        this.currentVideoIndex++
        if (this.currentVideoIndex < this.videos.length) {
          setTimeout(() => {
            this.playNextVideo()
          })
        } else {
          console.log("All videos played.")
        }
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    if (this.player) {
      this.player.destroy()
    }
  }
}
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;  /* Use rem for consistent padding */
  box-sizing: border-box;
}

#player {
  max-width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive padding adjustments */
@media (max-width: 480px) {
  .video-container {
    padding: 0.5rem;  /* Smaller padding on mobile */
  }
}
</style> 