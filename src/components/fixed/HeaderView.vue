<script setup>
import SideMenu from './SideMenu.vue';
</script>

<template>
  <header class="header">
    <SideMenu />
    <div class="logo-container">
      <img class="logo" src="../../assets/logo.png" alt="Logo" />
    </div>
    <div class="search-container">
      <input type="text" placeholder="Buscar..." class="search-input" />
      <button class="search-button">🔍</button>
    </div>
    <div class="auth-container">
      <!-- Link para a página de login -->
      <router-link to="/login" class="auth-link">Login</router-link>
      <!-- Link para a página de cadastro -->
      <router-link to="/" class="auth-link">Cadastre-se</router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  background-color: #108d9b;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.logo-container {
  position: relative;
  display: flex;
  left: 10px;
  align-items: center;
}

.logo {
  height: 100px; /* Ajuste o tamanho da logo conforme necessário */
}

.search-container {
  position: relative;
  display: flex;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  width: 250px; /* Ajuste a largura do campo de busca */
}

.search-button {
  background: #ff6b00;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.auth-container {
  position: relative;
  display: flex;
  align-items: center;
}

.auth-link {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
}

.auth-link:hover {
  color: #ff6b00;
}
</style>
