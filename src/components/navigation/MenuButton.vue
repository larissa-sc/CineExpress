<script setup>
/* eslint-disable no-undef */
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['toggle']);
</script>


<template>
  <button 
    class="menu-button" 
    @click="$emit('toggle')"
    :class="{ 'open': isOpen }"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<style scoped>
.menu-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.menu-button span {
  width: 2rem;
  height: 0.25rem;
  background: #ff6b00;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.menu-button.open span:first-child {
  transform: rotate(45deg);
}

.menu-button.open span:nth-child(2) {
  opacity: 0;
}

.menu-button.open span:nth-child(3) {
  transform: rotate(-45deg);
}
</style>