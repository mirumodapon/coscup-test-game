import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PhaserGame from '../components/PhaserGame.vue'
import SponsorList from '../components/SponsorList.vue'
import QRCodeScanner from '../components/QRCodeScanner.vue'
import MyProfile from '../components/MyProfile.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'game',
    component: PhaserGame
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    component: SponsorList
  },
  {
    path: '/qrcode-scanner',
    name: 'qrcode-scanner',
    component: QRCodeScanner
  },
  {
    path: '/profile',
    name: 'profile',
    component: MyProfile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router