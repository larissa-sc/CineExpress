<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderView from '@/components/fixed/HeaderView.vue';
import FooterView from '@/components/fixed/FooterView.vue';
//import CommentSection from '../components/CommentSection.vue'; // Componente de comentários
import DAOService from '@/services/DAOService';
import { auth } from '@/services/firebase'; // Serviço de autenticação

const moviesService = new DAOService('movies');
const router = useRouter();

const movie = ref(null);
const streams = ref([]);
const isUserLoggedIn = ref(false);

const getMovie = async (id) => {
  try {
    movie.value = await moviesService.get(id);
    //streams.value = await getStreams(id); // Função para buscar os streams disponíveis
    isUserLoggedIn.value = auth.isLoggedIn(); // Verifica se o usuário está logado
  } catch (error) {
    console.error('Erro ao buscar dados do filme:', error);
  }
};

const fullImageUrl = computed(() => {  
    let url = movie.value.coverUrl && movie.value.coverUrl.trim() !== '' 
        ? 'https://image.tmdb.org/t/p/w500' + movie.value.coverUrl // Se imageSrc estiver definida e não for uma string vazia, usa essa URL
        : require('../../../assets/images/componenteSemPoster.png'); // Caso contrário, usa uma imagem padrão
    return url;
});

// Função simulada para obter streams disponíveis para um filme
//const getStreams = async (movieId) => {
  // Implemente a lógica para buscar os streams disponíveis para o filme
 // return ['Netflix', 'Amazon Prime', 'HBO Max'];
//};

onMounted(() => {
  const movieId = router.currentRoute.value.params.id;
  getMovie(movieId);
});

const saveMovie = () => {
  if (isUserLoggedIn.value) {
    // Lógica para salvar o filme
    console.log('Filme salvo!');
  } else {
    alert('Por favor, faça login para salvar o filme.');
    router.push('/login'); // Redireciona para a página de login se não estiver logado
  }
};
</script>

<template>
  <HeaderView />
  <main v-if="movie">
    <div class="movie-details">
      <h1>{{ movie.title }}</h1>
      <img :src="fullImageUrl" :alt="Poster">
      <p>{{ movie.summary }}</p>
      <div class="rating">
        Avaliação: <span>{{ movie.vote }} estrelas</span>
      </div>
      <button @click="saveMovie">Salvar</button>
    </div>
    <div class="streams">
      <h2>Disponível em:</h2>
      <ul>
        <li v-for="stream in streams" :key="stream">{{ stream }}</li>
      </ul>
    </div>
    <CommentSection :movieId="movie.id" />
  </main>
  <FooterView />
</template>

<style>
.movie-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.movie-details img {
  max-width: 100%;
  height: auto;
}

.rating {
  margin-top: 10px;
  font-size: 18px;
}

.streams {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
}

.streams ul {
  list-style: none;
  padding: 0;
}

.streams li {
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>