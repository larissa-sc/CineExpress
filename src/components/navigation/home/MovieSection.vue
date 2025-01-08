<script setup>
const movies = [
  {
    title: 'Harry Potter',
    image: '/path/to/harry-potter.jpg'
  },
  {
    title: 'Frozen',
    image: '/path/to/frozen.jpg'
  },
  // Add more movies
]
</script>

<template>
  <section class="movie-section">
    <h2 class="section-title">FILMES EM DESTAQUE 2024</h2>
    <div class="movie-grid">
      <div v-for="movie in movies" :key="movie.title" class="movie-card">
        <img :src="movie.image" :alt="movie.title">
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
.movie-section {
  padding: 2rem;
}

.section-title {
  color: #ff6b00;
  margin-bottom: 1rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.movie-card {
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: auto;
}

.movie-card h3 {
  padding: 0.5rem;
  text-align: center;
}
</style>