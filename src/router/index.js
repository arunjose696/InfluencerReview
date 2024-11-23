import { createRouter, createWebHistory } from 'vue-router'
import SearchMovies from '@/components/SearchMovies.vue'
import MovieReview from '@/components/MovieReviews.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router