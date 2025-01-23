<script setup>
import FooterView from '@/components/fixed/FooterView.vue';
import HeaderView from '../components/fixed/HeaderView.vue'
import CarouselSection from '../components/navigation/home/CarouselSection.vue'
import MovieSection from '../components/navigation/home/MovieSection.vue'
import SeriesSection from '../components/navigation/home/SeriesSection.vue'
</script>

<template>
    <HeaderView />
    <main>
      <CarouselSection />
      <MovieSection />
      <SeriesSection />
    </main>
    <FooterView/>
</template>