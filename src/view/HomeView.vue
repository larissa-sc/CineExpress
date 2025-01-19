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

<style>
* { margin: 0; padding: 0; }
  .app-container {
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    color: white;
}
</style>