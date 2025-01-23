<script setup>
import HeaderView from '../components/fixed/HeaderView.vue';
import MovieCard from '../components/navigation/movies/MovieCard.vue';

//const series = [
//];
</script>

<template>
  <HeaderView />
    <main>
      <div class="filters">
        <select>
          <option value="">Filtrar por gênero</option>
          <option value="a-z">A/Z</option>
          <option value="z-a">Z/A</option>
          <option value="action">Ação</option>
          <option value="animation">Animação</option>
          <option value="comedy">Comédia</option>
          <option value="drama">Drama</option>
        </select>
      </div>

      <div class="series-grid">
        <MovieCard 
          v-for="movie in movies" 
          :key="movie.id"
          :movie="movie"
        />
      </div>
  </main>
</template>

<style>
.filters {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.filters select {
  padding: 0.5rem;
  border-radius: 4px;
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar input {
    width: 100%;
  }

  .series-grid {  
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>