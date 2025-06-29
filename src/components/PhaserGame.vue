<script setup lang="ts">
import type Phaser from 'phaser'
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import { EventBus } from '../game/EventBus'
import { GameData } from '../game/GameData'
import StartGame from '../game/main'

const emit = defineEmits(['current-active-scene'])
// Save the current scene instance
const scene = ref()
const game = ref()
const showPopup = ref(false)
const popupData = ref<{ type: string, ID: string } | null>(null)
const sponsorData = ref()
const comments = ref()
const newMessage = ref('')

onMounted(() => {
  game.value = StartGame('game-container')

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

  EventBus.on('current-scene-ready', (sceneInstance: Phaser.Scene) => {
    emit('current-active-scene', sceneInstance)

    scene.value = sceneInstance
  })

  EventBus.on('tile-clicked', (data:{ type: string, ID: string }) => {
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

function formatTime(iso: string) {
  return new Date(iso).toLocaleString()
}

function addComment() {
  comments.value.push({
    ID: comments.value.length + 1,
    user: 'TC',
    message: newMessage.value,
    timestamp: new Date().toISOString()
  })
  newMessage.value = ''
}

const isButtonDisabled = computed(() => {
  return newMessage.value.trim() === ''
})

watch([showPopup, popupData], async ([isOpen, data]) => {
  if (isOpen && data?.type === 'Venue') {
    comments.value = [
      {
        "id": 1,
        "user": "Alice",
        "message": "這個場地超棒，氣氛很好！",
        "timestamp": "2025-06-27T10:24:00+08:00"
      },
      {
        "id": 2,
        "user": "Bob",
        "message": "昨天參加的活動非常精彩，謝謝主辦單位。",
        "timestamp": "2025-06-27T11:12:34+08:00"
      },
      {
        "id": 3,
        "user": "Cindy",
        "message": "請問這裡有提供素食餐點嗎？",
        "timestamp": "2025-06-27T11:45:10+08:00"
      },
      {
        "id": 4,
        "user": "Daniel",
        "message": "希望下次活動可以有更多互動環節。",
        "timestamp": "2025-06-27T12:01:50+08:00"
      },
      {
        "id": 5,
        "user": "Emily",
        "message": "場地有點小，不過整體很溫馨！",
        "timestamp": "2025-06-27T12:35:22+08:00"
      },
      {
        "id": 6,
        "user": "Frank",
        "message": "活動真的很用心，期待下次再參加！",
        "timestamp": "2025-06-27T13:05:00+08:00"
      },
      {
        "id": 7,
        "user": "Grace",
        "message": "現場氣氛很好，主持人也超有趣。",
        "timestamp": "2025-06-27T13:12:35+08:00"
      },
      {
        "id": 8,
        "user": "Henry",
        "message": "覺得空間稍微擁擠，但整體體驗不錯。",
        "timestamp": "2025-06-27T13:23:19+08:00"
      },
      {
        "id": 9,
        "user": "Irene",
        "message": "可以考慮加入音樂表演會更棒！",
        "timestamp": "2025-06-27T13:41:02+08:00"
      },
      {
        "id": 10,
        "user": "Jack",
        "message": "我最喜歡DIY區域，小朋友玩得很開心。",
        "timestamp": "2025-06-27T14:00:00+08:00"
      },
      {
        "id": 11,
        "user": "Kelly",
        "message": "希望之後有更多互動攤位～",
        "timestamp": "2025-06-27T14:05:43+08:00"
      },
      {
        "id": 12,
        "user": "Leo",
        "message": "美食區真的很豐富！吃得超滿足！",
        "timestamp": "2025-06-27T14:21:10+08:00"
      },
      {
        "id": 13,
        "user": "Mia",
        "message": "第一次來這個場地，感覺超棒！",
        "timestamp": "2025-06-27T14:35:47+08:00"
      },
      {
        "id": 14,
        "user": "Nate",
        "message": "排隊動線可以再優化一下。",
        "timestamp": "2025-06-27T14:50:00+08:00"
      },
      {
        "id": 15,
        "user": "Olivia",
        "message": "主題佈置好漂亮，拍了很多照片！",
        "timestamp": "2025-06-27T15:00:12+08:00"
      }
    ]
  }
})
</script>

<template>
  <div id="game-container" />
  <div class="popup-overlay" id="popup" v-if="showPopup">
    <div class="popup-content">
      <button class="popup-close" id="popupClose" @click="closePopup()">x</button>
      <div v-if="popupData?.type === 'Base'">
        <img
          alt="COSCUP x RubyConf Taiwan 2025 banner"
          src="../public/assets/banner-mobile.png"
        >
      </div>
      <div v-else-if="popupData?.type === 'Sponsor'" class="Sponsor">
        <h2>{{ sponsorData[popupData?.ID].name['zh-TW'] }}</h2>
        <img
          :alt="sponsorData[popupData?.ID].name['zh-TW']"
          :src="'https://coscup.org/' + sponsorData[popupData?.ID].image"
        >
        <p>{{ sponsorData[popupData?.ID].intro['zh-TW'] }}</p>
      </div>
      <div v-else-if="popupData?.type === 'Venue'" class="Venue">
        <h2>{{ popupData?.ID }}</h2>
        <div class="comment-list">
          <div v-for="comment in comments" :key="comment.ID" class="comment-item">
            <div class="comment-header">
              <span class="comment-user">{{ comment.user }}</span>
              <span class="comment-time">{{ formatTime(comment.timestamp) }}</span>
            </div>
            <p class="comment-message">{{ comment.message }}</p>
          </div>
        </div>
        <div class="comment-form">
          <textarea v-model="newMessage" rows="3" placeholder="寫下你的留言...（上限 30 個字）" maxlength="30"></textarea>
          <button @click="addComment" :disabled="isButtonDisabled">送出留言</button>
        </div>
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

img {
  width: 100%;
}

.Sponsor h2,
.Sponsor p,
.Venue h2 {
  text-align: left;
  max-height: 50vh;
  overflow-y: auto;
}

.comment-list {
  max-height: 60vh;
  overflow-y: auto;
}

.comment-item {
  border-bottom: 1px solid black;
  padding: 12px 16px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 4px;
  color: #333;
}

.comment-user {
  font-weight: bold;
}

.comment-message {
  margin: 0;
  text-align: left;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comment-form textarea {
  margin-top: 12px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.comment-form button {
  align-self: flex-end;
  padding: 8px 16px;
  background-color: rgb(182, 105, 214);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
}

.comment-form button:disabled {
  background-color: #aaa;
}
</style>
