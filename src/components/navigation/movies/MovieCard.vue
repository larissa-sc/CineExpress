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
  <div class="movie-card">
    <img :src="movie.image" :alt="movie.title">
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <div class="rating" :title="movie.rating">
        {{ renderStars(movie.rating) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background-color: #2c3e50;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie-info {
  padding: 1rem;
}

h3 {
  margin: 0;
  color: white;
  font-size: 1.1rem;
}

.rating {
  color: #f1c40f;
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
</style>