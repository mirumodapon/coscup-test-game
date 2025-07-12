<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { achivements } from '../data/AchivementsData';

const player = ref({
  avatar: '/assets/小啄_01.png',
  nickname: '鱈魚',
  signature: '嗨你好',
  achivements,
});

const editSignature = () => {
  alert('編輯簽名待開發');
};

</script>

<template>
  <div id="myProfile">
    <div class="avatar-section">
      <div class="avatar-container">
        <img :src="player.avatar" alt="Player Avatar" class="avatar-image">
      </div>
    </div>

    <div class="info-section">
      <div class="nickname-container">
        <span class="display-nickname">{{ player.nickname }}</span>
      </div>

      <div class="signature-container">
        <input type="text" v-model="player.signature" class="signature-input" readonly>
        <span class="edit-icon" @click="editSignature">✏️</span>
      </div>
    </div>

    <div class="scrollable-content">
        <div class="achivements-section">
          <h3>成就</h3>
          <div class="achivements-grid">
            <div v-for="medal in player.achivements" :key="medal.id" class="medal-item">
              <Icon :icon="medal.icon" class="medal-icon" />
              <span class="medal-label">{{ medal.label }}</span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
#myProfile {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #e0e6ec;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 0 0 2px #c9d2da;
  position: relative;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.info-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.nickname-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
}

.display-nickname {
  font-size: 20px;
  /* font-weight: bold; */
  color: #333;
}


.signature-container {
  background-color: #e6eef4;
  border-radius: 25px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.signature-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: #333;
  flex-grow: 1;
}


.edit-icon {
  color: #888;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
}

.scrollable-content {
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
  padding-right: 5px;
  box-sizing: border-box;
}

.achivements-section {
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  margin-top: 0;
  box-shadow: none;
}

.achivements-section h3 {
  font-size: 18px;
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
}

.achivements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-items: center;
  padding-bottom: 20px;
}

.medal-item {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.medal-icon {
  font-size: 48px;
  color: #41d1ff;
}

.medal-label {
  font-size: 12px;
  color: #555;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

input:focus {
  outline: none;
}
</style>
