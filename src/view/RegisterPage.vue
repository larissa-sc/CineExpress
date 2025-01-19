<script setup>
import HeaderView from '@/components/fixed/HeaderView.vue';

import { ref } from 'vue';

const name = ref('');
const phone = ref('');
const email = ref('');
const password = ref('');

function submitRegister() {
  console.log('Nome:', name.value);
  console.log('Telefone:', phone.value);
  console.log('E-mail:', email.value);
  console.log('Senha:', password.value);
}
</script>

<template>
  <HeaderView />
  <div class="login-page">
    <div class="forms-login">
    <h1>CADASTRE-SE</h1>
    <div id="line"/>
    <form @submit.prevent="submitRegister">
      <label for="name">Seu nome:*</label>
      <input 
            id="name" 
            type="name" 
            v-model="name" 
            placeholder="Digite seu nome completo" />

      <label for="phone">Telefone:*</label>
      <input
        id="phone"
        type="phone"
        v-model="phone"
        placeholder="Digite seu número"
      />
      <label for="email">E-mail:*</label>
      <input 
            id="email" 
            type="email" 
            v-model="email" 
            placeholder="Digite seu e-mail" />

      <label for="password">Senha:*</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Digite sua senha"
      />

      <button type="submit">Enviar</button>
      <div id="login"><router-link to="/login" class="login"> Já tem cadastro? Clique aqui!</router-link></div>
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
}

.forms-login{
  background-color: #1a1a1a;
  color: #108d9b;
  padding: 10%;      /* margem interna */
  margin: 10%;       /* margem externa */
  display: flex;
  flex-direction: column;

}

#line{
  color: #ff6b00;
  width: 300px;
  border: 1px solid;
  margin-bottom: 50px;
}

label {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #108f9c;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-self: center;
}

button:hover {
  background-color: #0a6671;
}

#login{
  padding-top: 40px;
  justify-self: center;
}

.login{
  cursor: pointer;
  color: white;
  text-decoration-color: none;
}

.login:hover{
  color:#ff6b00
}
</style>