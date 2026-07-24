<template>
  <article
    ref="card"
    class="m-card"
    @mousemove="tilt"
    @mouseleave="untilt"
    @click="onCardClick"
  >
    <div class="glow" :style="glowStyle"></div>

    <header class="m-head">
      <div class="m-head-left">
        <span class="m-logo" :class="{ dual: logos.length > 1 }">
          <img
            v-for="(src, i) in logos"
            :key="i"
            :src="src"
            :alt="orgName"
            class="m-logo-img"
            @error="onImgErr"
          />
          <span v-if="logos.length === 0" class="m-logo-fallback serif">{{ orgName.charAt(0) }}</span>
        </span>
        <span class="m-org mono">{{ orgName }}</span>
      </div>
      <div class="m-badges">
        <span v-if="model.hot" class="badge hot">HOT</span>
        <span v-if="model.fresh" class="badge fresh">NEW</span>
      </div>
    </header>

    <h3 class="m-name serif">{{ model.name }}</h3>
    <p class="m-id mono">{{ model.id }}</p>
    <p class="m-desc">{{ model.desc }}</p>

    <div class="m-tags">
      <span class="tag tag-gold">{{ catLabel }}</span>
      <span v-for="t in model.tags.slice(0, 3)" :key="t" class="tag">{{ tagLabel(t) }}</span>
      <span v-if="model.tags.length > 3" class="tag more">+{{ model.tags.length - 3 }}</span>
    </div>

    <footer class="m-foot mono">
      <span v-if="model.params !== '—'">{{ model.params }}</span>
      <span v-if="model.ctx !== '—'" class="ctx">{{ model.ctx }} 上下文</span>
        <span class="go">详情 →</span>
    </footer>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { TAG_LABELS, CATEGORIES, ORG_NAMES, orgLogos } from '@/data/models'
import { playClick } from '@/utils/sound'

const props = defineProps({ model: { type: Object, required: true } })
const emit = defineEmits(['open'])

const card = ref(null)
const rx = ref(0)
const ry = ref(0)
const gx = ref(50)
const gy = ref(50)

const orgName = computed(() => ORG_NAMES[props.model.org] || props.model.org)
const logos = computed(() => orgLogos(props.model.org))
const catLabel = computed(() => CATEGORIES[props.model.cat]?.label || '专项')
const tagLabel = (t) => TAG_LABELS[t] || t

function onImgErr(e) {
  e.target.style.display = 'none'
}

function onCardClick() {
  playClick()
  emit('open', props.model)
}

const glowStyle = computed(() => ({
  background: `radial-gradient(420px circle at ${gx.value}% ${gy.value}%, rgba(118, 185, 0,0.09), transparent 65%)`
}))

function tilt(e) {
  const r = card.value.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  gx.value = px * 100
  gy.value = py * 100
  ry.value = (px - 0.5) * 7
  rx.value = (0.5 - py) * 7
  card.value.style.transform = `perspective(900px) rotateX(${rx.value}deg) rotateY(${ry.value}deg) translateY(-4px)`
}
function untilt() {
  card.value.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
}
</script>

<style scoped>
.m-card {
  position: relative;
  padding: 22px 22px 18px;
  border-radius: var(--radius);
  background: var(--panel);
  border: 1px solid var(--line);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.35s var(--ease-out), border-color 0.35s, box-shadow 0.35s;
  will-change: transform;
}
.m-card:hover {
  border-color: var(--line-strong);
  box-shadow: var(--shadow-lg);
}
.glow { position: absolute; inset: 0; pointer-events: none; transition: opacity 0.3s; }

.m-head { display: flex; justify-content: space-between; align-items: center; }
.m-head-left { display: flex; align-items: center; gap: 10px; }

/* 厂商 Logo 容器 */
.m-logo {
  flex-shrink: 0;
  width: 36px; height: 36px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  padding: 3px;
}
/* 双 logo 并排时缩小每个 */
.m-logo.dual { gap: 2px; padding: 4px; }
.m-logo.dual .m-logo-img { width: 50%; height: 100%; object-fit: contain; }
.m-logo-img { width: 100%; height: 100%; object-fit: contain; }
.m-logo-fallback { font-size: 15px; font-weight: 700; color: var(--nv); }

.m-org { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--text-3); }
.m-badges { display: flex; gap: 6px; }
.badge {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  padding: 2px 7px;
  border-radius: 4px;
}
.badge.hot { color: #9ddc1f; background: rgba(157, 220, 31, 0.12); border: 1px solid rgba(157, 220, 31, 0.35); }
.badge.fresh { color: var(--nv-2); background: rgba(118, 185, 0, 0.1); border: 1px solid rgba(118, 185, 0, 0.35); }

.m-name { margin-top: 14px; font-size: 20px; font-weight: 600; letter-spacing: 0.02em; }
.m-id { margin-top: 4px; font-size: 10.5px; color: var(--text-3); letter-spacing: 0.04em; }
.m-desc {
  margin-top: 12px;
  font-size: 13px;
  color: var(--text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 44px;
}

.m-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; min-height: 26px; }
.tag.more { color: var(--text-3); }

.m-foot {
  display: flex;
  gap: 14px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: 11px;
  color: var(--text-3);
  align-items: center;
}
.m-foot .ctx { color: var(--text-2); }
.go { margin-left: auto; color: var(--nv); opacity: 0; transform: translateX(-6px); transition: all 0.35s var(--ease-out); }
.m-card:hover .go { opacity: 1; transform: translateX(0); }
</style>
