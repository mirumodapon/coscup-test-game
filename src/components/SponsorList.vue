<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { marked } from 'marked'
import { GameData } from '../game/GameData'

const sponsorData = ref()
const activeID = ref<number | null>(null)
const renderer = new marked.Renderer()
renderer.link = function ({href, title, text}) {
  return `<a href="${href}" target="_blank">${text}</a>`
}
marked.setOptions({ renderer })

onMounted(() => {
  const sponsorDataUrl = 'https://coscup.org/2024/json/sponsor.json'
  fetch(sponsorDataUrl)
    .then(res => res.json())
    .then(json => {
      sponsorData.value = json.reduce(
        (acc: any, item: any) => {
          acc[item.id] = item
          return acc
        }, {}
      )
    })
    .catch(err => {
      console.error('Failed to load JSON:', err)
    })
})

function toggleSponsor(id: number) {
  activeID.value = activeID.value === id ? null : id
}

function markedIntro(intro: string) {
  const res = computed(() => marked(intro))
  return res.value
}
</script>

<template>
  <div class="sponsor-list" :style="{ 'margin-bottom': `${GameData.bottomBarHeight}px` }">
    <div
      v-for="(sponsor, id) in sponsorData"
      :key="id"
      class="sponsor-item"
      @click="toggleSponsor(id)"
    >
      <div class="sponsor-header">
        <img 
          :src="'https://coscup.org/' + sponsorData[id].image" 
          :alt="sponsorData[id].name['zh-TW']" class="sponsor-logo" />
        <span class="sponsor-name">{{ sponsorData[id].name['zh-TW'] }}</span>
      </div>
      <transition name="fade-slide">
        <div
          v-if="activeID === id"
          class="sponsor-detail"
          v-html="markedIntro(sponsor.intro['zh-TW'])"
        >
        </div>
      </transition>
    </div>
  </div>
</template>


<style scoped>
.sponsor-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 85%;
  width: 90%;
  overflow-y: auto;
}

.sponsor-item {
  border-radius: 12px;
  padding: 12px;
  background-color: white;
}

.sponsor-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sponsor-logo {
  width: 100px;
}

.sponsor-name {
  font-weight: bold;
  font-size: 18px;
  color: black;
}

.sponsor-detail {
  font-size: 14px;
  color: #555;
  transform-origin: top;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  max-height: 500px;
  opacity: 1;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: max-height 0.5s ease, opacity 0.5s ease;
}
</style>
