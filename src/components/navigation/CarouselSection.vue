<script setup>
import { ref, onMounted } from 'vue'

const currentSlide = ref(0)
const slides = ref([
  {
    image: 'harry.jpg',
    title: 'NOME DA NOTÍCIA',
    subtitle: 'Subtítulo/ resumo notícia'
  },
  // Adicione mais slidess
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

onMounted(() => {
  setInterval(nextSlide, 5000)
})
</script>

<template>
  <div class="carousel">
    <button class="carousel-button prev" @click="prevSlide">❮</button>
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
  height: 400px;
  background: #333;
  margin: 2rem 0;
}

.carousel-button {
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

.carousel-content {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: white;
}

.carousel-dots {
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