<template>
  <div class="search-container">
    <input 
      type="text"
      v-model="searchQuery"
      placeholder="Search movies..."
      class="search-input"
      @input="handleSearch"
    />

    <div class="movie-grid">
      <div v-for="movie in filteredMovies" 
           :key="movie.title"
           class="movie-card"
           @click="goToReview(movie)">
        <img :src="movie.image" 
             :alt="movie.title"
             class="movie-image"
             @error="handleImageError" />
        <h3 class="movie-title">{{ movie.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import artifacts from '@/assets/artifacts.json'

export default {
  name: 'SearchMovies',
  methods: {
    goToReview(movie) {
      this.$currentMovie = movie
      this.$router.push({
        
        name: 'movie-review',
        params: { 
          id: movie.title.toLowerCase(),
        },
        state: { movie: movie }
      })
    },},
  setup() {
    const searchQuery = ref('')
    
    // Create movies array from artifacts
    const movies = Object.entries(artifacts).map(([title, image]) => ({
      title,
      image
    }))

    const filteredMovies = computed(() => {
      const query = searchQuery.value.toLowerCase()
      if (!query) return movies
      
      return movies.filter(movie => 
        movie.title.toLowerCase().includes(query)
      )
    })

    const handleSearch = () => {
      // Search happens automatically via computed property
    }

    const handleImageError = (e) => {
      e.target.src = 'fallback-image-url.jpg' // Add a fallback image URL
    }

    return {
      searchQuery,
      filteredMovies,
      handleSearch,
      handleImageError
    }
  }
}
</script>

<style scoped>
.search-container {
  margin: 1rem auto;
  max-width: 1200px;
  padding: 0 1rem;
}

.search-input {
  width: 100%;
  max-width: 500px;
  margin: 0 auto 2rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s ease;
  display: block;
}

.search-input:focus {
  border-color: #3b82f6;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.movie-card {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.movie-card:hover {
  transform: translateY(-4px);
}

.movie-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie-title {
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
}
</style>

