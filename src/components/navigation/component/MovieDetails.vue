<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderView from '@/components/fixed/HeaderView.vue';
import FooterView from '@/components/fixed/FooterView.vue';
import DAOService from '@/services/DAOService';
import { db } from '@/services/firebase';
import { collection, doc, setDoc, getDocs, query, where, startAfter, limit } from 'firebase/firestore';
import CommentCard from './CommentCard.vue';
import ComponentComment from './ComponentComment.vue';
import { getCurrentUser } from '@/services/authService';  // Importa a função getCurrentUser

const moviesService = new DAOService('movies');
const router = useRouter();
const route = useRoute();

const movie = ref(null);
const streams = ref([
  { name: 'Netflix', url: 'https://www.netflix.com/br/', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' },
  { name: 'Prime Video', url: 'https://www.primevideo.com', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Prime_Video_logo_%282024%29.svg/1920px-Prime_Video_logo_%282024%29.svg.png' },
  { name: 'Disney+', url: 'https://www.disneyplus.com', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Disney%2B_2024.svg/1024px-Disney%2B_2024.svg.png' }
]);
const showCommentModal = ref(false);
const reviews = ref([]);
const movieId = ref(route.params.id);

const getMovie = async (id) => {
  try {
    movie.value = await moviesService.get(id);
  } catch (error) {
    console.error('Erro ao buscar dados do filme:', error);
  }
};

const fullImageUrl = computed(() => {  
  let url = movie.value.coverUrl && movie.value.coverUrl.trim() !== '' 
    ? 'https://image.tmdb.org/t/p/w500' + movie.value.coverUrl 
    : require('../../../assets/images/componenteSemPoster.png');
  return url;
});

const renderStars = (rating) => {
  const maxStars = 5;
  const filledStars = Math.round((rating / 2)); 
  const emptyStars = maxStars - filledStars;
  return '★'.repeat(filledStars) + '☆'.repeat(emptyStars); 
};

const saveMovie = async () => {
  const user = getCurrentUser();
  if (user) {
    try {
      const userId = user.uid;

      // Verifique e remova qualquer campo indefinido do objeto movie.value
      const movieData = {};
      Object.keys(movie.value).forEach(key => {
        if (movie.value[key] !== undefined) {
          movieData[key] = movie.value[key];
        }
      });

      await setDoc(doc(collection(db, 'users', userId, 'savedMovies'), movie.value.id), movieData);
      console.log('Filme salvo!');
    } catch (error) {
      console.error('Erro ao salvar o filme:', error);
    }
  } else {
    router.push('/login');
  }
};

const loadReviews = async () => {
  try {
    const q = query(collection(db, 'reviews'), where('itemId', '==', movieId.value));
    const reviewsSnapshot = await getDocs(q);
    reviews.value = reviewsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Erro ao carregar avaliações:', error);
  }
};

const loadMoreReviews = async () => {
  try {
    const lastReview = reviews.value[reviews.value.length - 1];
    const q = query(
      collection(db, 'reviews'),
      where('itemId', '==', movieId.value),
      startAfter(lastReview.timestamp),
      limit(10)
    );
    const reviewsSnapshot = await getDocs(q);
    const newReviews = reviewsSnapshot.docs.map(doc => doc.data());
    reviews.value = [...reviews.value, ...newReviews];
  } catch (error) {
    console.error('Erro ao carregar mais avaliações:', error);
  }
};

onMounted(async () => {
  await getMovie(movieId.value);
  await loadReviews();
});
</script>

<template>
  <HeaderView />
  <main v-if="movie">
    <div class="movie-details-container">
      <div class="movie-poster">
        <img :src="fullImageUrl" alt="Poster">
      </div>
      <div class="movie-details">
        <h1>{{ movie.title }}</h1>
        <div class="rating">
          Avaliação: <span>{{ renderStars(movie.vote) }}</span>
        </div>
        <p>{{ movie.summary }}</p>
        <h3>Disponível em:</h3>
        <ul class="streams">
          <li v-for="stream in streams" :key="stream.name" class="stream">
            <a :href="stream.url" target="_blank">
              <img :src="stream.image" alt="Ícone de {{ stream.name }}" class="stream-icon">
            </a>
          </li>
        </ul>
        <div class="additional-details">
          <h3>Detalhes:</h3>
          <ul class="detail">
            <li>Ano: <br>{{ movie.datePublic || 'Sem registros' }}</li>
            <li>Duração: <br> {{ movie.runtime || 'Sem registros' }}</li>
            <li>Gênero: <br> {{ movie.genres || 'Sem registros'}}</li>
          </ul>
        </div>
        <div class="action-buttons">  <!-- Div para agrupar os botões -->
          <button @click="saveMovie">
            <i class="fas fa-heart"></i> 
            Salvar filme
          </button>
          <button class="review-button" @click="showCommentModal = true">Deixar avaliação</button>
        </div>
        <ComponentComment v-if="showCommentModal" @close="showCommentModal = false" :movie-id="movieId"/>
      </div>
    </div>
    <div class="about-section">
      <div class="header">
        <h1>Avaliações de Usuários</h1>
      </div>
      <div>
        <CommentCard 
          v-for="(review, index) in reviews" 
          :key="index"
          :stars="review.stars"
          :title="review.title"
          :comment="review.comment"
          :userPhotoURL="review.userPhotoURL"
          :userName="review.userName"
          :timestamp="review.timestamp"
        />
        <button @click="loadMoreReviews" class="load-more-button">Carregar mais comentários</button>
      </div>
    </div>
  </main>
  <FooterView />
</template>

<style>
.movie-details-container, .about-section {
  display: flex;
  align-items: flex-start;
  margin: 40px;
  background: #202020;
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.movie-poster img {
  max-width: 80%;
  height: auto;
  border-radius: 10px;
  margin-right: 20px;
}

.movie-details {
  max-width: 600px;
  display: flex;
  flex-direction: column;
}

.movie-details h1 {
  margin-bottom: 10px;
  font-size: 40px;
}

.rating {
  margin-top: 10px;
  font-size: 20px;
}

.rating span {
  color: #f1c40f;
}

.movie-details p {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: justify;
}

h3{
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0;
  text-align: left;
}

.streams, .detail{
  display: flex;
  align-content: inline;
  list-style-type: none; /* Remover os pontos da lista */
}

.stream {
  margin-top: 20px;
  margin-right: 30px; /* Ajustado para melhor espaçamento */
}

.stream-icon {
  width: 100px; /* Ajusta o tamanho conforme necessário */
  height: auto;
}

.detail li{
  margin-right: 100px;
  margin-bottom: 20px;
}

.action-buttons {  /* Novo bloco de estilo */
  display: flex;
  justify-content: flex-start;  /* Alinha os botões ao início da linha flex */
  gap: 10px;  /* Espaço entre os botões */
  margin-top: 20px;  /* Espaço superior para os botões */
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.load-more-button {  /* Bloco de estilo específico específico para o botão de carregar mais comentários */
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>