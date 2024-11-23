import { createRouter, createWebHistory } from 'vue-router'
import SearchMovies from '@/components/SearchMovies.vue'
import MovieReview from '@/components/MovieReviews.vue'
import VideoPage from '../views/VideoPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: SearchMovies
  },
  {
    path: '/movie/:id',
    name: 'movie-review',
    component: MovieReview, 
    props: true
  },
  {
    path: '/videos',
    name: 'videos',
    component: VideoPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router