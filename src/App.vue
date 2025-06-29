<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import './style.css'

const router = useRouter()
const route = useRoute()

const goToSponsorList = () => {
  router.push('/sponsor')
}

const scanQRCode = () => {
  router.push('/qrcode-scanner')
}

const goToProfile = () => {
  router.push('/profile')
}

const goToGameScene = () => {
  router.push('/')
}
</script>

<template>
  <router-view />

  <div class="bottom-bar">
    <button class="button" @click="goToSponsorList">
      <img src="./icons/sponsor.png" alt="贊助商列表" />
      <span>贊助商列表</span>
    </button>

    <button class="button button-game" v-if="route.name !== 'game'" @click="goToGameScene">
      <img src="./icons/game.png" alt="遊戲畫面" />
      <span>遊戲畫面</span>
    </button>

    <button class="button button-qrcode" v-else @click="scanQRCode">
      <img src="./icons/scan.png" alt="掃描 QR Code" />
      <span>掃描 QR Code</span>
    </button>

    <button class="button" @click="goToProfile">
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
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
}

.button:hover {
  transform: translateY(-2px);
  color: #007bff;
}

.button img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  object-fit: contain;
}

.button-game {
  transform: translateY(-10px);
}

.button-game img {
  width: 45px;
  height: 45px;
  background-color: #ffcc00;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.button-qrcode {
  transform: translateY(-10px);
}

.button-qrcode img {
  width: 45px;
  height: 45px;
  background-color: #B9E3F5; /* #E08C99 深粉色 #9A82B0 深紫色 #B9E3F5 淺藍色 */
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

</style>
