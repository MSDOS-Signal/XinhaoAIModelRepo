<template>
  <canvas ref="cv" class="particle-field" :style="{ opacity }"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  density: { type: Number, default: 1 },      // 密度系数
  interactive: { type: Boolean, default: true },
  opacity: { type: Number, default: 1 },
  ripples: { type: Boolean, default: true }   // 信号涟漪
})

const cv = ref(null)
let raf = 0
let ctx, W, H, dpr
let particles = []
let rings = []
const mouse = { x: -9999, y: -9999 }

function resize() {
  const el = cv.value
  if (!el) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  const r = el.parentElement.getBoundingClientRect()
  W = r.width
  H = r.height
  el.width = W * dpr
  el.height = H * dpr
  el.style.width = W + 'px'
  el.style.height = H + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  seed()
}

function seed() {
  const n = Math.min(110, Math.floor((W * H) / 16000) * props.density)
  particles = Array.from({ length: n }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    r: Math.random() * 1.6 + 0.4,
    tw: Math.random() * Math.PI * 2,       // 闪烁相位
    ts: 0.008 + Math.random() * 0.02       // 闪烁速度
  }))
}

let lastRipple = 0
function tick(t) {
  ctx.clearRect(0, 0, W, H)

  // 周期性信号涟漪
  if (props.ripples && t - lastRipple > 2600) {
    lastRipple = t
    rings.push({
      x: W * (0.25 + Math.random() * 0.5),
      y: H * (0.3 + Math.random() * 0.4),
      r: 4,
      max: 130 + Math.random() * 120,
      a: 0.5
    })
  }

  // 涟漪圆环
  for (let i = rings.length - 1; i >= 0; i--) {
    const g = rings[i]
    g.r += 1.1
    g.a *= 0.985
    if (g.r > g.max || g.a < 0.01) { rings.splice(i, 1); continue }
    ctx.beginPath()
    ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(118, 185, 0,${g.a * 0.35})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // 粒子
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    p.tw += p.ts
    if (p.x < -10) p.x = W + 10
    if (p.x > W + 10) p.x = -10
    if (p.y < -10) p.y = H + 10
    if (p.y > H + 10) p.y = -10

    if (props.interactive) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const d2 = dx * dx + dy * dy
      if (d2 < 16900 && d2 > 0.01) {           // 130px 引力场
        const d = Math.sqrt(d2)
        const f = ((130 - d) / 130) * 0.35
        p.x += (dx / d) * f
        p.y += (dy / d) * f
      }
    }

    const glow = 0.35 + Math.abs(Math.sin(p.tw)) * 0.65
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(233,211,161,${0.55 * glow})`
    ctx.fill()
  }

  // 邻近连线
  ctx.lineWidth = 0.6
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j]
      const dx = a.x - b.x, dy = a.y - b.y
      const d2 = dx * dx + dy * dy
      if (d2 < 9800) {
        const o = (1 - d2 / 9800) * 0.22
        ctx.strokeStyle = `rgba(118, 185, 0,${o})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  raf = requestAnimationFrame(tick)
}

function onMove(e) {
  const r = cv.value.getBoundingClientRect()
  mouse.x = e.clientX - r.left
  mouse.y = e.clientY - r.top
}
function onLeave() { mouse.x = -9999; mouse.y = -9999 }

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

function vis() {
  if (document.hidden) cancelAnimationFrame(raf)
  else raf = requestAnimationFrame(tick)
}

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseout', onLeave)
  document.removeEventListener('visibilitychange', vis)
})
</script>

<style scoped>
.particle-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>
