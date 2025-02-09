<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    stars: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
        default: ''
    },
    userPhotoURL: {
        type: String,
        required: true,
        default: ''
    },
    userName: {
        type: String,
        required: true
    },
    timestamp: {
        type: Object, // Corrige o tipo para ser compatível com objetos de data
        required: true
    }
});

const maxLength = 100; // Limite de caracteres

const truncatedText = computed(() => {
    return props.comment && props.comment.length > maxLength
        ? props.comment.substring(0, maxLength) + '...'
        : props.comment;
});

const renderStars = (stars) => {
  const maxStars = 5;
  const filledStars = stars
  const emptyStars = maxStars - filledStars;
  return '★'.repeat(filledStars) + '☆'.repeat(emptyStars); 
};

const data = computed(() => {
    return props.timestamp.toDate().toLocaleString('pt-BR');
});
</script>

<template>
  <div class="review-container">
    <div class="rating">
      <span> {{ renderStars(stars) }} </span>
    </div>
    <h2 class="review-title">{{ props.title }}</h2>
    <p class="review-text">{{ truncatedText }}</p>
    <div class="author-info">
      <img :src="props.userPhotoURL" alt="Author Image" class="author-image">
      <span class="author-name">{{ props.userName }}</span>
      <span class="author-date">{{ data }}</span>
    </div>
  </div>
</template>

<style scoped>
.review-container {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.rating {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.star {
  font-size: 24px;
}

.review-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.review-text {
  font-size: 1rem;
  line-height: 1.5;
}

.author-info {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.author-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-name {
  font-weight: bold;
}

.author-date {
  color: #777;
  margin-left: 10px;
}
</style>