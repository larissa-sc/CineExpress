import {createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '@/view/HomeView.vue';
import LoginPage from '@/view/LoginPage.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginPage},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
