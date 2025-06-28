<script setup lang="ts">
import PhaserGame from './PhaserGame.vue'
import './style.css'
</script>

<template>
  <PhaserGame ref="phaserRef" />
  <div class="bottom-bar">
    <button class="button">
      <img src="./icons/sponsor.png" alt="贊助商列表" />
      <span>贊助商列表</span>
    </button>
    <button class="button button-game">
      <img src="./icons/game.png" alt="遊戲畫面" />
      <span>遊戲畫面</span>
    </button>
    <button class="button">
      <img src="./icons/user.png" alt="我的資料" />
      <span>我的資料</span>
    </button>
  </div>
</template>

<style scoped>
.bottom-bar {
  position: absolute;
  display: flex;
  bottom: 0;
  height: 70px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: #e0ecff;
  z-index: 10;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
}

.button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0;
  padding: 0;
}

.button img {
  width: 32px;
  height: 32px;
}
</style>
