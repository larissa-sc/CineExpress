<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderView from '@/components/fixed/HeaderView.vue';
import FooterView from '@/components/fixed/FooterView.vue';
import { getCurrentUser } from '@/services/authService';
import { db } from '@/services/firebase';
import { doc, getDoc, setDoc, collection, getDocs, query } from 'firebase/firestore';

// Referências reativas para armazenar dados do usuário
const userProfile = ref({
  name: '',
  bio: '',
  profileImage: '',
  savedMovies: [],
  savedSeries: []
});
const filter = ref('movies');
const defaultProfileImage = 'src/assets/images/usuario-de-perfil.png'; // URL da imagem padrão
const router = useRouter();

const getUserProfile = async () => {
  const user = getCurrentUser();
  if (user) {
    try {
      const userId = user.uid;
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        userProfile.value = userDoc.data();
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  } else {
    router.push('/login');
  }
};

const saveUserProfile = async () => {
  const user = getCurrentUser();
  if (user) {
    try {
      const userId = user.uid;
      await setDoc(doc(db, 'users', userId), userProfile.value);
      alert('Perfil salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil do usuário:', error);
    }
  }
};

const getSavedItems = async () => {
  const user = getCurrentUser();
  if (user) {
    try {
      const userId = user.uid;
      const savedMoviesQuery = query(collection(db, 'users', userId, 'savedMovies'));
      const savedSeriesQuery = query(collection(db, 'users', userId, 'savedSeries'));
      const savedMoviesSnapshot = await getDocs(savedMoviesQuery);
      const savedSeriesSnapshot = await getDocs(savedSeriesQuery);
      userProfile.value.savedMovies = savedMoviesSnapshot.docs.map(doc => doc.data());
      userProfile.value.savedSeries = savedSeriesSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Erro ao buscar itens salvos:', error);
    }
  }
};

const createNews = () => {
  router.push('/create-news');
};

onMounted(async () => {
  await getUserProfile();
  await getSavedItems();
});

const renderStars = (rating) => {
  const maxStars = 5;
  const filledStars = Math.round((rating / 2)); // Ajuste o divisor conforme necessário
  const emptyStars = maxStars - filledStars;
  return '★'.repeat(filledStars) + '☆'.repeat(emptyStars); // Repete o símbolo de estrela cheia e vazia
};

const fullImageUrl = (imageSrc) => {
  let url = imageSrc && imageSrc.trim() !== '' 
    ? 'https://image.tmdb.org/t/p/w500' + imageSrc 
    : require('@/assets/images/componenteSemPoster.png'); 
  return url;
};

const truncatedTitle = (title) => {
  const maxLength = 30; // Define o limite de caracteres
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};
</script>

<template>
  <HeaderView />
  <main>
    <div class="profile-section">
      <h1>Meu perfil</h1>
      <div class="profile-info">
        <img :src="userProfile.profileImage || defaultProfileImage" alt="Imagem de perfil" class="profile-image">
        <div class="profile-details">
          <label for="name">Nome:</label>
          <input id="name" v-model="userProfile.name" placeholder="Digite seu nome">
          <label for="bio">Bio:</label>
          <textarea id="bio" v-model="userProfile.bio" placeholder="Digite uma bio"></textarea>
          <button @click="saveUserProfile">Salvar Perfil</button>
        </div>
      </div>
    </div>
    <div class="favorites-section">
      <h1>Meus favoritos</h1>
      <div class="filters">
        <button @click="filter = 'movies'">Filmes</button>
        <button @click="filter = 'series'">Séries</button>
      </div>
      <div v-if="filter === 'movies'" class="favorite-items">
        <div v-for="movie in userProfile.savedMovies" :key="movie.id" class="component-card">
          <img :src="fullImageUrl(movie.coverUrl)" alt="Capa do filme">
          <h3>{{ truncatedTitle(movie.title) }}</h3>
          <div class="rating">
            {{ renderStars(movie.vote) }}
          </div>
        </div>
      </div>
      <div v-if="filter === 'series'" class="favorite-items">
        <div v-for="serie in userProfile.savedSeries" :key="serie.id" class="component-card">
          <img :src="fullImageUrl(serie.coverUrl)" alt="Capa da série">
          <h3>{{ truncatedTitle(serie.name) }}</h3>
          <div class="rating">
            {{ renderStars(serie.vote) }}
          </div>
        </div>
      </div>
    </div>
    <div class="news-section">
      <button @click="createNews">Criar Notícia</button>
    </div>
  </main>
  <FooterView />
</template>

<style scoped>
.profile-section, .favorites-section, .news-section {
  margin: 40px;
  background: #202020;
  padding: 20px;
  border-radius: 8px;
}

.profile-info {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 25%;
  height: 25%;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  width: 60%;
}

.profile-details label {
  margin-top: 10px;
}

.profile-details input, .profile-details textarea {
  padding: 10px;
  margin-top: 5px;
  background: #303030;
  color: white;
  border: none;
  border-radius: 5px;
}

.profile-details button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #108f9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.profile-details button:hover {
  background-color: #0a6671;
}

.filters {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.filters button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.filters button:hover {
  background-color: #0056b3;
}

.favorite-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.component-card {
  background: #333333; 
  border-radius: 8px;   
  overflow: hidden;   
  transition: transform 0.2s; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  cursor: pointer;
  width: 200px;
}

.component-card:hover {
  transform: scale(1.05); 
}

.component-card img {
  width: 100%;  
  height: auto; 
}

.component-card h3 {
  padding: 0.5rem;    
  text-align: center; 
}

.rating {
  color: #f1c40f; 
  margin-top: auto;  
  font-size: 1.8rem;  
}

.news-section {
  text-align: center;
  margin-top: 40px;
}

.news-section button {
  padding: 10px 20px;
  background-color: #108f9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.news-section button:hover {
  background-color: #0a6671;
}
</style>