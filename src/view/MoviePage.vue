<script setup>
import HeaderView from '../components/fixed/HeaderView.vue';
import MovieCard from '../components/navigation/movies/MovieCard.vue';

const movies = [
  {
    id: 1,
    title: 'Harry Potter',
    image: 'https://picsum.photos/200/300',
    rating: 4.5
  },
  {
    id: 2,
    title: 'Frozen 2',
    image: 'https://picsum.photos/200/300',
    rating: 4.8
  },
  {
    id: 3,
    title: 'Star Wars',
    image: 'https://picsum.photos/200/300',
    rating: 4.7
  },
  {
    id: 4,
    title: 'Inside Out',
    image: 'https://picsum.photos/200/300',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Megamente',
    image: 'https://picsum.photos/200/300',
    rating: 4.4
  }
];
</script>

<template>
  <div class="app-container">
    <HeaderView />
    <main>
      <div class="filters">
        <select>
          <option value="">Filtrar por gênero</option>
          <option value="action">Ação</option>
          <option value="comedy">Comédia</option>
          <option value="drama">Drama</option>
        </select>
      </div>

      <div class="movies-grid">
        <MovieCard 
          v-for="movie in movies" 
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </main>
  </div>
</template>

<style>
* { margin: 0; padding: 0; }
.app-container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  color: white;
}

.filters {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.filters select {
  padding: 0.5rem;
  border-radius: 4px;
}

.movies-grid {
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

  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>