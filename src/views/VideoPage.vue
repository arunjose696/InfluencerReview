<template>
  <div class="video-page">
    <h1>Video Player</h1>
    <VideoPlayer />
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue'

export default {
  name: 'VideoPage',
  components: {
    VideoPlayer
  }
}
</script> 