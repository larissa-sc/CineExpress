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
    ? 'https:' + props.imageSrc // Se imageSrc estiver definida e não for uma string vazia, usa essa URL
    : require('../../../assets/images/backgroundLogin.jpg'); // Caso contrário, usa uma imagem padrão
  return url.replace('t_thumb', 't_cover_big'); // Substitui a parte 't_thumb' da URL por 't_cover_big'
});

// Função para renderizar estrelas com base na classificação
const renderStars = (rating) => {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating)); // Repete o símbolo de estrela cheia e vazia
};
</script>

<template>
  <div class="component-card">
    <!-- Exibe a imagem de capa ou a imagem padrão gerada pela computed property -->
    <img :src="fullImageUrl" :alt="Capa">
    <!-- Exibe o título -->
    <h3>{{ title }}</h3>
  </div>
  <div class="rating">
    <!-- Exibe a classificação usando estrelas -->
    {{ renderStars(rating) }}
  </div>
</template>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /*Layout de grade responsiva */
  gap: 1rem; /*Espaçamento entre os itens da grade */
}

.component-card {
  background: #333; /*Cor de fundo da carta */
  border-radius: 8px;   /*Borda arredondada */
  overflow: hidden;   /*Esconde overflow */
  transition: transform 0.2s; /*Transição suave ao aplicar transformações */
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
  margin-top: 0.5rem;  /*Margem superior*/
  font-size: 1.2rem;  /*Tamanho da fonte*/
}
</style>