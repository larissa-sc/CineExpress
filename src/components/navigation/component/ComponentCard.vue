<script setup>
import { defineProps, computed } from 'vue';

// Definindo as propriedades (props) que o componente espera receber
const props = defineProps({
  title: { // Propriedade title, do tipo String, obrigatória
    type: String,
    required: true
  },
  imageSrc: { // Propriedade imageSrc, do tipo String, obrigatória, com valor padrão
    type: String,
    required: true,
    default: ''
  },
  rating: { // Propriedade rating, do tipo Number, obrigatória
    type: Number,
    required: true
  }
});

// Computed property para gerar a URL completa da imagem
const fullImageUrl = computed(() => {  
  let url = props.imageSrc && props.imageSrc.trim() !== '' 
    ? 'https://image.tmdb.org/t/p/w500' + props.imageSrc // Se imageSrc estiver definida e não for uma string vazia, usa essa URL
    : require('../../../assets/images/componenteSemPoster.png'); // Caso contrário, usa uma imagem padrão
  return url;
});

const truncatedTitle = computed(() => {
  const maxLength = 30; // Define o limite de caracteres
  return props.title.length > maxLength ? props.title.substring(0, maxLength) + '...' : props.title;
});

// Função para renderizar estrelas com base na classificação
const renderStars = (rating) => {
  const maxStars = 5;
  const filledStars = Math.round((rating / 2)); // Ajuste o divisor conforme necessário
  const emptyStars = maxStars - filledStars;
  return '★'.repeat(filledStars) + '☆'.repeat(emptyStars); // Repete o símbolo de estrela cheia e vazia
};
</script>

<template>
  <div class="component-card">
    <!-- Exibe a imagem de capa ou a imagem padrão gerada pela computed property -->
    <img :src="fullImageUrl" :alt="Capa">
    <!-- Exibe o título -->
    <h3>{{ truncatedTitle }}</h3>
  <div class="rating">
    <!-- Exibe a classificação usando estrelas -->
    {{ renderStars(rating) }}
  </div>
</div>
</template>

<style scoped>
.component-card {
  background: #333333; /*Cor de fundo da carta */
  border-radius: 8px;   /*Borda arredondada */
  overflow: hidden;   /*Esconde overflow */
  transition: transform 0.2s; /*Transição suave ao aplicar transformações */
  display: flex; /* Flex layout para conteúdo interno */
  flex-direction: column; /* Alinha o conteúdo em coluna */
  align-items: center; /* Centraliza o conteúdo horizontalmente */
  cursor: pointer;
}

.component-card:hover {
  transform: scale(1.05); /*Escala a carta ao passar o mouse */
}

.component-card img {
  width: 100%;  /*Largura completa da imagem*/
  height: auto; /*Altura automática para manter a proporção */
}

.component-card h3 {
  padding: 0.5rem;    /*Espaçamento interno */
  text-align: center; /*Centraliza o texto */
}

.rating {
  color: #f1c40f; /* Cor das estrelas (dourado) */
  margin-top: auto;  /*Margem superior*/
  font-size: 1.8rem;  /*Tamanho da fonte*/
}
</style>