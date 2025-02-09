<script setup>
// Importa funções e componentes necessários do Vue e outros módulos
import { ref, computed, onMounted } from 'vue';
import router from '@/routes';
import ComponentCard from '@/components/navigation/component/ComponentCard.vue';
import DAOService from '@/services/DAOService';

const seriesService = new DAOService('series');

// Define variáveis reativas para armazenar dados
const series = ref([]); // Armazena a lista de series
const currentIndex = ref(0); // Armazena o índice atual
const pageSize = ref(6); // Armazena o tamanho da página (quantas series por passada)
const filterOption = ref(''); // Armazena a opção de filtro selecionada

// Computed property para filtrar e ordenar as series conforme a opção de filtro selecionada
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

// Computed property para calcular o número total de series
const totalSeries = computed(() => filteredSeries.value.length);

// Computed property para paginar os filmes conforme o índice atual e o tamanho da página
const paginatedSeries = computed(() => {
  const start = currentIndex.value;
  const end = start + pageSize.value;
  return filteredSeries.value.slice(start, end);
});

// Função para ir ao próximo conjunto de filmes
const nextSet = () => {
  if (currentIndex.value + pageSize.value < totalSeries.value) {
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
const detailsSeries = (id) => {
  router.push({ name: 'SerieDetails', params: { id } });
};

// Função assíncrona para buscar a lista de filmes do serviço
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
  <section class="serie-section">
    <h2 class="section-title">FILMES EM DESTAQUE</h2>
    <div class="serie-grid">
      <ComponentCard 
        v-for="(serie, index) in paginatedSeries" 
        :key="index"
        :title="serie.name"
        :imageSrc="serie.coverUrl"
        :rating="serie.vote"
        @click="detailsSeries(serie.id)"
      />
    </div>
    <div class="navigation-buttons">
      <button @click="previousSet" :disabled="currentIndex === 0">⬅️</button>
      <button @click="nextSet" :disabled="currentIndex + pageSize >= totalSeries">➡️</button>
    </div>
  </section>
</template>

<style scoped>
.serie-section {
  padding: 2rem;
}

.section-title {
  color: #ff6b00;
  margin-bottom: 1rem;
}

.serie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.serie-card {
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.serie-card:hover {
  transform: scale(1.05);
}

.serie-card img {
  width: 100%;
  height: auto;
}

.serie-card h3 {
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