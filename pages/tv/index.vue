<template>
  <div class="tv-page">
    <ClientOnly>
      <div class="player-wrapper">
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

// =========================
// 初始化播放器（关键：动态加载 video.js）
// =========================
onMounted(async () => {
  if (!videoRef.value) return

  // ❗关键：避免 SSR / Rollup 解析
  const videojs = (await import('video.js')).default

  player = videojs(videoRef.value, {
    controls: true,
    autoplay: false,
    preload: 'auto',
    fluid: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2]
  })

  // =========================
  // 默认播放源（可替换接口）
  // =========================
  player.src({
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    type: 'application/x-mpegURL'
  })

  // =========================
  // 断点续播（本地存储）
  // =========================
  const savedTime = localStorage.getItem('tv-progress')
  if (savedTime) {
    player.on('loadedmetadata', () => {
      player.currentTime(Number(savedTime))
    })
  }

  player.on('timeupdate', () => {
    localStorage.setItem('tv-progress', player.currentTime())
  })
})

// =========================
// 销毁播放器（防内存泄漏）
// =========================
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
  background: #000;
  min-height: 100vh;
}

.player-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
}

.loading {
  color: #999;
  text-align: center;
  padding: 60px;
}
</style>
