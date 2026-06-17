<template>
  <div class="tv-page">
    <ClientOnly>
      <div class="player-box">
        <video
          ref="videoRef"
          class="video-js vjs-default-skin vjs-big-play-centered"
          playsinline
        ></video>
      </div>

      <template #fallback>
        <div class="loading">播放器加载中...</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoRef = ref(null)
let player = null

onMounted(async () => {
  // ✅ 关键：完全动态加载（避免 Rollup 解析）
  const videojs = (await import('video.js')).default

  player = videojs(videoRef.value, {
    controls: true,
    autoplay: false,
    preload: 'auto',
    fluid: true,
    responsive: true
  })

  // 👉 默认播放源（可替换你的接口）
  player.src({
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    type: 'application/x-mpegURL'
  })
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
    player = null
  }
})
</script>

<style scoped>
.tv-page {
  padding: 20px;
}

.player-box {
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #999;
  font-size: 14px;
}
</style>
