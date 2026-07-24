<template>
  <div class="models-page">
    <!-- Header -->
    <section class="page-head">
      <ParticleField :density="0.4" :opacity="0.4" :ripples="false" />
      <div class="container head-inner">
        <span class="eyebrow" v-reveal>MODEL CATALOG</span>
        <h1 class="display head-title" v-reveal="60">模型广场</h1>
        <p class="head-sub" v-reveal="120">
          {{ MODELS.length }} 个模型 · {{ orgCount }} 家厂商 · 按能力筛选，一键体验
        </p>
      </div>
    </section>

    <!-- Charts -->
    <section class="charts-section container">
      <div class="charts-grid">
        <div class="chart-box panel" v-reveal>
          <div class="chart-title mono">按类别分布</div>
          <VChart :option="catChartOption" height="280px" />
        </div>
        <div class="chart-box panel" v-reveal="80">
          <div class="chart-title mono">按厂商分布</div>
          <VChart :option="orgChartOption" height="280px" />
        </div>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="filter-section" :class="{ stuck: filterStuck }">
      <div class="container filter-inner">
        <div class="search-wrap">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" />
            <path d="m11 11 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          <input
            v-model="search"
            class="search-input"
            type="text"
            placeholder="搜索模型名称、ID 或厂商…"
          />
          <button v-if="search" class="search-clear" @click="search = ''; playClick()">×</button>
        </div>

        <div class="filter-chips">
          <button
            v-for="f in FILTERS"
            :key="f.key"
            class="chip"
            :class="{ active: activeFilter === f.key }"
            @click="onFilterClick(f.key)"
          >
            {{ f.label }}
            <span class="chip-count">{{ countByFilter(f.key) }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="results-section container">
      <div class="results-meta">
        <span class="mono results-count">{{ filtered.length }} 个结果</span>
        <div class="sort-wrap">
          <button class="sort-btn" @click="cycleSort">
            {{ sortLabel }}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="m3 4.5 3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <transition-group name="grid" tag="div" class="model-grid">
        <ModelCard
          v-for="model in filtered"
          :key="model.id"
          :model="model"
          @open="selected = $event"
        />
      </transition-group>

      <div v-if="filtered.length === 0" class="empty">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1">
            <circle cx="22" cy="22" r="14" />
            <path d="m33 33 10 10" stroke-linecap="round" />
          </svg>
        </div>
        <p class="empty-text">没有找到匹配的模型</p>
        <button class="btn btn-sm" @click="resetFilters">重置筛选</button>
      </div>
    </section>

    <ModelModal :model="selected" @close="selected = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import ParticleField from '@/components/ParticleField.vue'
import ModelCard from '@/components/ModelCard.vue'
import ModelModal from '@/components/ModelModal.vue'
import VChart from '@/components/VChart.vue'
import { MODELS, FILTERS, CATEGORIES, ORG_NAMES, matchFilter } from '@/data/models'
import { playClick } from '@/utils/sound'

const route = useRoute()
const selected = ref(null)
const search = ref('')
const activeFilter = ref('all')
const sortIdx = ref(0)
const filterStuck = ref(false)

const sorts = [
  { label: '默认排序', fn: (a, b) => 0 },
  { label: '参数量 ↓', fn: (a, b) => paramNum(b.params) - paramNum(a.params) },
  { label: '上下文 ↓', fn: (a, b) => ctxNum(b.ctx) - ctxNum(a.ctx) },
  { label: '名称 A-Z', fn: (a, b) => a.name.localeCompare(b.name) }
]
const sortLabel = computed(() => sorts[sortIdx.value].label)

function paramNum(p) {
  if (!p || p === '—') return 0
  return parseFloat(p) || 0
}
function ctxNum(c) {
  if (!c || c === '—') return 0
  if (c.endsWith('M')) return parseFloat(c) * 1024
  return parseFloat(c) || 0
}

function onFilterClick(key) {
  playClick()
  activeFilter.value = key
}

function cycleSort() {
  playClick()
  sortIdx.value = (sortIdx.value + 1) % sorts.length
}

const orgCount = new Set(MODELS.map((m) => m.org)).size

const filtered = computed(() => {
  let list = MODELS.filter((m) => matchFilter(m, activeFilter.value))
  if (search.value.trim()) {
    const q = search.value.toLowerCase().trim()
    list = list.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        (ORG_NAMES[m.org] || m.org).toLowerCase().includes(q) ||
        m.desc.toLowerCase().includes(q)
    )
  }
  return [...list].sort(sorts[sortIdx.value].fn)
})

function countByFilter(key) {
  return MODELS.filter((m) => matchFilter(m, key)).length
}

function resetFilters() {
  playClick()
  search.value = ''
  activeFilter.value = 'all'
}

// ===== Charts =====
// 绿色系多色调色板(从亮到深)
const GREEN_PALETTE = [
  ['#9ddc1f', 'rgba(157,220,31,0.45)'],
  ['#76b900', 'rgba(118,185,0,0.4)'],
  ['#b8e050', 'rgba(184,224,80,0.4)'],
  ['#5faf2f', 'rgba(95,175,47,0.4)'],
  ['#8fcf2a', 'rgba(143,207,42,0.4)'],
  ['#4a7a00', 'rgba(74,122,0,0.45)'],
  ['#a8d960', 'rgba(168,217,96,0.4)'],
  ['#6ba515', 'rgba(107,165,21,0.4)'],
  ['#3d6b00', 'rgba(61,107,0,0.5)'],
  ['#5a9e15', 'rgba(90,158,21,0.4)']
]

