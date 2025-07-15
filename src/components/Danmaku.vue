<template>
  <div class="danmaku-layer">
    <div
      v-for="(comment, index) in comments"
      :key="comment.id"
      class="danmaku-item"
      :style="{ top: `${index * 40}px`, animationDelay: `${Math.random()}s` }"
    >
      {{ comment.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
    comments: {
        "id": string,
        "user": string,
        "title": string,
        "message": string,
        "timestamp": string,
        "isLiked": boolean,
        "likes": integer
    }[]
}>()
</script>

<style scoped>
.danmaku-layer {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 10000;
}

.danmaku-item {
  position: absolute;
  white-space: nowrap;
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  visibility: hidden;
  animation: danmaku-move 6s linear infinite;
  animation-fill-mode: forwards;
  text-shadow:
    -1px -1px 0 #333, /* 左上 */
     1px -1px 0 #333, /* 右上 */
    -2px  2px 0 #333, /* 左下 */
     2px  2px 0 #333, /* 右下 */
     3px  3px 6px black;
}

@keyframes danmaku-move {
  from {
    left: 100%;
    visibility: visible;
  }
  to {
    left: -100%;
    visibility: hidden;
  }
}
</style>
