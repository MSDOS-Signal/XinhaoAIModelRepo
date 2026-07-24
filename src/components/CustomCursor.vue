<template>
  <div class="cursor-layer" v-if="enabled">
    <!-- 跟随圆圈(有延迟) -->
    <div class="cursor-ring" :style="ringStyle" :class="{ hover: isHover }"></div>
    <!-- 精确小点 -->
    <div class="cursor-dot" :style="dotStyle"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const enabled = ref(false)
const isHover = ref(false)

const dotStyle = ref({ transform: 'translate(-50%, -50%)' })
const ringStyle = ref({ transform: 'translate(-50%, -50%)' })

let mouseX = 0, mouseY = 0
let ringX = 0, ringY = 0
let raf = 0

function tick() {
  // 圆圈平滑追随,使用 lerp
  ringX += (mouseX - ringX) * 0.18
  ringY += (mouseY - ringY) * 0.18
  ringStyle.value = {
    transform: `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
  }
  dotStyle.value = {
    transform: `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
  }
  raf = requestAnimationFrame(tick)
}

function onMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
}

// 检测是否悬停在可交互元素上
function onOver(e) {
  const el = e.target
  if (!el || !el.closest) return
  const interactive = el.closest('a, button, input, textarea, select, [role="button"], .chip, .dd-item, .suggestion-chip, .cap-card, .model-card, .slider')
  isHover.value = !!interactive
}

function onDown() { isHover.value = true }
function onUp() { isHover.value = false }

// 检查是否应该启用自定义光标(桌面端 + 屏幕足够宽)
function shouldEnable() {
  return window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768
}

function enableCursor() {
  if (enabled.value) return
  enabled.value = true
  document.documentElement.classList.add('custom-cursor-active')
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseover', onOver, { passive: true })
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  raf = requestAnimationFrame(tick)
}

function disableCursor() {
  if (!enabled.value) return
  enabled.value = false
  document.documentElement.classList.remove('custom-cursor-active')
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  window.removeEventListener('mousedown', onDown)
  window.removeEventListener('mouseup', onUp)
  cancelAnimationFrame(raf)
}

function onResize() {
  if (shouldEnable()) enableCursor()
  else disableCursor()
}

onMounted(() => {
  if (shouldEnable()) {
    enableCursor()
  }
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  disableCursor()
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.cursor-layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  pointer-events: none;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--nv-2);
  will-change: transform;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid rgba(118, 185, 0, 0.6);
  will-change: transform;
  transition: width 0.25s var(--ease-out), height 0.25s var(--ease-out),
              border-color 0.25s, background 0.25s;
}

.cursor-ring.hover {
  width: 48px;
  height: 48px;
  border-color: rgba(157, 220, 31, 0.8);
  background: rgba(118, 185, 0, 0.06);
}
</style>
