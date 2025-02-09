<script setup>
// Importa funções e componentes necessários do Vue e outros módulos
import { ref, computed, onMounted } from 'vue';
import router from '@/routes';
import HeaderView from '../components/fixed/HeaderView.vue';
import ComponentCard from '../components/navigation/component/ComponentCard.vue';
import DAOService from '@/services/DAOService';
import FooterView from '@/components/fixed/FooterView.vue';

// Cria uma instância do serviço DAOService para 'series'
const seriesService = new DAOService('series');

// Define variáveis reativas para armazenar dados
const series = ref([]); // Armazena a lista de series
const currentPage = ref(1); // Armazena a página atual
const pageSize = ref(20); // Armazena o tamanho da página (quantas series por página)
const filterOption = ref(''); // Armazena a opção de filtro selecionada

// Computed property para filtrar e ordenar os filmes conforme a opção de filtro selecionada
const filteredSeries = computed(() => {
  // Ordena series de A a Z
  if (filterOption.value === 'a-z') {
    return series.value.slice().sort((a, b) => a.title.localeCompare(b.title));
  // Ordena series de Z a A
  } else if (filterOption.value === 'z-a') {
    return series.value.slice().sort((a, b) => b.title.localeCompare(a.title));
  } else {
    // Sem ordenação
    return series.value;
  }
});

// Computed property para calcular o número total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredSeries.value.length / pageSize.value);
});

// Computed property para paginar as séries conforme a página atual e o tamanho da página
const paginatedSeries = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredSeries.value.slice(start, end);
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

// Função para navegar para a página de detalhes de uma série específico
const detailsSerie = (id) => {
  router.push({ name: 'SerieDetails', params: { id } });
};

// Função assíncrona para buscar a lista de series do serviço
const getSeries = async () => {
  try {
    series.value = await seriesService.getAll();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

// Chama a função getSeries quando o componente é montado
onMounted(() =>
  getSeries()
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
    <div class="series-grid">
      <ComponentCard 
        v-for="(serie, index) in paginatedSeries" 
        :key="index"
        :title="serie.name"
        :imageSrc="serie.coverUrl"
        :rating="serie.vote"
        @click="detailsSerie(serie.id)"
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
  <FooterView/>
</template>

<style>
/* Estilos para a seção de filtros */
.filters {
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

.filters select {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 15px;
}

/* Grade de series */
.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 30px 75px 30px 75px;
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
  .series-grid {  
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>