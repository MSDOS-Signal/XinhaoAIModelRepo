<template>
  <div class="home">
    <!-- ========== HERO ========== -->
    <section class="hero">
      <ParticleField :density="1.15" />
      <div class="hero-aurora"></div>

      <div class="hero-content container">
        <span class="eyebrow" v-reveal>NVIDIA NIM · 全量模型聚合平台</span>

        <h1 class="hero-title display" v-reveal="80">
          <span class="line">星之所向</span>
          <span class="line gold-grad">万模来潮</span>
        </h1>

        <p class="hero-sub" v-reveal="180">
          一个密钥，直达 NVIDIA NIM 全部 {{ totalModels }} 个全球顶尖 AI 模型。
          对话、视觉、代码、推理、嵌入、安全——全能力，一站式。
        </p>

        <div class="hero-cta" v-reveal="280">
          <router-link to="/playground" class="btn btn-solid" @click="playClick">
            立即体验
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </router-link>
          <router-link to="/models" class="btn" @click="playClick">浏览模型</router-link>
        </div>

        <div class="hero-marquee" v-reveal="380">
          <div class="marquee-track">
            <span v-for="o in orgList" :key="o" class="marquee-item mono">{{ o }}</span>
            <span v-for="o in orgList" :key="o + '2'" class="marquee-item mono">{{ o }}</span>
          </div>
        </div>
      </div>

      <div class="scroll-hint">
        <span class="mono">SCROLL</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- ========== STATS ========== -->
    <section class="stats-section">
      <div class="container stats-grid">
        <div class="stat" v-for="(s, i) in stats" :key="s.label" v-reveal="i * 90">
          <div class="stat-num serif">
            <span class="counter" ref="counterRefs">{{ s.prefix || '' }}</span>
          </div>
          <div class="stat-label mono">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- ========== FEATURED ========== -->
    <section class="featured container">
      <div class="sec-head">
        <span class="eyebrow" v-reveal>精选模型</span>
        <h2 class="section-title" v-reveal="60">当下最强，触手可及</h2>
        <p class="section-sub" v-reveal="120">来自全球顶尖实验室的旗舰模型，已就绪等你调用。</p>
      </div>

      <div class="feat-grid">
        <ModelCard
          v-for="(model, i) in hotModels"
          :key="model.id"
          :model="model"
          v-reveal="i * 70"
          @open="selected = $event"
        />
      </div>
    </section>

    <!-- ========== CAPABILITIES ========== -->
    <section class="caps-section">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow" v-reveal>全栈能力</span>
          <h2 class="section-title" v-reveal="60">一个平台，覆盖全部场景</h2>
          <p class="section-sub" v-reveal="120">从文本对话到视觉理解，从代码生成到安全审核——按需取用。</p>
        </div>

        <div class="caps-grid">
          <div
            v-for="(cap, i) in capabilities"
            :key="cap.key"
            class="cap-card"
            v-reveal="i * 60"
            @mousemove="capTilt($event, i)"
            @mouseleave="capUntilTilt(i)"
          >
            <div class="cap-glow" :ref="el => capGlow[i] = el"></div>
            <div class="cap-icon" v-html="cap.icon"></div>
            <h3 class="serif cap-title">{{ cap.title }}</h3>
            <p class="cap-desc">{{ cap.desc }}</p>
            <div class="cap-foot">
              <span class="mono cap-count">{{ cap.count }} 个模型</span>
              <router-link to="/models" class="cap-link" @click="playClick">探索 →</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== ARCHITECTURE ========== -->
    <section class="arch-section container">
      <div class="sec-head">
        <span class="eyebrow" v-reveal>技术架构</span>
        <h2 class="section-title" v-reveal="60">极简链路，极致性能</h2>
      </div>

      <div class="arch-flow" v-reveal="100">
        <div class="arch-node">
          <div class="arch-num mono">01</div>
          <div class="arch-body">
            <h4 class="serif">统一入口</h4>
            <p>OpenAI 兼容接口，一行 base_url 切换即可接入全部模型。</p>
          </div>
        </div>
        <div class="arch-arrow">→</div>
        <div class="arch-node">
          <div class="arch-num mono">02</div>
          <div class="arch-body">
            <h4 class="serif">NVIDIA NIM</h4>
            <p>GPU 加速推理，TRT-LLM 优化，毫秒级首 token 延迟。</p>
          </div>
        </div>
        <div class="arch-arrow">→</div>
        <div class="arch-node">
          <div class="arch-num mono">03</div>
          <div class="arch-body">
            <h4 class="serif">流式输出</h4>
            <p>SSE Server-Sent Events 实时流式，逐字生成所见即所得。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA ========== -->
    <section class="cta-section container">
      <div class="cta-box" v-reveal>
        <ParticleField :density="0.5" :opacity="0.5" :ripples="true" />
        <div class="cta-inner">
          <h2 class="serif cta-title">准备好开始了吗？</h2>
          <p class="cta-sub">无需注册，选择模型即可对话。多模态内容生成，一步到位。</p>
          <router-link to="/playground" class="btn btn-solid cta-btn" @click="playClick">
            进入在线体验
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <ModelModal :model="selected" @close="selected = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import ParticleField from '@/components/ParticleField.vue'
import ModelCard from '@/components/ModelCard.vue'
import ModelModal from '@/components/ModelModal.vue'
import { MODELS, HOT_MODELS, CATEGORIES, ORG_NAMES } from '@/data/models'
import { playClick } from '@/utils/sound'

