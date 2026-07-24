<template>
  <header class="nav" :class="{ scrolled }">
    <div class="nav-inner container">
      <router-link to="/" class="brand" @click="playClick">
        <svg class="brand-mark" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="17" stroke="currentColor" stroke-width="1.4" opacity="0.5" />
          <circle cx="20" cy="20" r="10.5" stroke="currentColor" stroke-width="1.4" opacity="0.8" />
          <circle cx="20" cy="20" r="4" fill="currentColor" />
          <circle class="orbit-dot" cx="20" cy="3" r="2.2" fill="currentColor" />
        </svg>
        <span class="brand-text">
          <span class="brand-cn serif">星皓</span>
          <span class="brand-en mono">XINHAO</span>
        </span>
      </router-link>

      <nav class="links">
        <router-link v-for="l in links" :key="l.to" :to="l.to" class="link" :class="{ on: isOn(l.to) }" @click="playClick">
          {{ l.label }}
        </router-link>
      </nav>

      <router-link to="/playground" class="btn btn-sm nav-cta" @click="playClick">
        立即体验
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { playClick } from '@/utils/sound'

const route = useRoute()
const scrolled = ref(false)
const links = [
  { to: '/', label: '首页' },
  { to: '/models', label: '模型广场' },
  { to: '/playground', label: '在线体验' },
  { to: '/docs', label: '开发文档' }
]
const isOn = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))

const onScroll = () => { scrolled.value = window.scrollY > 24 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: all 0.5s var(--ease-out);
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(7, 8, 12, 0.72);
  backdrop-filter: blur(18px) saturate(1.2);
  border-bottom-color: var(--line);
}
.nav-inner {
  display: flex;
  align-items: center;
  gap: 40px;
  height: 68px;
}
.brand { display: flex; align-items: center; gap: 12px; color: var(--gold); }
.brand-mark { width: 30px; height: 30px; }
.orbit-dot { transform-origin: 20px 20px; animation: spinSlow 7s linear infinite; }
.brand-text { display: flex; flex-direction: column; line-height: 1.1; }
.brand-cn { font-size: 19px; font-weight: 600; color: var(--text); letter-spacing: 0.16em; }
.brand-en { font-size: 9px; letter-spacing: 0.5em; color: var(--text-3); }

.links { display: flex; gap: 6px; margin-left: auto; }
.link {
  padding: 8px 16px;
  font-size: 13.5px;
  letter-spacing: 0.08em;
  color: var(--text-2);
  border-radius: 999px;
  position: relative;
  transition: color 0.3s;
}
.link:hover { color: var(--gold-2); }
.link.on { color: var(--gold-2); }
.link.on::after {
  content: '';
  position: absolute;
  left: 50%; bottom: 0;
  width: 14px; height: 2px;
  transform: translateX(-50%);
  background: var(--gold);
  border-radius: 2px;
}
.nav-cta { flex-shrink: 0; }

@media (max-width: 720px) {
  .nav-inner { gap: 14px; height: 60px; }
  .links { gap: 0; overflow-x: auto; }
  .link { padding: 8px 10px; font-size: 12.5px; white-space: nowrap; }
  .nav-cta { display: none; }
}
</style>
