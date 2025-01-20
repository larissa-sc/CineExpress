<script setup>
import HeaderView from '../components/fixed/HeaderView.vue'
import CarouselSection from '../components/navigation/home/CarouselSection.vue'
import MovieSection from '../components/navigation/home/MovieSection.vue'
import SeriesSection from '../components/navigation/home/SeriesSection.vue'
</script>

<template>
  <div class="app-container">
    <HeaderView />
    <main>
      <CarouselSection />
      <MovieSection />
      <SeriesSection />
    </main>
  </div>
</template>