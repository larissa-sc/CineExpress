<script setup>
import FooterView from '@/components/fixed/FooterView.vue';
import HeaderView from '../components/fixed/HeaderView.vue';

//const movies = [
//];
</script>

<template>
  <HeaderView />
    <main>
      <div class="filters">
        <select>
          <option value="">Filtrar</option>
          <option value="a-z">A/Z</option>
          <option value="z-a">Z/A</option>
        </select>
      </div>
  </main>
  <FooterView/>
</template>

<style>
.filters {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.filters select {
  padding: 0.5rem;
  border-radius: 4px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar input {
    width: 100%;
  }

  .movies-grid {  
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>