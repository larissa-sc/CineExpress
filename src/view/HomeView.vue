<script setup>
import HeaderView from '../components/fixed/HeaderView.vue'
import CarouselSection from '../components/navigation/CarouselSection.vue'
import MovieSection from '../components/navigation/MovieSection.vue'
import SeriesSection from '../components/navigation/SeriesSection.vue'
import SideMenu from '../components/navigation/SideMenu.vue'
</script>

<template>

  <div class="app-container">
    <SideMenu/>
    <HeaderView />
    <main>
      <CarouselSection />
      <MovieSection />
      <SeriesSection />
    </main>
  </div>
</template>

<style>



  .app-container {
  background-color: #1a1a1a;
  min-height: 100vh;
  color: white;
}
</style>