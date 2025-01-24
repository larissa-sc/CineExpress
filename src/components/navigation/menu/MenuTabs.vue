<script setup>
/* eslint-disable no-undef */

import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])   /* define o fechamento do menu */

const tabs = [
  { id: 'home', label: 'Início', icon: '🏠', route: '/' },
  { id: 'movies', label: 'Filmes', icon: '🎬', route: '/movie' },
  { id: 'series', label: 'Séries', icon: '📺', route: '/series' },
  { id: 'news', label: 'Notícias', icon: '📰', route: '/news' },
  { id: 'login', label: 'Login', icon: '😊', route: '/login' }
]

const activeTab = ref('home')    /*referência reativa que mantém a aba ativa atual */
const router = useRouter()

const navigate = (tab) => {
  activeTab.value = tab.id
  if (tab.route) {
    router.push(tab.route)
  }
}
</script>

<template>
  <nav class="menu-tabs" :class="{ 'open': isOpen }">
    <ul>
      <li 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="navigate(tab)"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu-tabs {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100vh;
  background: #1a1a1a;
  padding-top: 4rem;
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
}

.menu-tabs.open {
  transform: translateX(250px);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 1rem 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  transition: background-color 0.2s;
}

li:hover {
  background-color: #ff6b00;
  color: white;
}

.tab-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.tab-label {
  font-size: 1rem;
}
</style>
