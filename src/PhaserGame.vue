<script setup lang="ts">
import type Phaser from 'phaser'
import { onMounted, onUnmounted, ref } from 'vue'
import { EventBus } from './game/EventBus'
import StartGame from './game/main'

const emit = defineEmits(['current-active-scene'])
// Save the current scene instance
const scene = ref()
const game = ref()

onMounted(() => {
  game.value = StartGame('game-container')

  EventBus.on('current-scene-ready', (sceneInstance: Phaser.Scene) => {
    emit('current-active-scene', sceneInstance)

    scene.value = sceneInstance
  })
})

onUnmounted(() => {
  if (game.value) {
    game.value.destroy(true)
    game.value = null
  }
})

defineExpose({ scene, game })
</script>

<template>
  <div id="game-container" />
</template>

<style scoped>
#game-container {
  width: 100%;
  height: 100%;
}
</style>
