<script setup>
import SideMenu from '../navigation/SideMenu.vue';
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
  background-color: #108f9c;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-container {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
}

.search-button {
  background: #ff6b00;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
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
