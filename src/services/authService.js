// authService.js
import { auth } from '@/services/firebase';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

const setAuthPersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.error('Erro ao configurar persistência de autenticação:', error);
  }
};

const checkUserAuthentication = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

const getCurrentUser = () => {
  return auth.currentUser;
};

export { setAuthPersistence, checkUserAuthentication, getCurrentUser };
