<script setup>
// Importa o componente HeaderView
import HeaderView from '@/components/fixed/HeaderView.vue';

// Importa as funções ref do Vue e os serviços de autenticação do Firebase
import { ref } from 'vue';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import router from '@/routes';

// Cria uma referência reativa para armazenar os dados de login
const loginData = ref({
  email: '',
  password: ''
});

// Função assíncrona para logar o usuário
const loginUser = async () => {
  try {
    // Tenta logar o usuário com email e senha
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginData.value.email,
      loginData.value.password
    );

    // Usuário logado com sucesso
    const user = userCredential.user;
    console.log('Usuário logado:', user);
    alert('Login realizado com sucesso!');

    // Limpa os dados de login após o sucesso
    loginData.value.email = '';
    loginData.value.password = '';

    // Redireciona para a rota '/user'
    router.push('/user');
  } catch (error) {
    // Captura e exibe erros de login
    console.error('Erro ao fazer login:', error.message);
    alert('Email ou senha incorretos!');
  }
};
</script>

<template>
  <!-- Inclui o componente HeaderView -->
  <HeaderView />

  <div class="login-page">
    <div class="forms-login">
      <!-- Título da página de login -->
      <h1>FAÇA SEU LOGIN</h1>
      <div id="line"/>
      <form @submit.prevent="loginUser">
        <!-- Campo de entrada para o email -->
        <label for="email">E-mail:*</label>
        <input 
              id="email" 
              type="email" 
              v-model="loginData.email" 
              placeholder="Digite seu e-mail" />

        <!-- Campo de entrada para a senha -->
        <label for="password">Senha:*</label>
        <input
          id="password"
          type="password"
          v-model="loginData.password"
          placeholder="Digite sua senha"
        />

        <!-- Botão de login -->
        <button  @click="loginUser" class="loginButton" type="submit">Entrar</button>
        <div id="register">
          <!-- Link para a página de registro -->
          <router-link to="/register" class="register"> Não é Cadastrado? Clique aqui!</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Estilo da página de login */
.login-page {
  background-image: url(../assets/images/backgroundLogin.jpg);
  height: 100%;
  display: flex;
  justify-content: center;
}

/* Estilo do formulário de login */
.forms-login {
  background-color: #1a1a1a;
  color: #108d9b;
  padding: 10%;
  margin: 10%;
  display: flex;
  flex-direction: column;
}

/* Estilo da linha de separação */
#line {
  color: #ff6b00;
  width: 300px;
  border: 1px solid;
  margin-bottom: 50px;
}

/* Estilo dos rótulos */
label {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

/* Estilo dos campos de entrada */
input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
}

/* Estilo do botão de login */
.loginButton {
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #108f9c;
  display: flex;
  justify-self: center;
}

/* Estilo do botão de login ao passar o mouse */
.loginButton:hover {
  background-color: #0a6671;
}

/* Estilo do link de registro */
#register {
  padding-top: 40px;
  justify-self: center;
}

.register {
  cursor: pointer;
  color: white;
  text-decoration: none;
}

.register:hover {
  color: #ff6b00;
}
</style>