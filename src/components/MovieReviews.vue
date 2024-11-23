<template>

 <div class="background-wrapper" :style="backgroundStyle"></div>
 <div class="content-wrapper">
  <div class="min-h-screen p-81">
    <h1 class="text-6xl font-extrabold mb-12 text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse transform hover:scale-105 transition-transform duration-300 drop-shadow-lg">
      {{ movieTitle }}
    </h1>
    
    <!-- Grid container -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">       
        <Card v-for="(review, index) in reviews" 
            :key="index" 
            class="card cursor-pointer"
            @click="toggleReview(index)">
          <CardHeader class="text-center">
            <CardTitle class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {{ review.title }}
              <div class="text-center flex items-center gap-3 mb-4">
              <div class="rounded-full w-14 h-14">
            
                <img 
                  :src="pictures[review.reviewer]"
                  :onerror="handleImageError"
                  alt="Company Logo" 
                  class="w-full h-full object-cover rounded-full"
                  referrerpolicy="no-referrer"
                />
              </div>
              <div class="flex-grow">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-lg">{{ review.reviewer }}</span>
                  <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Award class="h-3 w-3" />
                    <span>{{ review.badge }}</span>
                  </div>
                </div>
                <div class="flex gap-1 mt-1">
                  <Star
                    v-for="n in 5" 
                    :key="n"
                    class="h-4 w-4"
                    :class="{
                      'text-yellow-400': n <= Math.floor(review.rating),
                      'text-yellow-400 half-star': n === Math.ceil(review.rating) && !Number.isInteger(review.rating),
                      'text-gray-300': n > Math.ceil(review.rating)
                    }"
                    :fill="n <= Math.floor(review.rating) ? '#FBBF24' : 
                          (n === Math.ceil(review.rating) && !Number.isInteger(review.rating)) ? 'url(#half-star)' : 'none'"
                  >
                    <defs v-if="n === 1">
                      <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" stop-color="#FBBF24"/>
                        <stop offset="50%" stop-color="#D1D5DB"/>
                      </linearGradient>
                    </defs>
                  </Star>
                </div>
              </div>
            </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <!-- Always visible content -->
            
        <div class="non-clickable" @click.stop>
            <!-- Expandable content -->
            <div v-if="activeReviewId === index" 
                 class="grid gap-4 animate-fade-in">
              <!-- Positives -->
              <div class="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950 dark:to-green-900 p-4 rounded-xl border border-green-200 dark:border-green-800">
                <div class="flex items-center gap-2 mb-3">
                  <ThumbsUp class="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 class="font-bold text-green-700 dark:text-green-300">Highlights</h3>
                </div>
                <ul class="space-y-2">
                  <li v-for="(positive, idx) in review.positives"
                      :key="idx"
                      class="flex items-start gap-2 text-green-700 dark:text-green-100">
                    <span class="block w-1.5 h-1.5 mt-2 rounded-full bg-green-500 dark:bg-green-400" />
                    <a :href="review.review_link + '&t=' + positive[1]+ 's'" 
                       target="_blank" 
                       class="hover:underline">{{ positive[0] }}</a>
                  </li>
                </ul>
              </div>

              <!-- Negatives -->
              <div class="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-950 dark:to-red-900 p-4 rounded-xl border border-red-200 dark:border-red-800">
                <div class="flex items-center gap-2 mb-3">
                  <ThumbsDown class="h-5 w-5 text-red-600 dark:text-red-400" />
                  <h3 class="font-bold text-red-700 dark:text-red-300">Concerns</h3>
                </div>
                <ul class="space-y-2">
                  <li v-for="(negative, idx) in review.negatives"
                      :key="idx"
                      class="flex items-start gap-2 text-red-700 dark:text-red-100">
                    <span class="block w-1.5 h-1.5 mt-2 rounded-full bg-red-500 dark:bg-red-400" />
                    <a :href="review.review_link + '&t=' + negative[1] + 's'" 
                       target="_blank" 
                       class="hover:underline">{{ negative[0] }}</a>
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </CardContent>
        </Card>
    </div>
</div>
  </div>

</template>


<script>
import { ref,computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Star, Award, ThumbsUp, ThumbsDown } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import reviewlist from '@/assets/reviews.json';

import pictures from '@/assets/pictures.json';
import artifacts from '@/assets/artifacts.json';
export default {
  name: 'MovieReviews',
  props: {
    id: {
      type: String,
      required: true
    }
  },
    
  components: {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    
    Star,
    Award,
    ThumbsUp,
    ThumbsDown,
  },
  
  setup(props) {
    const activeReviewId = ref(null)  
    const movieTitle =   computed(() => props.id);
    const backgroundImage = ref(artifacts[movieTitle.value]) // Your default image URL
    const reviews = reviewlist[movieTitle.value]
    const route = useRoute()
    console.log(movieTitle.value)
    console.log(route.params.id)
    const backgroundStyle = {
      '--bg-image': `url(${backgroundImage.value})`
    }
    const expandedReview = ref(null)
    
   
    const toggleReview = (reviewId) => {
        
        console.log(reviewId)
      //expandedReview.value = expandedReview.value === index ? null : index
      activeReviewId.value = activeReviewId.value === reviewId ? null : reviewId
    }
    
    return {
      movieTitle,
      backgroundStyle,
      expandedReview,
      reviews,
      activeReviewId,
      pictures,
      toggleReview
    }
  }
}
</script>

<style scoped>
/* Background styles */
.background-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;  /* viewport width */
  height: 100%; /* viewport height */
  background-image: var(--bg-image);
  background-size: cover;
  background-position: cover;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 1;
  min-height: 100vh; /* ensures minimum full height */
}

.content-wrapper {
  position: sticky;
  z-index: 2;
  min-height: 100vh;
  
}


/* Card animations */
.card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2; /* Ensure cards are above background */
}
.non-clickable {
  cursor: default;  /* Changes cursor to default instead of pointer */
}

.card:not(:hover) {
  transform: scale(0.98) translateY(0);
  filter: brightness(0.95) saturate(0.9);
}

.card:hover {
  transform: scale(1.02) translateY(-12px) rotate(0.5deg);
  animation: float 4s ease-in-out infinite;
  z-index: 3;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.15),
    0 10px 10px -5px rgba(0, 0, 0, 0.08),
    0 0 20px rgba(139, 92, 246, 0.15);
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(0.5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

/* Shine effect */
.card:after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(30deg);
  transition: 0.6s;
  opacity: 0;
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Make cards clickable */
.card {
  cursor: pointer;
}

.card:hover:after {
  opacity: 1;
  transform: rotate(30deg) translateX(50%);
}
</style>