const selected = ref(null)
const counterRefs = ref([])
const capGlow = ref([])

const totalModels = MODELS.length
const hotModels = HOT_MODELS

const orgList = computed(() => {
  const orgs = [...new Set(MODELS.map((m) => ORG_NAMES[m.org] || m.org))]
  return orgs
})

const stats = computed(() => [
  { label: '模型总数', target: MODELS.length, prefix: '' },
  { label: '模型厂商', target: new Set(MODELS.map((m) => m.org)).size, prefix: '' },
  { label: '能力类别', target: Object.keys(CATEGORIES).length, prefix: '' },
  { label: '最大上下文', target: 1, prefix: '1M' }
])

const capabilities = computed(() => {
  const counts = {}
  for (const m of MODELS) {
    counts[m.cat] = (counts[m.cat] || 0) + 1
  }
  const icons = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z"/></svg>',
    vision: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/></svg>',
    embed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h8M8 18h8M6 8v8M18 8v8"/></svg>',
    safety: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg>',
    translate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5h7M9 3v2c0 4-2 7-5 8M5 9c0 3 3 5 6 6M12 20l4-9 4 9M14 17h4"/></svg>',
    reward: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="5"/><path d="m8.5 12.5-1.5 9 5-3 5 3-1.5-9"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>',
    other: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/></svg>'
  }
  return [
    { key: 'chat', title: '对话生成', desc: '通用语言理解与创意写作，中英多语自如切换。', count: counts.chat || 0, icon: icons.chat },
    { key: 'vision', title: '视觉理解', desc: '图像识别、图表解析、文档 OCR、视频理解一网打尽。', count: counts.vision || 0, icon: icons.vision },
    { key: 'code', title: '代码工程', desc: '代码补全、调试、仓库级理解，支持 600+ 编程语言。', count: counts.code || 0, icon: icons.code },
    { key: 'embed', title: '嵌入检索', desc: '高维向量编码，RAG 检索增强生成的底层基石。', count: counts.embed || 0, icon: icons.embed },
    { key: 'safety', title: '安全可信', desc: '内容审核、话题控制、PII 脱敏、合成检测全链路。', count: counts.safety || 0, icon: icons.safety },
    { key: 'translate', title: '机器翻译', desc: '32 种语言实时互译，低资源语言也能精准覆盖。', count: counts.translate || 0, icon: icons.translate }
  ]
})

function animateCounters() {
  counterRefs.value.forEach((el, i) => {
    if (!el || !stats.value[i]) return
    const target = stats.value[i].target
    const prefix = stats.value[i].prefix || ''
    if (prefix) {
      el.textContent = prefix
      return
    }
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      delay: i * 0.15,
      onUpdate() {
        el.textContent = Math.floor(obj.val)
      }
    })
  })
}

function capTilt(e, i) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  el.style.transform = `perspective(800px) rotateY(${(px - 0.5) * 6}deg) rotateX(${(0.5 - py) * 6}deg) translateY(-3px)`
  if (capGlow.value[i]) {
    capGlow.value[i].style.opacity = '1'
    capGlow.value[i].style.background = `radial-gradient(300px circle at ${px * 100}% ${py * 100}%, rgba(118, 185, 0,0.08), transparent 70%)`
  }
}
function capUntilTilt(i) {
  const els = document.querySelectorAll('.cap-card')
  if (els[i]) els[i].style.transform = ''
  if (capGlow.value[i]) capGlow.value[i].style.opacity = '0'
}

onMounted(() => {
  nextTick(() => {
    setTimeout(animateCounters, 400)
  })
})
</script>

