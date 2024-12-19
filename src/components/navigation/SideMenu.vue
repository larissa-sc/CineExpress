<script setup>
import { ref } from 'vue'
import MenuButton from './MenuButton.vue'
import MenuTabs from './MenuTabs.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="side-menu-container">
    <MenuButton 
      :isOpen="isMenuOpen" 
      @toggle="toggleMenu" 
    />
    <MenuTabs 
      :isOpen="isMenuOpen" 
      @close="isMenuOpen = false" 
    />
  </div>
</template>

<style scoped>
.side-menu-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>