<script setup>
import HeaderView from '@/components/fixed/HeaderView.vue';

import { ref } from 'vue';
import { auth } from '@/services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import router from '@/routes';
import FooterView from '@/components/fixed/FooterView.vue';

const newUser = ref({
  email: '',
  password: '',
  repeatPassword: ''
});

const isEmailValid = (email) => { 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  return emailRegex.test(email); 
};

const isPasswordValid = (password) => { 
  return password.length >= 6;   
};

const registerUser = async () => {
  if (!isEmailValid(newUser.value.email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
  }

  if (!isPasswordValid(newUser.value.password)) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
      }

  if (newUser.value.password !== newUser.value.repeatPassword) {
    alert('As senhas não são iguais!');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      newUser.value.email,
      newUser.value.password
    );

    const user = userCredential.user;
    console.log('Usuário registrado:', user.email);

    alert('Conta criada com sucesso!');

    router.push('/user');


    newUser.value.email = '';
    newUser.value.password = '';
    newUser.value.repeatPassword = '';
    
  } catch (error) {
    console.error('Erro ao registrar:', error.message);
    alert(error.message);
  }

  return
};
</script>

<template>
  <HeaderView />
  <div class="login-page">
    <div class="forms-login">
    <h1>CADASTRE-SE</h1>
    <div id="line"/>
    <form @submit.prevent="registerUser">

      <label for="email">E-mail:*</label>
      <input 
            id="email" 
            type="email" 
            v-model="newUser.email" 
            placeholder="Digite seu e-mail" />

      <label for="password">Senha:*</label>
      <input
        id="password"
        type="password"
        v-model="newUser.password"
        placeholder="Digite sua senha"
      />

      <label for="name">Repita sua senha:*</label>
      <input 
            id="passwordRepeat" 
            type="password" 
            v-model="newUser.repeatPassword" 
            placeholder="Digite seu nome completo" />

      <button type="submit">Enviar</button>
      <div id="login"><router-link to="/login" class="login"> Já tem cadastro? Clique aqui!</router-link></div>
    </form>
  </div>
  </div>
  <FooterView/>
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