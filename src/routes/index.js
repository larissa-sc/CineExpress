import {createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '@/view/HomeView.vue';
import LoginPage from '@/view/LoginPage.vue';
import MoviePage from '@/view/MoviePage.vue';
import SeriesPage from '@/view/SeriesPage.vue';
import RegisterPage from '@/view/RegisterPage.vue';
import UserPage from '@/view/UserPage.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  { path: '/', component: HomeView},
  { path: '/login', component: LoginPage},
  { path: '/register', component: RegisterPage},
  { path: '/movie', component: MoviePage},
  { path: '/series', component: SeriesPage},
  { path: '/user', component: UserPage, meta: {requiresAuth: true}}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) =>{
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth){
    onAuthStateChanged(auth, (user) => {
      if (user){
        next();
      }
      else{
        next('/login');
      }
    })
  }
  else{
    next();
  }
})

export default router;
