<script setup>
const series = [
  {
    title: 'The Witcher',
    image: '/path/to/witcher.jpg'
  },
  {
    title: 'Game of Thrones',
    image: '/path/to/got.jpg'
  },
  // Add more series
]
</script>

<template>
  <section class="series-section">
    <h2 class="section-title">SÉRIES EM DESTAQUE 2024</h2>
    <div class="series-grid">
      <div v-for="serie in series" :key="serie.title" class="series-card">
        <img :src="serie.image" :alt="serie.title">
        <h3>{{ serie.title }}</h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
.series-section {
  padding: 2rem;
}

.section-title {
  color: #ff6b00;
  margin-bottom: 1rem;
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.series-card {
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.series-card:hover {
  transform: scale(1.05);
}

.series-card img {
  width: 100%;
  height: auto;
}

.series-card h3 {
  padding: 0.5rem;
  text-align: center;
}
</style>