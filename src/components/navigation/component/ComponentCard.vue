<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true,
    default: ''
  },
  rating: {
    type: Number,
    required: true
  }
});

const fullImageUrl = computed(() => {  
  let url = props.imageSrc && props.imageSrc.trim() !== '' ? 'https:' + props.imageSrc : require('../../../assets/images/backgroundLogin.jpg');
  return url.replace('t_thumb', 't_cover_big');
});

const renderStars = (rating) => {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
};
</script>

<template>
  <div class="component-card">
    <img :src="fullImageUrl" :alt="Capa">
    <h3>{{ title }}</h3>
  </div>
  <div class="rating">
    {{ renderStars(rating) }}
  </div>
</template>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.component-card {
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
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
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
</style>