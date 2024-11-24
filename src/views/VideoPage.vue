<template>
  <div class="video-page min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-indigo-900 to-black p-8 overflow-hidden">
    <div class="floating-particles"></div>
    <div class="max-w-6xl mx-auto relative z-10">
      <h1 class="text-5xl font-black text-center mb-12 animate-title-slide-down">
        <span class="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent hover:scale-110 hover:rotate-1 transition-all duration-500 cursor-default tracking-tight font-extrabold">
          Review Cuts from
        </span>
        <span class="block mt-2 text-2xl font-light text-purple-300/80">
        Nazriya Nazim Performance
        </span>
      </h1>
    
      
      <div class="group perspective-1000">
        <div class="transform-gpu transition-all duration-700 group-hover:rotate-y-2 group-hover:scale-105">
          <div class="rounded-3xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl p-10 shadow-[0_0_50px_rgba(139,92,246,0.3)] ring-1 ring-purple-500/30 animate-float">
            <div class="animate-fade-in">
              <VideoPlayer />
            </div>
          </div>
        </div>
      </div>
    </div>
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