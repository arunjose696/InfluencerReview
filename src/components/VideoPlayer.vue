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
      videos: 
      [
  {
    id: "vVHWn-NiLns",
    start: 260.919,
    end: 330.16
  },
  {
    id: "vVHWn-NiLns",
    start: 378.56,
    end: 403.28
  },
  {
    id: "vVHWn-NiLns",
    start: 513.12,
    end: 531.839
  },
  {
    id: "vVHWn-NiLns",
    start: 707.76,
    end: 753.04
  },
  {
    id: "0xaTLwcBBU0",
    start: 21.68,
    end: 26.0
  },
  {
    id: "f04pgnXt8Is",
    start: 188.72,
    end: 272.479
  },
  {
    id: "f04pgnXt8Is",
    start: 396.0,
    end: 425.039
  },
  {
    id: "MDeOZdbSBCU",
    start: 51.76,
    end: 122.159
  },
  {
    id: "MDeOZdbSBCU",
    start: 334.32,
    end: 358.72
  },
  {
    id: "MDeOZdbSBCU",
    start: 395.199,
    end: 412.88
  },
  {
    id: "Jjxqvf4Q1oo",
    start: 7.24,
    end: 74.24
  },
  {
    id: "Jjxqvf4Q1oo",
    start: 209.599,
    end: 266.32
  },
  {
    id: "Jjxqvf4Q1oo",
    start: 294.96,
    end: 315.6
  },
  {
    id: "Jjxqvf4Q1oo",
    start: 499.68,
    end: 511.759
  },
  {
    id: "Jjxqvf4Q1oo",
    start: 664.2,
    end: 707.279
  },
  {
    id: "FE1jY-6byVw",
    start: 190.0,
    end: 250.0
  },
  {
    id: "FE1jY-6byVw",
    start: 275.0,
    end: 305.0
  },
  {
    id: "FE1jY-6byVw",
    start: 375.0,
    end: 410.0
  },
  {
    id: "FE1jY-6byVw",
    start: 440.0,
    end: 440.0
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