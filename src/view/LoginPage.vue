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

<template>
  <HeaderView />
  <div class="login-page">
    <div class="forms-login">
    <h1>Faça seu Login</h1>
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
  </div>
</template>

<style scoped>
.login-page {

  background-image: url(../assets/backgroundLogin.jpg);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forms-login{
  background-color: #1a1a1a;
  color: #108d9b;
  padding: 10%;      /* margem interna */
  margin: 10%;       /* margem externa */
  /*display: flex;
  flex-direction: column;
  align-items: center; */
}

h1{
  margin-bottom: 80px;
}

label {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
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
