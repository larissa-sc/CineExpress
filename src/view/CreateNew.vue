<script setup>
import { ref } from 'vue';
import { getCurrentUser } from '@/services/authService';
import { db, storage } from '@/services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { useRouter } from 'vue-router';
import HeaderView from '@/components/fixed/HeaderView.vue';
import FooterView from '@/components/fixed/FooterView.vue';

const router = useRouter();

const newsData = ref({
  title: '',
  content: '',
  image: null,
  imageUrl: '',
  createdAt: null
});

const imageFile = ref(null);

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0];
};

const saveNews = async () => {
  const user = getCurrentUser();
  if (user) {
    try {
      if (imageFile.value) {
        const storageReference = storageRef(storage, `news_images/${imageFile.value.name}`);
        const uploadTask = uploadBytesResumable(storageReference, imageFile.value);
        
        uploadTask.on('state_changed', null, (error) => {
          console.error('Erro ao fazer upload da imagem:', error);
        }, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          newsData.value.imageUrl = downloadURL;
          newsData.value.createdAt = serverTimestamp();
          await addDoc(collection(db, 'news'), newsData.value);
          alert('Notícia salva com sucesso!');
          router.push('/user');
        });
      } else {
        newsData.value.createdAt = serverTimestamp();
        await addDoc(collection(db, 'news'), newsData.value);
        alert('Notícia salva com sucesso!');
        router.push('/user');
      }
    } catch (error) {
      console.error('Erro ao salvar notícia:', error);
    }
  } else {
    router.push('/login');
  }
};
</script>

<template>
  <HeaderView />
  <div class="create-news-page">
    <h1>Criar Notícia</h1>
    <form @submit.prevent="saveNews">
      <label for="title">Título:</label>
      <input 
        id="title" 
        type="text" 
        v-model="newsData.title" 
        placeholder="Digite o título da notícia" 
        required
      />

      <label for="image">Imagem:</label>
      <input 
        id="image" 
        type="file" 
        @change="handleImageUpload"
        accept="image/*"
      />

      <label for="content">Notícia:</label>
      <textarea 
        id="content" 
        v-model="newsData.content" 
        placeholder="Digite o conteúdo da notícia" 
        required
      ></textarea>

      <button type="submit">Salvar Notícia</button>
    </form>
  </div>
  <FooterView />
</template>

<style scoped>
.create-news-page {
  margin: 40px;
  background: #202020;
  padding: 20px;
  border-radius: 8px;
  color: white;
}

label {
  display: block;
  margin-top: 20px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background: #303030;
  color: white;
  border: none;
  border-radius: 5px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #108f9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0a6671;
}
</style>