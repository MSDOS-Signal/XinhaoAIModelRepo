<template>
  <canvas ref="cv" class="block-field" :style="{ opacity }"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  opacity: { type: Number, default: 0.6 },
  interactive: { type: Boolean, default: true }
})

const cv = ref(null)
let raf = 0
let ctx, W, H, dpr
const mouse = { x: -9999, y: -9999 }

// 网格参数
const CELL = 22
const GAP = 2
const SIZE = CELL - GAP

// 调色板:白色 + 绿色系 + 辅助色(青、浅黄)
const COLORS = [
  { r: 255, g: 255, b: 255 },   // 白
  { r: 232, g: 240, b: 228 },   // 暖白
  { r: 118, g: 185, b: 0 },     // NVIDIA 绿
  { r: 143, g: 207, b: 42 },    // 亮绿
  { r: 157, g: 220, b: 31 },    // 草绿
  { r: 184, g: 224, b: 80 },    // 嫩绿
  { r: 100, g: 200, b: 180 },   // 青绿(辅助)
  { r: 200, g: 220, b: 100 },   // 黄绿(辅助)
  { r: 74, g: 122, b: 0 },      // 深绿
]

// 高亮方块:使用绝对像素坐标,随滚动一起移动
let highlights = []
let scrollY = 0        // 连续递增,永不回绕
const SCROLL_SPEED = 0.4  // 像素/帧

function resize() {
  const el = cv.value
  if (!el) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  W = window.innerWidth
  H = window.innerHeight
  el.width = W * dpr
  el.height = H * dpr
  el.style.width = W + 'px'
  el.style.height = H + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  seedHighlights()
}

function seedHighlights() {
  const cols = Math.ceil(W / CELL) + 2
  const rows = Math.ceil(H / CELL) + 4
  const count = Math.floor(cols * rows * 0.07)
  highlights = []
  for (let i = 0; i < count; i++) {
    highlights.push({
      x: Math.floor(Math.random() * cols) * CELL,
      y: Math.random() * H,
      colorIdx: Math.floor(Math.random() * COLORS.length), // 从全部调色板随机
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.4,
      baseAlpha: 0.3 + Math.random() * 0.5,
    })
  }
}

function tick(t) {
  ctx.clearRect(0, 0, W, H)
  const time = t * 0.001

  // 连续滚动,永不回绕
  scrollY += SCROLL_SPEED

  const cols = Math.ceil(W / CELL) + 2
  const rows = Math.ceil(H / CELL) + 4

  // 子像素偏移:scrollY 对 CELL 取余,实现平滑滚动
  const yOff = scrollY % CELL

  // ---- 绘制基础网格 ----
  for (let row = -1; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * CELL + GAP / 2
      const y = row * CELL + yOff + GAP / 2

      // 鼠标引力
      let dx = 0, dy = 0
      if (props.interactive && mouse.x > -9000) {
        const cx = x + SIZE / 2
        const cy = y + SIZE / 2
        const ddx = cx - mouse.x
        const ddy = cy - mouse.y
        const d2 = ddx * ddx + ddy * ddy
        if (d2 < 14400 && d2 > 1) {
          const d = Math.sqrt(d2)
          const f = ((120 - d) / 120) * 6
          dx = (ddx / d) * f
          dy = (ddy / d) * f
        }
      }

      // 普通方块:基于位置选取颜色,暗色微弱呼吸
      const breathe = 0.5 + Math.sin(time * 0.4 + col * 0.1 + row * 0.08) * 0.5
      // 用网格坐标哈希到调色板,让普通方块也有颜色变化
      // 使用安全取模:JS 的 % 对负数会返回负值,需 +len 再 % 确保非负
      const colorHash = ((col * 7 + row * 13) % COLORS.length + COLORS.length) % COLORS.length
      const c = COLORS[colorHash] || COLORS[0]
      const alpha = 0.015 + breathe * 0.025
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`
      ctx.fillRect(x + dx, y + dy, SIZE, SIZE)
    }
  }

  // ---- 绘制高亮方块(跟随滚动) ----
  for (const h of highlights) {
    // 高亮方块的 Y 跟随 scrollY 移动
    let hy = h.y + scrollY
    // 超出屏幕底部时,回收到顶部并随机新位置
    if (hy > H + CELL) {
      h.y = -scrollY - CELL - Math.random() * 100
      h.x = Math.floor(Math.random() * cols) * CELL
      h.colorIdx = Math.floor(Math.random() * COLORS.length)
    }

    const x = h.x + GAP / 2
    const y = hy + GAP / 2

    // 鼠标引力
    let dx = 0, dy = 0
    if (props.interactive && mouse.x > -9000) {
      const cx = x + SIZE / 2
      const cy = y + SIZE / 2
      const ddx = cx - mouse.x
      const ddy = cy - mouse.y
      const d2 = ddx * ddx + ddy * ddy
      if (d2 < 14400 && d2 > 1) {
        const d = Math.sqrt(d2)
        const f = ((120 - d) / 120) * 8
        dx = (ddx / d) * f
        dy = (ddy / d) * f
      }
    }

    // 闪烁脉动
    const pulse = 0.5 + Math.sin(time * h.speed + h.phase) * 0.5
    const c = COLORS[h.colorIdx] || COLORS[0]
    const alpha = h.baseAlpha * (0.4 + pulse * 0.6)

    // 主体
    ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`
    ctx.fillRect(x + dx, y + dy, SIZE, SIZE)

    // 光晕(脉冲峰值时)
    if (pulse > 0.65) {
      const glowAlpha = (pulse - 0.65) * 0.15
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${glowAlpha})`
      ctx.fillRect(x + dx - SIZE * 0.4, y + dy - SIZE * 0.4, SIZE * 1.8, SIZE * 1.8)
    }
  }

  raf = requestAnimationFrame(tick)
}

function onMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}
function onLeave() { mouse.x = -9999; mouse.y = -9999 }

function vis() {
  if (document.hidden) cancelAnimationFrame(raf)
  else raf = requestAnimationFrame(tick)
}

onMounted(() => {
  ctx = cv.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  if (props.interactive) {
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
  }
  raf = requestAnimationFrame(tick)
  document.addEventListener('visibilitychange', vis)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseout', onLeave)
  document.removeEventListener('visibilitychange', vis)
})
</script>

<style scoped>
.block-field {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
</style>
