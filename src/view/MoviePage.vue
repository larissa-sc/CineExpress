<script setup>
// Importa funções e componentes necessários do Vue e outros módulos
import { ref, computed, onMounted } from 'vue';
import router from '@/routes';
import HeaderView from '../components/fixed/HeaderView.vue';
import ComponentCard from '../components/navigation/component/ComponentCard.vue';
import DAOService from '@/services/DAOService';

// Cria uma instância do serviço DAOService para 'movies'
const moviesService = new DAOService('movies');

// Define variáveis reativas para armazenar dados
const movies = ref([]); // Armazena a lista de filmes
const currentPage = ref(1); // Armazena a página atual
const pageSize = ref(20); // Armazena o tamanho da página (quantos filmes por página)
const filterOption = ref(''); // Armazena a opção de filtro selecionada

// Computed property para filtrar e ordenar os filmes conforme a opção de filtro selecionada
const filteredMovies = computed(() => {
  // Ordena filmes de A a Z
  if (filterOption.value === 'a-z') {
    return movies.value.slice().sort((a, b) => a.title.localeCompare(b.title));
  // Ordena filmes de Z a A
  } else if (filterOption.value === 'z-a') {
    return movies.value.slice().sort((a, b) => b.title.localeCompare(a.title));
  } else {
    // Sem ordenação
    return movies.value;
  }
});

// Computed property para calcular o número total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredMovies.value.length / pageSize.value);
});

// Computed property para paginar os filmes conforme a página atual e o tamanho da página
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredMovies.value.slice(start, end);
});

// Computed property para determinar quais páginas mostrar no controle de paginação
const pagesToShow = computed(() => {
  const startPage = Math.max(currentPage.value - 1, 1);
  const endPage = Math.min(currentPage.value + 1, totalPages.value);
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

// Função para mudar a página atual
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Função para ir à página anterior
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Função para ir à próxima página
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Função para navegar para a página de detalhes de um filme específico
const detailsMovies = (id) => {
  router.push({ name: "DetalheFilmes", params: { id } });
};

// Função assíncrona para buscar a lista de filmes do serviço
const getMovies = async () => {
  try {
    movies.value = await moviesService.getAll();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

// Chama a função getMovies quando o componente é montado
onMounted(() =>
  getMovies()
);
</script>

<template>
  <!-- Componente de cabeçalho fixo -->
  <HeaderView />
  <main>
    <!-- Seção de filtros -->
    <div class="filters">
      <select v-model="filterOption">
        <option value="">Filtrar</option>
        <option value="a-z">A/Z</option>
        <option value="z-a">Z/A</option>
      </select>
    </div>

    <!-- Grade de filmes -->
    <div class="movies-grid">
      <ComponentCard 
        v-for="(movie, index) in paginatedMovies" 
        :key="index"
        :title="movie.title"
        :imageSrc="movie.coverUrl"
        :rating="movie.vote"
        @click="detailsMovies(movie.id)"
      />
    </div>

    <!-- Controles de paginação -->
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
/* Estilos para a seção de filtros */
.filters {
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

.filters select {
  padding: 20px;
  border-radius: 4px;
  font-size: 15px;
}

/* Grade de filmes */
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* Controles de paginação */
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

/* Estilos para dispositivos móveis */
@media (max-width: 768px) {
  .movies-grid {  
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>