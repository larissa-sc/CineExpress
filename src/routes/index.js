import {createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '@/view/HomeView.vue';
import LoginPage from '@/view/LoginPage.vue';
import MoviePage from '@/view/MoviePage.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginPage},
  { path: '/movie', component: MoviePage}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
