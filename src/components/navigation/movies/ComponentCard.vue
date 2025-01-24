<script setup>
//const props = defineProps({
//  movies: {
//    type: array,
//    required: true
//  }
//});

const renderStars = (rating) => {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
};
</script>

<template>
  <div class="component-card">
    <div v-for="movie in movies" :key="movie.title" class="component">
      <img :src="movie.image" :alt="movie.title">
      <h3>{{ movie.title }}</h3>
    </div>
    <div class="rating" :title="movie.rating">
        {{ renderStars(movie.rating) }}
    </div>
  </div>
</template>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.component-card {
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.component-card:hover {
  transform: scale(1.05);
}

.component-card img {
  width: 100%;
  height: auto;
}

.component-card h3 {
  padding: 0.5rem;
  text-align: center;
}

.rating {
  color: #f1c40f;
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
</style>