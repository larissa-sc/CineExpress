<script setup>
import { ref, computed, onMounted } from 'vue';
import router from '@/routes';
import HeaderView from '../components/fixed/HeaderView.vue';
import ComponentCard from '../components/navigation/component/ComponentCard.vue';
import DAOService from '@/services/DAOService';

const moviesService = new DAOService('movies');
const movies = ref([]);
const currentPage = ref(1);
const pageSize = ref(16);

const totalPages = computed(() => {
  return Math.ceil(movies.value.length / pageSize.value);
});

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return movies.value.slice(start, end);
});

const pagesToShow = computed(() => {
  const startPage = Math.max(currentPage.value - 1, 1);
  const endPage = Math.min(currentPage.value + 1, totalPages.value);
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const detailsMovies = (id) => {
  router.push({ name: "DetalheFilmes", params: { id } });
};

const getMovies = async () => {
  try {
    movies.value = await moviesService.getAll();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

onMounted(() =>
  getMovies()
);
</script>

<template>
  <HeaderView />
  <main>
    <div class="filters">
      <select>
        <option value="">Filtrar</option>
        <option value="a-z">A/Z</option>
        <option value="z-a">Z/A</option>
      </select>
    </div>

    <div class="movies-grid">
      <ComponentCard 
        v-for="(movie, index) in paginatedMovies" 
        :key="index"
        :title="movie.title"
        :imageSrc="movie.coverUrl"
        @click="detailsMovies(movie.id)"
      />
    </div>

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Anterior</button>
      <button
        v-for="page in pagesToShow"
        :key="page"
        @click="changePage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Próximo</button>
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

.movies-grid {
  display: grid;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;
}

.movies-grid > * {
  width: 100%; /* Garante que todos os itens na grid ocupem 100% da coluna */
  box-sizing: border-box; /* Inclui padding e border na largura do elemento */
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid #ccc;
  background-color: #fff;
  color: black;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  color: black;
}

@media (max-width: 768px) {
  .movies-grid {  
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>