const catChartOption = computed(() => {
  const counts = {}
  for (const m of MODELS) {
    const label = CATEGORIES[m.cat]?.label || '其他'
    counts[label] = (counts[label] || 0) + 1
  }
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(8,15,10,0.92)',
      borderColor: 'rgba(118, 185, 0,0.3)',
      textStyle: { color: '#e8f0e4', fontSize: 12 }
    },
    series: [
      {
        type: 'pie',
        radius: ['48%', '72%'],
        center: ['50%', '52%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: '#050a06',
          borderWidth: 2
        },
        label: {
          color: '#8fa890',
          fontSize: 11,
          fontFamily: 'Inter, sans-serif'
        },
        labelLine: { lineStyle: { color: 'rgba(118, 185, 0,0.2)' } },
        data: entries.map(([name, value], idx) => {
          const [bright, deep] = GREEN_PALETTE[idx % GREEN_PALETTE.length]
          return {
            name,
            value,
            itemStyle: {
              color: {
                type: 'radial',
                x: 0.5, y: 0.5, r: 0.8,
                colorStops: [
                  { offset: 0, color: bright },
                  { offset: 1, color: deep }
                ]
              }
            }
          }
        }),
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      }
    ]
  }
})

const orgChartOption = computed(() => {
  const counts = {}
  for (const m of MODELS) {
    counts[m.org] = (counts[m.org] || 0) + 1
  }
  const entries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
  const labels = entries.map((e) => ORG_NAMES[e[0]] || e[0])
  const values = entries.map((e) => e[1])
  return {
    backgroundColor: 'transparent',
    grid: { left: 100, right: 30, top: 10, bottom: 10 },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(8,15,10,0.92)',
      borderColor: 'rgba(118, 185, 0,0.3)',
      textStyle: { color: '#e8f0e4', fontSize: 12 }
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#5a6e5c', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(118, 185, 0,0.06)' } }
    },
    yAxis: {
      type: 'category',
      data: labels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#8fa890', fontSize: 11, fontFamily: 'Inter, sans-serif' }
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: 12,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(74,122,0,0.5)' },
              { offset: 1, color: 'rgba(157,220,31,0.9)' }
            ]
          }
        },
        animationDuration: 900,
        animationDelay: (idx) => idx * 60
      }
    ]
  }
})

// ===== Sticky filter detection =====
function onScroll() {
  const el = document.querySelector('.filter-section')
  if (!el) return
  const rect = el.getBoundingClientRect()
  filterStuck.value = rect.top <= 68
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  if (route.query.filter) activeFilter.value = route.query.filter
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ===== Page Head ===== */
.page-head {
  position: relative;
  padding: 120px 0 60px;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}
.head-inner { position: relative; z-index: 2; text-align: center; }
.head-title { font-size: clamp(40px, 7vw, 72px); margin-top: 18px; }
.head-sub { margin-top: 14px; color: var(--text-2); font-size: 15px; }

/* ===== Charts ===== */
.charts-section { padding: 48px 0 40px; }
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 20px;
}
.chart-box { padding: 24px 24px 16px; }
.chart-title {
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--text-3);
  margin-bottom: 8px;
}

/* ===== Filter Bar ===== */
.filter-section {
  position: sticky;
  top: 68px;
  z-index: 50;
  background: rgba(5, 10, 6, 0.85);
  backdrop-filter: blur(16px);
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, background 0.3s;
}
.filter-section.stuck {
  border-top-color: var(--line);
  border-bottom-color: var(--line);
}
.filter-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 0;
}
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 16px;
  color: var(--text-3);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 12px 44px 12px 44px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text);
  font-size: 14px;
  transition: border-color 0.3s;
  outline: none;
}
.search-input::placeholder { color: var(--text-3); }
.search-input:focus { border-color: var(--gold); }
.search-clear {
  position: absolute;
  right: 14px;
  width: 22px; height: 22px;
  border-radius: 50%;
  border: none;
  background: var(--panel-2);
  color: var(--text-2);
  font-size: 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip-count {
  font-size: 10px;
  opacity: 0.6;
  margin-left: 4px;
}

/* ===== Results ===== */
.results-section { padding: 32px 0 80px; }
.results-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.results-count { font-size: 12px; color: var(--text-3); letter-spacing: 0.2em; }
.sort-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-2);
  font-size: 12.5px;
  transition: all 0.3s;
}
.sort-btn:hover { border-color: var(--line-strong); color: var(--gold-2); }

.model-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Grid transitions */
.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition: all 0.5s var(--ease-out);
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
.grid-leave-active { position: absolute; }

/* ===== Empty ===== */
.empty {
  text-align: center;
  padding: 80px 0;
  color: var(--text-3);
}
.empty-icon { color: var(--gold-deep); margin-bottom: 16px; }
.empty-text { font-size: 15px; margin-bottom: 20px; }

@media (max-width: 860px) {
  .charts-grid { grid-template-columns: 1fr; }
}
</style>
