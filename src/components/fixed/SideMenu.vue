<script setup>
import { ref } from 'vue' // Importa a função 'ref' do Vue para criar variáveis reativas
import MenuButton from '../navigation/menu/MenuButton.vue' // Importa o componente MenuButton
import MenuTabs from '../navigation/menu/MenuTabs.vue' // Importa o componente MenuTabs

// Declara uma variável reativa 'isMenuOpen' que armazena o estado do menu (aberto ou fechado), iniciando como fechado
const isMenuOpen = ref(false)

// Define uma função 'toggleMenu' que alterna o estado do menu entre aberto e fechado
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value // Se isMenuOpen for true, torna-se false, e vice-versa
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
  position: fixed;  /* Define a posição fixa do contêiner */
  top: 0;           /* Alinha o contêiner no topo da página */
  left: 0;          /* Alinha o contêiner à esquerda da página */
  z-index: 1000;    /* Define a ordem do contêiner em relação aos outros elementos */
}
</style>