<template>
  <HeaderView />
  <div class="login-page">
    <h1>Página de Login</h1>
    <form @submit.prevent="submitLogin">
      <label for="email">E-mail:</label>
      <input id="email" type="email" v-model="email" placeholder="Digite seu e-mail" />

      <label for="password">Senha:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Digite sua senha"
      />

      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup>
import HeaderView from '@/components/fixed/HeaderView.vue';

import { ref } from 'vue';

const email = ref('');
const password = ref('');

function submitLogin() {
  console.log('E-mail:', email.value);
  console.log('Senha:', password.value);
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

label {
  margin-top: 15px;
}

input {
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #108f9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0a6671;
}
</style>
