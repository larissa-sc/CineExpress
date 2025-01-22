<script setup>
import { ref } from 'vue'
import MenuButton from '../navigation/MenuButton.vue'
import MenuTabs from '../navigation/MenuTabs.vue'

const isMenuOpen = ref(false)    /*Declara uma variável reativa isMenuOpen que armazena o estado do menu (aberto ou fechado), iniciando como fechado*/

const toggleMenu = () => {      /*Define uma função toggleMenu que alterna o estado do menu entre aberto e fechado*/
  isMenuOpen.value = !isMenuOpen.value     /*se for true, ele se torna false, e vice-versa*/
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
  position: fixed;   /*posição fixa*/
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>