<template>
  <div>
    <div id="player"></div>
  </div>
</template>

<script>


export default {
  name: 'VideoPlayer',
  data() {
    return {
      player: null,
      currentVideoIndex: 0,
      videos:[
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

      // Define the YouTube callback globally
      window.onYouTubeIframeAPIReady = this.createNewPlayer
    } else {
      this.createNewPlayer()
    }
  },
  methods: {
    createNewPlayer() {
      const video = this.videos[this.currentVideoIndex]
      this.player = new window.YT.Player('player', {
        videoId: video.id,
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
      console.log(event, window.YT.PlayerState, this.currentVideoIndex)
      console.log(event.target.getCurrentTime())
      console.log(this.videos[this.currentVideoIndex])
      
      if (this.currentVideoIndex < this.videos.length && event.target.getCurrentTime() >= this.videos[this.currentVideoIndex].end) {
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
    // Cleanup
    if (this.player) {
      this.player.destroy()
    }
  }
}
</script>

<style scoped>
#player {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  aspect-ratio: 16/9;
}
</style> 