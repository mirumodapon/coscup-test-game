<script setup lang="ts">
import type Phaser from 'phaser'
import { onMounted, onUnmounted, ref } from 'vue'
import { EventBus } from './game/EventBus'
import { GameData } from './game/GameData'
import StartGame from './game/main'
import banner from '../public/assets/banner.png'

const emit = defineEmits(['current-active-scene'])
// Save the current scene instance
const scene = ref()
const game = ref()
const showPopup = ref(false);
const popupData = ref<{ type: string } | null>(null);

onMounted(() => {
  game.value = StartGame('game-container')

  EventBus.on('current-scene-ready', (sceneInstance: Phaser.Scene) => {
    emit('current-active-scene', sceneInstance)

    scene.value = sceneInstance
  })

  EventBus.on('tile-clicked', (data:{ type: string }) => {
    showPopup.value = true
    popupData.value = data
  })
})

onUnmounted(() => {
  if (game.value) {
    game.value.destroy(true)
    game.value = null
  }
})

defineExpose({ scene, game })

function closePopup() {
  showPopup.value = false
  GameData.popupOpen = false
}
</script>

<template>
  <div id="game-container" />
  <div class="popup-overlay" id="popup" v-if="showPopup">
    <div class="popup-content">
      <button class="popup-close" id="popupClose" @click="closePopup()">x</button>
      <div v-if="popupData?.type === 'Base'">
        <img
          alt="COSCUP x RubyConf Taiwan 2025 banner"
          :src="banner"
          class="Banner"
        >
      </div>
      <div v-else-if="popupData?.type === 'Sponsor'">
        <h2>Sponsor</h2>
      </div>
      <div v-else-if="popupData?.type === 'Venue'">
        <h2>Venue</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
#game-container {
  width: 100%;
  height: 100%;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup-content {
  position: relative;
  background-color: white;
  color: black;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  max-width: 70%;
  text-align: center;
}

.popup-close {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: #ff5f5f;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.Banner {
  width: 100%;
}
</style>
