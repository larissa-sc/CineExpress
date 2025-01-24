<script setup>
import HeaderView from '@/components/fixed/HeaderView.vue';

import { ref } from 'vue';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const loginData = ref({
  email: '',
  password: ''
});

const loginUser = async () => {
  try {const userCredential = await signInWithEmailAndPassword(
      auth,
      loginData.value.email,
      loginData.value.password
    );

    const user = userCredential.user;
    console.log('Usuário logado:', user);
    alert('Login realizado com sucesso!');

    loginData.value.email = ''
    loginData.value.password = ''
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    alert('Email ou senha incorretos!');
  }
}
</script>

<template>
  <HeaderView />
  <div class="login-page">
    <div class="forms-login">
    <h1>FAÇA SEU LOGIN</h1>
    <div id="line"/>
    <form @submit.prevent="submitLogin">
      <label for="email">E-mail:*</label>
      <input 
            id="email" 
            type="email" 
            v-model="loginData.email" 
            placeholder="Digite seu e-mail" />

      <label for="password">Senha:*</label>
      <input
        id="password"
        type="password"
        v-model="loginData.password"
        placeholder="Digite sua senha"
      />

      <button  @click="loginUser" class="loginButton" type="submit">Entrar</button>
      <div id="register"><router-link to="/register" class="register"> Não é Cadastrado? Clique aqui!</router-link></div>
    </form>
  </div>
  </div>
</template>

<style scoped>

.login-page {
  background-image: url(../assets/images/backgroundLogin.jpg);
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
}

.loginButton {
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #108f9c;
  display: flex;
  justify-self: center;
}

.loginButton:hover {
  background-color: #0a6671;
}

#register{
  padding-top: 40px;
  justify-self: center;
}

.register{
  cursor: pointer;
  color: white;
  text-decoration-color: none;
}

.register:hover{
  color:#ff6b00
}
</style>
