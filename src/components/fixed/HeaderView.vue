// HeaderView.vue
<script setup>
import SideMenu from './SideMenu.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DAOService from '@/services/DAOService';
import { checkUserAuthentication } from '@/services/authService';  // Importa o serviço de autenticação

// Cria instâncias dos serviços DAOService para cada coleção
const moviesService = new DAOService('movies');
const seriesService = new DAOService('series');

// Variáveis reativas para armazenar dados
const searchQuery = ref('');
const movies = ref([]);
const series = ref([]);
const searchResults = ref([]);
const isUserLoggedIn = ref(false);  // Adiciona a variável de estado de autenticação

// Função assíncrona para buscar todas as coleções
const getCollections = async () => {
  try {
    movies.value = await moviesService.getAll();
    series.value = await seriesService.getAll();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

// Chama a função getCollections para garantir que os dados estejam disponíveis
getCollections();

// Computed property para filtrar os resultados de todas as coleções com base na consulta de busca
const filteredResults = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const filteredMovies = movies.value.filter(movie => movie.title.toLowerCase().includes(query));
  const filteredSeries = series.value.filter(serie => serie.name.toLowerCase().includes(query));
  return [...filteredMovies, ...filteredSeries];
});

// Função para atualizar os resultados da busca
const performSearch = () => {
  searchResults.value = filteredResults.value;
};

// Função para navegar para o resultado selecionado
const router = useRouter();
const navigateToResult = (result) => {
  // Redireciona para a página de detalhes do resultado (assumindo que todas as coleções têm uma página de detalhes)
  router.push({ name: 'MovieDetails' || 'SerieDetails', params: { id: result.id } });
};

// Função para verificar a autenticação do usuário
const initializeAuth = () => {
  checkUserAuthentication((user) => {
    isUserLoggedIn.value = !!user;
  });
};

// Chama a função de verificação de autenticação ao montar o componente
onMounted(() => {
  initializeAuth();
});
</script>

<template>
  <header class="header">
    <SideMenu />
    <div class="logo-container">
      <img class="logo" src="../../assets/images/logo.png" alt="Logo" />
    </div>
    <div class="search-container">
      <input v-model="searchQuery" placeholder="Buscar... 🔍" @input="performSearch" class="search-input" />
      <div class="search-results" v-if="searchQuery">
        <div v-for="result in searchResults" :key="result.id" @click="navigateToResult(result)" class="search-result-item">
        <div class="result-info">
          <h4>{{ result.title }}</h4>
        </div>
      </div>
      </div>
    </div>
    <div class="auth-container">
      <!-- Exibe mensagem de boas-vindas se o usuário estiver logado -->
      <div v-if="isUserLoggedIn">Bem-vindo!</div>
      <!-- Link para a página de login se o usuário não estiver logado -->
      <router-link v-else to="/login" class="auth-link"><button class="login-button">Login</button></router-link>
      <!-- Link para a página de cadastro -->
      <router-link to="/register" class="auth-link"><button class="register-button">Cadastre-se</button></router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;       /*faz com que se adapte à página*/
  background-color: #108d9b;  /* cor de fundo */
  padding: 1rem 2rem;    /*espaço interno*/
  display: flex;       /*itens internos de forma flexível*/
  justify-content: space-between;   /*alinha de forma linear os itens*/
  align-items: flex-end;   /*itens alinhados na borda inferior*/
}

.logo-container {
  position: relative;
  display: flex;
  left: 10px;
  align-items: center;
}

.logo {
  height: 100px;     /*tamanho da logo definido*/
}

.search-container {
  position: relative;
  display: flex;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem;
  border: none;
  width: 250px;    /* Ajuste a largura do campo de busca */
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.search-results div {
  padding: 0.5rem;
  cursor: pointer;
}

.search-results div:hover {
  background: #383232;
}

.login-button, .register-button {
  background: #ff6b00;
  padding: 0.5rem 1rem;    /* espaço interno */
}

.result-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
}

.auth-container {
  position: relative;
  display: flex;
  align-items: center;
}

.auth-link {
  color: white;
  text-decoration: none;   /*tira o sublinhado do link*/
  margin-left: 1rem;
}

.login-button:hover, .register-button:hover {
  background-color: #e96507;      /*altera a cor ao passar o mouse*/
}

/* Estilos responsivos para mobile */
@media (max-width: 768px) {
  .header {
    flex-direction: column; /* Alinha os itens em coluna para dispositivos menores */
    align-items: center; /* Centraliza os itens */
    padding: 1rem; /* Ajusta o padding para dispositivos menores */
  }

  .logo {
    height: 70px; /* Ajusta a largura da logo para dispositivos menores */
  }

  .search-container {
    width: 100%; /* Ajusta a largura do contêiner de busca para 100% */
    margin-bottom: 1rem; /* Espaçamento inferior */
  }

  .search-input {
    width: 80%; /* Ajusta a largura do campo de busca para 100% */
  }

  .auth-container {
    flex-direction: initial; /* Alinha os botões de login e cadastro em coluna */
    margin-top: 1rem; /* Espaçamento superior */
  }

  .auth-link {
    margin-left: 1rem; /* Remove a margem esquerda dos links */
    margin-top: 0.5rem; /* Espaçamento superior */
  }
}
</style>