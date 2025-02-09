<script setup>
// Importa funções e componentes necessários do Vue e outros módulos
import { ref, computed, onMounted } from 'vue';
import router from '@/routes';
import ComponentCard from '@/components/navigation/component/ComponentCard.vue';
import DAOService from '@/services/DAOService';

const moviesService = new DAOService('movies');

// Define variáveis reativas para armazenar dados
const movies = ref([]); // Armazena a lista de filmes
const currentIndex = ref(0); // Armazena o índice atual
const pageSize = ref(6); // Armazena o tamanho da página (quantos filmes por passada)
const filterOption = ref(''); // Armazena a opção de filtro selecionada

// Computed property para filtrar e ordenar os filmes conforme a opção de filtro selecionada
const filteredMovies = computed(() => {
  // Filtra filmes com 'vote' maior que 7
  const filteredByVote = movies.value.filter(movie => movie.vote > 7);
  
  // Ordena filmes de A a Z
  if (filterOption.value === 'a-z') {
    return filteredByVote.slice().sort((a, b) => a.title.localeCompare(b.title));
  // Ordena filmes de Z a A
  } else if (filterOption.value === 'z-a') {
    return filteredByVote.slice().sort((a, b) => b.title.localeCompare(a.title));
  } else {
    // Sem ordenação
    return filteredByVote;
  }
});

// Computed property para calcular o número total de filmes
const totalMovies = computed(() => filteredMovies.value.length);

// Computed property para paginar os filmes conforme o índice atual e o tamanho da página
const paginatedMovies = computed(() => {
  const start = currentIndex.value;
  const end = start + pageSize.value;
  return filteredMovies.value.slice(start, end);
});

// Função para ir ao próximo conjunto de filmes
const nextSet = () => {
  if (currentIndex.value + pageSize.value < Math.min(18, totalMovies.value)) {
    currentIndex.value += pageSize.value;
  }
};

// Função para ir ao conjunto de filmes anterior
const previousSet = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= pageSize.value;
  }
};

// Função para navegar para a página de detalhes de um filme específico
const detailsMovies = (id) => {
  router.push({ name: 'MovieDetails', params: { id } });
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
  <section class="movie-section">
    <h1 class="section-title">FILMES COM MELHOR AVALIAÇÃO</h1>
    <div class="movie-grid">
      <ComponentCard 
        v-for="(movie, index) in paginatedMovies" 
        :key="index"
        :title="movie.title"
        :imageSrc="movie.coverUrl"
        :rating="movie.vote"
        @click="detailsMovies(movie.id)"
      />
    </div>
    <div class="navigation-buttons">
      <button @click="previousSet" :disabled="currentIndex === 0"> 🡸 </button>
      <button @click="nextSet" :disabled="currentIndex + pageSize >= Math.min(18, totalMovies.value)"> 🡺 </button>
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

.movie-card h1 {
  padding: 0.5rem;
  text-align: center;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.navigation-buttons button {
  background-color: #ff6b00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.navigation-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>