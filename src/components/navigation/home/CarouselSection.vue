<script setup>
import { ref, onMounted } from 'vue'

const currentSlide = ref(0)  /*armazena o índice do slide atual*/
const slides = ref([   /*variável reativa que armazena um array de objetos*/
  {
    image: 'harry.jpg',
    title: 'NOME DA NOTÍCIA',
    subtitle: 'Subtítulo/ resumo notícia'
  },
  {
    image: 'xxx',
    title: 'NOME DA NOTÍCIA',
    subtitle: 'subtítulo'
  },
  // Adicione mais slides
])

const nextSlide = () => {    /*incrementa o índice do slide atual. Se chegar ao último slide, volta ao primeiro*/
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {    /*retorna ao anterior*/
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

onMounted(() => {      /*Utiliza onMounted para definir um intervalo que chama o próximo slide a cada 5 segundos (5000 milissegundos)*/
  setInterval(nextSlide, 5000)
})
</script>

<template>
  <div class="carousel">
    <button class="carousel-button prev" @click="prevSlide">❮</button>  <!--click ativa o clique do botão e a ação que deve fazer-->
    <div class="carousel-content">
      <h2>{{ slides[currentSlide].title }}</h2>
      <p>{{ slides[currentSlide].subtitle }}</p>
    </div>
    <button class="carousel-button next" @click="nextSlide">❯</button>
    <div class="carousel-dots">
      <span 
        v-for="(_, index) in slides" 
        :key="index"
        :class="['dot', { active: currentSlide === index }]"
        @click="currentSlide = index"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  height: 400px;   /*altura da div*/
  background: #333;
  margin: 2rem 2rem;  /*define a distância das bordas do carrossel em relação a página*/
}

.carousel-button {    /*Estiliza os botões de navegação (anterior e próximo), posicionando-os no centro verticalmente*/
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
}

.prev { left: 0; }
.next { right: 0; }

.carousel-content {    /*Posiciona as informações do slide na parte inferior esquerda*/
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: white;
}

.carousel-dots {     /*Centraliza os pontos de navegação horizontalmente na parte inferior*/
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.dot.active {
  background: white;
}
</style>