<script setup lang="ts">
import PhaserGame from './PhaserGame.vue'
</script>

<template>
  <PhaserGame ref="phaserRef" />
  <div class="bottom-bar">
    <button class="button">成就</button>
    <button class="button">分享</button>
    <button class="button">個人檔案</button>
  </div>
</template>

<style scoped>
.bottom-bar {
  position: absolute;
  display: flex;
  bottom: 0;
  height: 40px;
  width: 100%;
  z-index: 10;
}
.button {
  flex: 1;
  margin: 0;
}
</style>
