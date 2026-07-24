<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="model" class="mask" @click.self="onClose">
        <div class="modal panel" role="dialog">
          <button class="close" @click="onClose" aria-label="关闭">×</button>

          <div class="modal-grid">
            <div class="info">
              <div class="m-hero">
                <span class="m-hero-logo" :class="{ dual: logos.length > 1 }">
                  <img
                    v-for="(src, i) in logos"
                    :key="i"
                    :src="src"
                    :alt="orgName"
                    class="m-hero-logo-img"
                    @error="onImgErr"
                  />
                  <span v-if="logos.length === 0" class="m-hero-fallback serif">{{ (orgName || '?').charAt(0) }}</span>
                </span>
                <div>
                  <span class="eyebrow">{{ orgName }}</span>
                  <h2 class="serif m-title">{{ model.name }}</h2>
                </div>
              </div>
              <p class="mono m-id" @click="copyId" :title="'点击复制'">
                {{ model.id }}
                <span class="copy">{{ copied ? '已复制' : '复制' }}</span>
              </p>
              <p class="m-desc">{{ model.desc }}</p>

              <div class="m-tags">
                <span class="tag tag-gold">{{ catLabel }}</span>
                <span v-for="t in model.tags" :key="t" class="tag">{{ tagLabel(t) }}</span>
              </div>

              <div class="m-meta">
                <div class="meta-item">
                  <div class="meta-v serif">{{ model.params }}</div>
                  <div class="meta-k mono">参数量</div>
                </div>
                <div class="meta-item">
                  <div class="meta-v serif">{{ model.ctx }}</div>
                  <div class="meta-k mono">上下文</div>
                </div>
                <div class="meta-item">
                  <div class="meta-v serif">{{ chatOk ? '对话' : 'API' }}</div>
                  <div class="meta-k mono">调用方式</div>
                </div>
              </div>

              <div class="m-actions">
                <button v-if="chatOk" class="btn btn-solid" @click="goPlayground">立即体验</button>
                <a class="btn" :href="`https://build.nvidia.com/${model.id}`" target="_blank" rel="noopener">
                  NVIDIA 主页
                </a>
              </div>
            </div>

            <div class="radar-box">
              <div class="radar-title mono">能力雷达 · CAPABILITY RADAR</div>
              <VChart :option="radarOption" height="320px" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import VChart from '@/components/VChart.vue'
import { TAG_LABELS, CATEGORIES, ORG_NAMES, radarOf, isChatCapable, orgLogos } from '@/data/models'
import { playClick } from '@/utils/sound'

const props = defineProps({ model: { type: Object, default: null } })
const emit = defineEmits(['close'])
const router = useRouter()
const copied = ref(false)

const orgName = computed(() => (props.model ? ORG_NAMES[props.model.org] || props.model.org : ''))
const logos = computed(() => (props.model ? orgLogos(props.model.org) : []))
const catLabel = computed(() => (props.model ? CATEGORIES[props.model.cat]?.label : ''))
const tagLabel = (t) => TAG_LABELS[t] || t
const chatOk = computed(() => (props.model ? isChatCapable(props.model) && props.model.available : false))

function onImgErr(e) {
  e.target.style.display = 'none'
}

const radarOption = computed(() => {
  if (!props.model) return {}
  const data = radarOf(props.model)
  return {
    backgroundColor: 'transparent',
    radar: {
      indicator: data.map((d) => ({ name: d.name, max: 5 })),
      radius: '68%',
      center: ['50%', '52%'],
      axisName: { color: '#8fa890', fontSize: 12, fontFamily: 'Noto Serif SC, serif' },
      splitLine: { lineStyle: { color: 'rgba(118, 185, 0,0.14)' } },
      splitArea: { areaStyle: { color: ['rgba(118, 185, 0,0.02)', 'rgba(118, 185, 0,0.05)'] } },
      axisLine: { lineStyle: { color: 'rgba(118, 185, 0,0.2)' } }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data.map((d) => d.value),
            name: props.model.name,
            areaStyle: { color: 'rgba(118, 185, 0,0.22)' },
            lineStyle: { color: '#76b900', width: 2 },
            itemStyle: { color: '#9ddc1f' },
            symbolSize: 5
          }
        ],
        animationDuration: 900,
        animationEasing: 'cubicOut'
      }
    ]
  }
})

function copyId() {
  navigator.clipboard?.writeText(props.model.id)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

function onClose() {
  playClick()
  emit('close')
}

function goPlayground() {
  playClick()
  emit('close')
  router.push({ path: '/playground', query: { model: props.model.id } })
}

function onKey(e) { if (e.key === 'Escape') emit('close') }
watch(
  () => props.model,
  (v) => {
    if (v) { document.body.style.overflow = 'hidden'; window.addEventListener('keydown', onKey) }
    else { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }
)
onBeforeUnmount(() => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) })
</script>

<style scoped>
.mask {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(4, 8, 5, 0.72);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.modal {
  width: min(920px, 100%);
  max-height: 88vh;
  overflow: auto;
  padding: 44px 44px 38px;
  position: relative;
  background: rgba(8, 15, 10, 0.92);
  box-shadow: var(--shadow-lg);
}
.close {
  position: absolute;
  top: 14px; right: 18px;
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-2);
  font-size: 20px;
  line-height: 1;
  transition: all 0.3s;
}
.close:hover { color: var(--nv-2); border-color: var(--nv); transform: rotate(90deg); }

.modal-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; }

.m-hero { display: flex; align-items: center; gap: 18px; }

/* 厂商 Logo 容器 */
.m-hero-logo {
  flex-shrink: 0;
  width: 64px; height: 64px;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  padding: 6px;
}
/* 双 logo 并排 */
.m-hero-logo.dual { gap: 3px; padding: 8px; }
.m-hero-logo.dual .m-hero-logo-img { width: 50%; height: 100%; object-fit: contain; }
.m-hero-logo-img { width: 100%; height: 100%; object-fit: contain; }
.m-hero-fallback { font-size: 30px; font-weight: 700; color: var(--nv); }

.m-hero .eyebrow { display: block; }
.m-title { font-size: 34px; font-weight: 700; margin-top: 4px; }
.m-id {
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-3);
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  align-items: center;
}
.m-id:hover { color: var(--nv-2); }
.copy { font-size: 10px; color: var(--nv); opacity: 0.8; }
.m-desc { margin-top: 16px; color: var(--text-2); font-size: 14.5px; }

.m-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }

.m-meta { display: flex; gap: 36px; margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--line); }
.meta-v { font-size: 24px; font-weight: 600; color: var(--nv-2); }
.meta-k { font-size: 10px; letter-spacing: 0.3em; color: var(--text-3); margin-top: 4px; }

.m-actions { display: flex; gap: 14px; margin-top: 30px; }

.radar-box { text-align: center; }
.radar-title { font-size: 10px; letter-spacing: 0.4em; color: var(--text-3); margin-bottom: 8px; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.35s var(--ease-out); }
.modal-enter-active .modal { transition: transform 0.35s var(--ease-out), opacity 0.35s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal { transform: translateY(26px) scale(0.985); opacity: 0; }

@media (max-width: 820px) {
  .modal-grid { grid-template-columns: 1fr; }
  .modal { padding: 30px 22px; }
}
</style>