<style scoped>
/* ===== HERO ===== */
.hero {
  position: relative;
  min-height: calc(100svh - 68px);
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: 68px;
}
.hero-aurora {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(118, 185, 0, 0.08), transparent 70%),
    radial-gradient(ellipse 40% 40% at 80% 80%, rgba(143, 184, 217, 0.05), transparent 70%);
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 60px 0;
}
.hero-title {
  font-size: clamp(48px, 9vw, 104px);
  font-weight: 700;
  line-height: 1.1;
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.hero-title .line {
  display: block;
}
.gold-grad {
  background: linear-gradient(135deg, #76b900 0%, #9ddc1f 40%, #76b900 70%, #4a7a00 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.08em;
}
.hero-sub {
  margin: 28px auto 0;
  max-width: 580px;
  font-size: 16px;
  color: var(--text-2);
  line-height: 1.8;
}
.hero-cta {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 38px;
}
.hero-marquee {
  margin-top: 64px;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent);
}
.marquee-track {
  display: flex;
  gap: 48px;
  width: max-content;
  animation: marquee 38s linear infinite;
}
.marquee-item {
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--text-3);
  white-space: nowrap;
  text-transform: uppercase;
}
.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
}
.scroll-hint .mono { font-size: 9px; letter-spacing: 0.4em; color: var(--text-3); }
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, var(--gold), transparent);
  animation: scrollPulse 2s var(--ease-out) infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); }
}

/* ===== STATS ===== */
.stats-section {
  padding: 64px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--bg-2);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.stat { text-align: center; }
.stat-num {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 700;
  color: var(--gold-2);
  line-height: 1;
}
.stat-label {
  margin-top: 10px;
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--text-3);
}

/* ===== SECTION HEAD ===== */
.sec-head { margin-bottom: 44px; }

/* ===== FEATURED ===== */
.featured { padding: 100px 0 80px; }
.feat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* ===== CAPABILITIES ===== */
.caps-section { padding: 80px 0; background: var(--bg-2); }
.caps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.cap-card {
  position: relative;
  padding: 32px 28px 26px;
  border-radius: var(--radius);
  background: var(--panel);
  border: 1px solid var(--line);
  overflow: hidden;
  transition: transform 0.4s var(--ease-out), border-color 0.4s;
  will-change: transform;
}
.cap-card:hover { border-color: var(--line-strong); }
.cap-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.cap-icon {
  width: 42px;
  height: 42px;
  color: var(--gold);
  margin-bottom: 18px;
}
.cap-icon svg { width: 100%; height: 100%; }
.cap-title { font-size: 20px; font-weight: 600; }
.cap-desc { margin-top: 10px; font-size: 13.5px; color: var(--text-2); line-height: 1.7; }
.cap-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.cap-count { font-size: 11px; color: var(--text-3); letter-spacing: 0.12em; }
.cap-link { font-size: 12px; color: var(--gold); opacity: 0; transform: translateX(-6px); transition: all 0.35s var(--ease-out); }
.cap-card:hover .cap-link { opacity: 1; transform: translateX(0); }

/* ===== ARCHITECTURE ===== */
.arch-section { padding: 90px 0; }
.arch-flow {
  display: flex;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
}
.arch-node {
  flex: 1;
  min-width: 220px;
  padding: 30px 28px;
  border-radius: var(--radius);
  background: var(--panel);
  border: 1px solid var(--line);
}
.arch-num { font-size: 11px; color: var(--gold); letter-spacing: 0.3em; margin-bottom: 14px; }
.arch-body h4 { font-size: 20px; font-weight: 600; }
.arch-body p { margin-top: 8px; font-size: 13.5px; color: var(--text-2); }
.arch-arrow {
  display: flex;
  align-items: center;
  font-size: 22px;
  color: var(--gold-deep);
}

/* ===== CTA ===== */
.cta-section { padding: 60px 0 100px; }
.cta-box {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  background: linear-gradient(135deg, rgba(118, 185, 0, 0.04), rgba(5, 10, 6, 0.6));
  padding: 80px 40px;
  text-align: center;
}
.cta-inner { position: relative; z-index: 2; }
.cta-title { font-size: clamp(28px, 5vw, 44px); font-weight: 700; }
.cta-sub { margin-top: 14px; color: var(--text-2); font-size: 15px; }
.cta-btn { margin-top: 32px; }

@media (max-width: 860px) {
  .caps-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 36px; }
}
@media (max-width: 520px) {
  .caps-grid { grid-template-columns: 1fr; }
  .hero-cta { flex-direction: column; align-items: center; }
  .arch-arrow { transform: rotate(90deg); }
}
</style>
