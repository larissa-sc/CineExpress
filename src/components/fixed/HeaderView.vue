<script setup>
// importar o menu suspenso para o cabeçalho
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
      <router-link to="/login" class="auth-link"><button class="login-button">Login</button></router-link>
      <!-- Link para a página de cadastro -->
      <router-link to="/register" class="auth-link"><button class="register-button">Cadastre-se</button></router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;       /*faz com que se adapte à página*/
  background-color: #108d9b;  /* cor de fundo */
  padding: 1rem 2rem;    /*espaço interno*/
  display: flex;       /*itens internos de forma flexível*/
  justify-content: space-between;   /*alinha de forma linear os itens*/
  align-items: flex-end;   /*itens alinhados na borda inferior*/
}

.logo-container {
  position: relative;
  display: flex;
  left: 10px;
  align-items: center;
}

.logo {
  height: 100px;     /*tamanho da logo definido*/
}

.search-container {
  position: relative;
  display: flex;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem;
  border: none;
  width: 250px;    /* Ajuste a largura do campo de busca */
}

.search-button, .login-button, .register-button {
  background: #ff6b00;
  padding: 0.5rem 1rem;    /* espaço interno */
}

.auth-container {
  position: relative;
  display: flex;
  align-items: center;
}

.auth-link {
  color: white;
  text-decoration: none;   /*tira o sublinhado do link*/
  margin-left: 1rem;
}

.login-button:hover, .register-button:hover {
  background-color: #e96507;      /*altera a cor ao passar o mouse*/
}
</style>