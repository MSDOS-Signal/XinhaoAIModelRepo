<template>
  <div class="playground">
    <!-- ===== Sidebar ===== -->
    <aside class="pg-sidebar" :class="{ open: sidebarOpen }">
      <div class="sb-header">
        <span class="eyebrow">CONFIG</span>
        <button class="sb-close" @click="sidebarOpen = false; playClick()" v-if="sidebarOpen">×</button>
      </div>

      <!-- Model Selector -->
      <div class="sb-block">
        <label class="sb-label mono">模型</label>
        <div class="model-dropdown" :class="{ open: dropdownOpen }">
          <button class="dropdown-trigger" @click="toggleDropdown">
            <span class="dt-avatar" :class="{ dual: currentLogos.length > 1 }">
              <img
                v-for="(src, i) in currentLogos"
                :key="i"
                :src="src"
                :alt="currentModel?.name"
                class="dt-avatar-img"
                @error="onImgErr"
              />
              <span v-if="currentLogos.length === 0" class="dt-avatar-fallback serif">{{ (currentModel?.name || '?').charAt(0) }}</span>
            </span>
            <span class="dt-name serif" :title="currentModel?.name">{{ currentModel?.name || '选择模型' }}</span>
            <span class="dt-org mono">{{ currentModel ? (ORG_NAMES[currentModel.org] || currentModel.org) : '' }}</span>
            <svg class="dt-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="m3 5 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
          <transition name="dd">
            <div v-if="dropdownOpen" class="dropdown-panel">
              <div class="dd-search-wrap">
                <input v-model="ddSearch" class="dd-search" placeholder="搜索模型…" />
              </div>
              <div class="dd-list">
                <button
                  v-for="model in ddFiltered"
                  :key="model.id"
                  class="dd-item"
                  :class="{ active: model.id === currentModelId }"
                  @click="selectModel(model.id)"
                >
                  <span class="dd-avatar" :class="{ dual: orgLogos(model.org).length > 1 }">
                    <img
                      v-for="(src, i) in orgLogos(model.org)"
                      :key="i"
                      :src="src"
                      :alt="model.name"
                      class="dd-avatar-img"
                      @error="onImgErr"
                    />
                    <span v-if="orgLogos(model.org).length === 0" class="dd-avatar-fallback serif">{{ model.name.charAt(0) }}</span>
                  </span>
                  <span class="dd-item-name" :title="model.name">{{ model.name }}</span>
                  <span class="dd-item-org mono">{{ ORG_NAMES[model.org] || model.org }}</span>
                  <div class="dd-item-tags">
                    <span v-if="model.hot" class="dd-badge hot">HOT</span>
                    <span v-if="model.fresh" class="dd-badge fresh">NEW</span>
                    <span v-if="isVision(model)" class="dd-badge vision">视觉</span>
                  </div>
                </button>
                <p v-if="ddFiltered.length === 0" class="dd-empty">无匹配模型</p>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- System Prompt -->
      <div class="sb-block">
        <label class="sb-label mono">系统提示词</label>
        <textarea
          v-model="systemPrompt"
          class="sb-textarea"
          rows="3"
          placeholder="您可以在这里设置系统提示词，这里的文字会引导 AI 的角色定位与回答风格（部分模型可能不支持系统提示词）"
        ></textarea>
      </div>

      <!-- Parameters -->
      <div class="sb-block">
        <label class="sb-label mono">参数调节</label>

        <div class="param">
          <div class="param-head">
            <span>Temperature</span>
            <span class="mono param-val">{{ temperature.toFixed(2) }}</span>
          </div>
          <input type="range" v-model.number="temperature" min="0" max="2" step="0.05" class="slider" />
        </div>

        <div class="param">
          <div class="param-head">
            <span>Top P</span>
            <span class="mono param-val">{{ topP.toFixed(2) }}</span>
          </div>
          <input type="range" v-model.number="topP" min="0" max="1" step="0.05" class="slider" />
        </div>

        <div class="param">
          <div class="param-head">
            <span>Max Tokens</span>
            <span class="mono param-val">{{ maxTokens }}</span>
          </div>
          <input type="range" v-model.number="maxTokens" min="256" max="8192" step="256" class="slider" />
        </div>
      </div>

      <!-- Actions -->
      <div class="sb-actions">
        <button class="btn btn-sm sb-btn" @click="clearChat">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 3.5h9M5 6.5h5M7 9.5h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
          </svg>
          清空对话
        </button>
      </div>

      <!-- Model Info -->
      <div v-if="currentModel" class="sb-model-info">
        <div class="mi-head">
          <span class="mi-avatar" :class="{ dual: currentLogos.length > 1 }">
            <img
              v-for="(src, i) in currentLogos"
              :key="i"
              :src="src"
              :alt="currentModel.name"
              class="mi-avatar-img"
              @error="onImgErr"
            />
            <span v-if="currentLogos.length === 0" class="mi-avatar-fallback serif">{{ currentModel.name.charAt(0) }}</span>
          </span>
          <div class="mi-tags">
            <span class="tag tag-gold">{{ CATEGORIES[currentModel.cat]?.label }}</span>
            <span v-for="t in currentModel.tags" :key="t" class="tag">{{ TAG_LABELS[t] || t }}</span>
          </div>
        </div>
        <p class="mi-desc">{{ currentModel.desc }}</p>
        <div class="mi-meta mono">
          <span v-if="currentModel.params !== '—'">{{ currentModel.params }}</span>
          <span v-if="currentModel.ctx !== '—'">{{ currentModel.ctx }} 上下文</span>
        </div>
      </div>
    </aside>

    <!-- ===== Main Chat ===== -->
    <main class="pg-main">
      <!-- Top bar -->
      <div class="pg-topbar">
        <button class="menu-toggle" @click="sidebarOpen = true; playClick()">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
        <div class="pg-topinfo">
          <span class="serif pg-topname">{{ currentModel?.name || '未选择模型' }}</span>
          <span v-if="streaming" class="pg-status">
            <span class="dot-pulse"></span> 生成中…
          </span>
        </div>
      </div>

      <!-- Messages -->
      <div class="pg-messages" ref="msgContainer">
        <div v-if="messages.length === 0" class="pg-welcome">
          <div class="welcome-orb">
            <div class="orb-ring"></div>
            <div class="orb-ring r2"></div>
            <div class="orb-core"></div>
          </div>
          <h2 class="serif welcome-title">开始对话</h2>
          <p class="welcome-sub">选择模型，输入消息，或上传图片让 AI 帮你理解。</p>
          <div class="welcome-suggestions">
            <button v-for="s in suggestions" :key="s" class="suggestion-chip" @click="quickSend(s)">
              {{ s }}
            </button>
          </div>
        </div>

        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="msg"
          :class="msg.role"
        >
          <div class="msg-avatar">
            <span v-if="msg.role === 'user'" class="avatar-user">你</span>
            <template v-else>
              <span class="avatar-ai-wrap" :class="{ dual: currentLogos.length > 1 }">
                <img
                  v-for="(src, i) in currentLogos"
                  :key="i"
                  :src="src"
                  :alt="currentModel?.name"
                  class="avatar-img"
                  @error="onImgErr"
                />
                <span v-if="currentLogos.length === 0" class="avatar-ai serif">{{ (currentModel?.name || '星').charAt(0) }}</span>
              </span>
            </template>
          </div>
          <div class="msg-body">
            <div class="msg-role mono">{{ msg.role === 'user' ? 'USER' : 'XINHAO AI' }}</div>
            <div v-if="msg.images?.length" class="msg-images">
              <img v-for="(img, idx) in msg.images" :key="idx" :src="img" class="msg-img" />
            </div>
            <!-- 等待首个 token 时,在 assistant 消息内部显示 typing 动画 -->
            <div v-if="msg.role === 'assistant' && !msg.content && streaming" class="typing">
              <span></span><span></span><span></span>
            </div>
            <div v-else-if="msg.role === 'assistant'" class="msg-content" v-html="renderMarkdown(msg.content)"></div>
            <div v-else class="msg-content user-content">{{ msg.content }}</div>
            <div v-if="msg.error" class="msg-error">{{ msg.error }}</div>
            <div v-if="msg.role === 'assistant' && msg.content && !streaming" class="msg-actions">
              <button class="msg-action" @click="copyText(msg.content)">复制</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="pg-input-area">
        <div v-if="images.length" class="img-previews">
          <div v-for="(img, i) in images" :key="i" class="img-preview">
            <img :src="img" />
            <button class="img-remove" @click="removeImage(i)">×</button>
          </div>
        </div>

        <div class="input-row">
          <button
            v-if="canVision"
            class="input-btn"
            @click="$refs.fileInput.click()"
            :title="'上传图片'"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 6.5 9 11.5l-3-3L2 12.5M2 2h14v14H2V2Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
              <circle cx="12" cy="5.5" r="1.3" fill="currentColor" />
            </svg>
          </button>
          <input ref="fileInput" type="file" accept="image/*" multiple hidden @change="onFileSelect" />

          <textarea
            v-model="input"
            class="pg-input"
            :placeholder="inputPlaceholder"
            rows="1"
            @keydown.enter.exact.prevent="send"
            @keydown.shift.enter="() => {}"
            @input="autoResize"
            ref="inputEl"
          ></textarea>

          <button v-if="streaming" class="send-btn stop" @click="stopStream">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="4" y="4" width="8" height="8" rx="1.5" />
            </svg>
          </button>
          <button v-else class="send-btn" :disabled="!canSend" @click="send">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 9h12M8 4l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </main>

    <!-- Overlay for mobile sidebar -->
    <div v-if="sidebarOpen" class="pg-overlay" @click="sidebarOpen = false"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { streamChat, visionMessage } from '@/api/nvidia'
import { MODELS, TAG_LABELS, CATEGORIES, ORG_NAMES, isChatCapable, isVisionCapable, orgLogos } from '@/data/models'
import { playClick, playDing } from '@/utils/sound'

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true
})

const route = useRoute()

// ===== State =====
const currentModelId = ref('')
const systemPrompt = ref('')
const temperature = ref(0.6)
const topP = ref(0.95)
const maxTokens = ref(2048)
const messages = ref([])
const input = ref('')
const images = ref([])
const streaming = ref(false)
const waitingFirst = ref(false)
const sidebarOpen = ref(false)
const dropdownOpen = ref(false)
const ddSearch = ref('')
const msgContainer = ref(null)
const inputEl = ref(null)
const fileInput = ref(null)
let abortCtrl = null

// Chat-capable models only (must be available for this API key)
const chatModels = computed(() => MODELS.filter((m) => isChatCapable(m) && m.available))

const currentModel = computed(() => MODELS.find((m) => m.id === currentModelId.value))
const currentLogos = computed(() => (currentModel.value ? orgLogos(currentModel.value.org) : []))

const canVision = computed(() => currentModel.value && isVisionCapable(currentModel.value))
const canSend = computed(() => input.value.trim() && currentModelId.value && !streaming.value)

const inputPlaceholder = computed(() => {
  if (!currentModelId.value) return '请先选择模型…'
  if (canVision.value) return '输入消息，或上传图片让 AI 理解…'
  return '输入消息，Enter 发送…'
})

const ddFiltered = computed(() => {
  const q = ddSearch.value.toLowerCase().trim()
  let list = chatModels.value
  if (q) {
    list = list.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        (ORG_NAMES[m.org] || m.org).toLowerCase().includes(q)
    )
  }
  return list
})

const isVision = (model) => isVisionCapable(model)

const suggestions = [
  '用三句话解释量子计算',
  '写一段 Python 快速排序',
  '帮我写一首关于星空的诗',
  '对比 React 和 Vue 的优缺点'
]

// ===== Model Selection =====
function toggleDropdown() {
  playClick()
  dropdownOpen.value = !dropdownOpen.value
}

function selectModel(id) {
  playClick()
  // 如果正在流式输出,先停止
  if (abortCtrl) abortCtrl.abort()
  // 切换模型时重置对话历史
  if (currentModelId.value && currentModelId.value !== id) {
    messages.value = []
  }
  currentModelId.value = id
  dropdownOpen.value = false
  ddSearch.value = ''
}

// ===== Image Upload =====
function onFileSelect(e) {
  const files = Array.from(e.target.files)
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    const reader = new FileReader()
    reader.onload = (ev) => {
      images.value.push(ev.target.result)
    }
    reader.readAsDataURL(file)
  }
  e.target.value = ''
}

function removeImage(i) {
  playClick()
  images.value.splice(i, 1)
}

// ===== Send / Stream =====
async function send() {
  if (!canSend.value) return
  playDing()
  const text = input.value.trim()
  if (!text && images.value.length === 0) return

  // Build user message
  const userMsg = { role: 'user', content: text, images: [...images.value] }
  messages.value.push(userMsg)

  // Build API messages
  const apiMessages = []
  if (systemPrompt.value.trim()) {
    apiMessages.push({ role: 'system', content: systemPrompt.value.trim() })
  }
  for (const m of messages.value) {
    if (m.role === 'user') {
      if (canVision.value && m.images?.length) {
        apiMessages.push(visionMessage(m.content, m.images))
      } else {
        apiMessages.push({ role: 'user', content: m.content })
      }
    } else if (m.role === 'assistant' && m.content) {
      apiMessages.push({ role: 'assistant', content: m.content })
    }
  }

  // Clear input
  input.value = ''
  images.value = []
  autoResize()

  // Add assistant placeholder
  messages.value.push({ role: 'assistant', content: '' })
  const aiIdx = messages.value.length - 1

  streaming.value = true
  waitingFirst.value = true
  abortCtrl = new AbortController()

  scrollToBottom()

  try {
    const gen = streamChat({
      model: currentModelId.value,
      messages: apiMessages,
      temperature: temperature.value,
      top_p: topP.value,
      max_tokens: maxTokens.value,
      signal: abortCtrl.signal
    })

    for await (const chunk of gen) {
      if (waitingFirst.value) waitingFirst.value = false
      // 直接修改属性,避免每次创建新对象带来的 GC 压力
      messages.value[aiIdx].content += chunk
      scrollToBottom()
    }

    if (!messages.value[aiIdx].content) {
      messages.value[aiIdx] = { ...messages.value[aiIdx], content: '（模型未返回内容）' }
    }
  } catch (err) {
    const cur = messages.value[aiIdx]
    if (err.name === 'AbortError') {
      messages.value[aiIdx] = { ...cur, content: cur.content + '\n\n_[已停止生成]_' }
    } else {
      messages.value[aiIdx] = { ...cur, content: cur.content || '请求失败', error: err.message }
    }
  } finally {
    streaming.value = false
    waitingFirst.value = false
    abortCtrl = null
    scrollToBottom()
    // AI 回复完成时播放消息音效
    if (messages.value[aiIdx]?.content) playDing()
  }
}

function quickSend(text) {
  playClick()
  input.value = text
  send()
}

function stopStream() {
  playClick()
  if (abortCtrl) abortCtrl.abort()
}

function clearChat() {
  playClick()
  messages.value = []
}

// ===== UI Helpers =====
function onImgErr(e) {
  e.target.style.display = 'none'
}

function autoResize() {
  if (!inputEl.value) return
  inputEl.value.style.height = 'auto'
  inputEl.value.style.height = Math.min(inputEl.value.scrollHeight, 160) + 'px'
}

// 节流滚动:流式输出时高频调用 scroll 会导致卡顿,限制为每 80ms 最多一次
let scrollTimer = null
function scrollToBottom() {
  if (scrollTimer) return
  scrollTimer = setTimeout(() => {
    scrollTimer = null
    if (msgContainer.value) {
      msgContainer.value.scrollTop = msgContainer.value.scrollHeight
    }
  }, 80)
}

function copyText(text) {
  playClick()
  navigator.clipboard?.writeText(text)
}

// ===== Markdown Renderer (marked + 安全处理) =====
function renderMarkdown(text) {
  if (!text) return ''
  // 用 marked 解析,返回已转义的 HTML
  return marked.parse(text, { async: false })
}

// ===== Close dropdown on outside click =====
function onDocClick(e) {
  if (!e.target.closest('.model-dropdown')) dropdownOpen.value = false
}

// ===== Init =====
onMounted(() => {
  document.addEventListener('click', onDocClick)
  // 从 URL query 指定的模型优先(必须支持对话且可用)
  const queryModel = route.query.model
  if (queryModel) {
    const found = MODELS.find((m) => m.id === queryModel && isChatCapable(m) && m.available)
    if (found) {
      currentModelId.value = queryModel
      return
    }
  }
  // 回退:优先 fast → hot → 第一个可用
  if (chatModels.value.length) {
    const fast = chatModels.value.find((m) => m.tags.includes('fast'))
    const hot = chatModels.value.find((m) => m.hot)
    currentModelId.value = (fast || hot || chatModels.value[0]).id
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  if (abortCtrl) abortCtrl.abort()
})

// Scroll to bottom when messages change
watch(() => messages.value.length, scrollToBottom)
</script>

<style scoped>
.playground {
  display: flex;
  height: calc(100svh - 68px);
  margin-top: 68px;
  overflow: hidden;
}

/* ===== Sidebar ===== */
.pg-sidebar {
  width: 320px;
  flex-shrink: 0;
  border-right: 1px solid var(--line);
  background: var(--bg-2);
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.sb-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sb-close {
  display: none;
  width: 28px; height: 28px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--text-2);
  font-size: 18px;
  line-height: 1;
}
.sb-block { display: flex; flex-direction: column; gap: 10px; }
.sb-label { font-size: 10px; letter-spacing: 0.3em; color: var(--text-3); text-transform: uppercase; }
.sb-textarea {
  width: 100%;
  padding: 10px 12px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--text);
  font-size: 13px;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s;
  font-family: var(--sans);
}
.sb-textarea:focus { border-color: var(--gold); }

/* Model Dropdown */
.model-dropdown { position: relative; }
.dropdown-trigger {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--text);
  transition: border-color 0.3s;
}
.dropdown-trigger:hover { border-color: var(--line-strong); }
.dt-avatar {
  flex-shrink: 0;
  width: 28px; height: 28px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  padding: 2px;
}
.dt-avatar.dual { gap: 2px; padding: 3px; }
.dt-avatar.dual .dt-avatar-img { width: 50%; height: 100%; object-fit: contain; }
.dt-avatar-img { width: 100%; height: 100%; object-fit: contain; }
.dt-avatar-fallback { font-size: 13px; font-weight: 700; color: var(--nv); }
.dt-name { font-size: 15px; font-weight: 600; flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.dt-org { font-size: 9px; color: var(--text-3); letter-spacing: 0.15em; flex-shrink: 0; white-space: nowrap; }
.dt-arrow { color: var(--text-3); flex-shrink: 0; transition: transform 0.3s; }
.model-dropdown.open .dt-arrow { transform: rotate(180deg); }

.dropdown-panel {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  z-index: 30;
  background: rgba(13, 15, 20, 0.96);
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(16px);
}
.dd-search-wrap { padding: 10px; border-bottom: 1px solid var(--line); }
.dd-search {
  width: 100%;
  padding: 8px 12px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--text);
  font-size: 13px;
  outline: none;
}
.dd-list { max-height: 320px; overflow-y: auto; padding: 6px; }
.dd-item {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-2);
  text-align: left;
  transition: background 0.2s;
}
.dd-item:hover { background: var(--panel-2); }
.dd-item.active { background: rgba(118, 185, 0, 0.1); color: var(--gold-2); }
.dd-avatar {
  flex-shrink: 0;
  width: 24px; height: 24px;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  padding: 2px;
}
.dd-avatar.dual { gap: 1px; padding: 2px; }
.dd-avatar.dual .dd-avatar-img { width: 50%; height: 100%; object-fit: contain; }
.dd-avatar-img { width: 100%; height: 100%; object-fit: contain; }
.dd-avatar-fallback { font-size: 11px; font-weight: 700; color: var(--nv); }
.dd-item-name { font-size: 13.5px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.dd-item-org { font-size: 9px; color: var(--text-3); margin-left: auto; flex-shrink: 0; white-space: nowrap; }
.dd-item-tags { display: flex; flex-wrap: nowrap; gap: 4px; flex-shrink: 0; }
.dd-badge { font-size: 8px; padding: 1px 5px; border-radius: 3px; letter-spacing: 0.1em; font-family: var(--mono); white-space: nowrap; }
.dd-badge.hot { color: #9ddc1f; background: rgba(157, 220, 31, 0.12); }
.dd-badge.fresh { color: var(--gold-2); background: rgba(118, 185, 0, 0.1); }
.dd-badge.vision { color: #8fb8d9; background: rgba(143, 184, 217, 0.12); }
.dd-empty { padding: 16px; text-align: center; color: var(--text-3); font-size: 13px; }

/* Parameters */
.param { margin-bottom: 14px; }
.param-head {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-2);
  margin-bottom: 6px;
}
.param-val { color: var(--gold-2); }
.slider {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--panel-2);
  border-radius: 2px;
  outline: none;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--gold);
  cursor: pointer;
  border: 2px solid var(--bg);
  transition: transform 0.2s;
}
.slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
.slider::-moz-range-thumb {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--gold);
  cursor: pointer;
  border: 2px solid var(--bg);
}

.sb-actions { display: flex; gap: 8px; }
.sb-btn { flex: 1; justify-content: center; }

.sb-model-info {
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--panel);
}
.mi-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px; }
.mi-avatar {
  flex-shrink: 0;
  width: 44px; height: 44px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  padding: 4px;
}
.mi-avatar.dual { gap: 2px; padding: 5px; }
.mi-avatar.dual .mi-avatar-img { width: 50%; height: 100%; object-fit: contain; }
.mi-avatar-img { width: 100%; height: 100%; object-fit: contain; }
.mi-avatar-fallback { font-size: 20px; font-weight: 700; color: var(--nv); }
.mi-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.mi-desc { font-size: 12.5px; color: var(--text-2); line-height: 1.6; }
.mi-meta { display: flex; gap: 14px; margin-top: 10px; font-size: 10px; color: var(--text-3); }

/* ===== Main ===== */
.pg-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.pg-topbar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--line);
  background: var(--bg-2);
}
.menu-toggle {
  display: none;
  border: none;
  background: transparent;
  color: var(--text-2);
  padding: 6px;
}
.pg-topinfo { display: flex; align-items: center; gap: 12px; }
.pg-topname { font-size: 16px; font-weight: 600; }
.pg-status { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--gold); }
.dot-pulse {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--gold);
  animation: dotPulse 1.2s ease-in-out infinite;
}
@keyframes dotPulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
}

/* Messages */
.pg-messages {
  flex: 1;
  overflow-y: auto;
  padding: 32px 24px;
  scroll-behavior: smooth;
}
.pg-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  gap: 12px;
}
.welcome-orb {
  position: relative;
  width: 80px; height: 80px;
  margin-bottom: 12px;
}
.orb-ring {
  position: absolute;
  inset: 0;
  border: 1px solid var(--gold);
  border-radius: 50%;
  opacity: 0.3;
  animation: orbRing 3s var(--ease-out) infinite;
}
.orb-ring.r2 { animation-delay: 1.5s; }
.orb-core {
  position: absolute;
  inset: 30px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--gold-2), var(--gold-deep));
  animation: breathe 3s ease-in-out infinite;
}
@keyframes orbRing {
  0% { transform: scale(0.6); opacity: 0.5; }
  100% { transform: scale(1.4); opacity: 0; }
}
.welcome-title { font-size: 28px; font-weight: 600; }
.welcome-sub { color: var(--text-2); font-size: 14px; }
.welcome-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 16px;
  max-width: 520px;
}
.suggestion-chip {
  padding: 9px 18px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--text-2);
  font-size: 13px;
  transition: all 0.3s var(--ease-out);
}
.suggestion-chip:hover {
  border-color: var(--gold);
  color: var(--gold-2);
  transform: translateY(-2px);
}

/* Message items */
.msg {
  display: flex;
  gap: 14px;
  margin-bottom: 28px;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
}
.msg.user { flex-direction: row-reverse; }
.msg-avatar {
  flex-shrink: 0;
  width: 38px; height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
}
.avatar-user { font-size: 13px; color: var(--text-2); }
.avatar-ai-wrap {
  width: 100%; height: 100%;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  padding: 3px;
  background: rgba(255, 255, 255, 0.04);
}
.avatar-ai-wrap.dual { gap: 1px; padding: 4px; }
.avatar-ai-wrap.dual .avatar-img { width: 50%; height: 100%; }
.avatar-ai {
  font-size: 16px; font-weight: 700;
  color: var(--nv);
  background: radial-gradient(circle, rgba(118, 185, 0,0.15), transparent);
}
.avatar-img { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }
.msg.user .msg-avatar { border-color: var(--line-strong); }
.msg-body { min-width: 0; flex: 1; }
.msg.user .msg-body { display: flex; flex-direction: column; align-items: flex-end; }
.msg-role { font-size: 9px; letter-spacing: 0.3em; color: var(--text-3); margin-bottom: 6px; }

.msg-images { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
.msg-img { max-width: 200px; max-height: 200px; border-radius: 10px; border: 1px solid var(--line); }

.msg-content {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text);
  word-break: break-word;
}
.user-content {
  padding: 12px 16px;
  background: var(--panel-2);
  border-radius: 4px 14px 14px 14px;
  border: 1px solid var(--line);
}
.msg-error {
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(217, 124, 124, 0.1);
  border: 1px solid rgba(217, 124, 124, 0.3);
  color: var(--danger);
  font-size: 12.5px;
}
.msg-actions { margin-top: 8px; }
.msg-action {
  font-size: 11px;
  color: var(--text-3);
  border: none;
  background: transparent;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}
.msg-action:hover { color: var(--gold-2); background: var(--panel); }

/* Typing indicator */
.typing { display: flex; gap: 5px; padding: 8px 0; }
.typing span {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--gold);
  animation: typingBounce 1.3s ease-in-out infinite;
}
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* Markdown styles — marked 生成标准 HTML 元素,统一用 .msg-content 下 :deep 穿透 */
:deep(.md-pre) {
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 14px 16px;
  overflow-x: auto;
  margin: 10px 0;
}
:deep(.md-code) {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--gold-2);
}
:deep(.md-inline) {
  font-family: var(--mono);
  font-size: 0.88em;
  background: var(--panel-2);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--gold-2);
}
:deep(.md-h) { font-family: var(--serif); font-weight: 600; margin: 14px 0 8px; }
:deep(.md-h2) { font-size: 18px; }
:deep(.md-h3) { font-size: 16px; }
:deep(.md-h4) { font-size: 14px; }
:deep(.md-quote) {
  border-left: 2px solid var(--gold-deep);
  padding-left: 12px;
  margin: 8px 0;
  color: var(--text-2);
  font-style: italic;
}
:deep(.md-ul) { padding-left: 20px; margin: 8px 0; }
:deep(.md-li) { margin-bottom: 4px; list-style: disc; }
:deep(.md-ul a) { color: var(--gold-2); text-decoration: underline; }

/* ---- marked 标准元素样式 ---- */
:deep(pre) {
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 14px 16px;
  overflow-x: auto;
  margin: 10px 0;
}
:deep(pre code) {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--gold-2);
  background: none;
  padding: 0;
}
:deep(code) {
  font-family: var(--mono);
  font-size: 0.88em;
  background: var(--panel-2);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--gold-2);
}
:deep(pre code) { background: none; padding: 0; }
:deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
  font-family: var(--serif);
  font-weight: 600;
  margin: 16px 0 8px;
  color: var(--text);
}
:deep(h1) { font-size: 20px; }
:deep(h2) { font-size: 18px; }
:deep(h3) { font-size: 16px; }
:deep(h4) { font-size: 14px; }
:deep(h5) { font-size: 13px; }
:deep(h6) { font-size: 12px; color: var(--text-2); }
:deep(blockquote) {
  border-left: 3px solid var(--nv);
  padding-left: 14px;
  margin: 10px 0;
  color: var(--text-2);
  font-style: italic;
}
:deep(ul), :deep(ol) {
  padding-left: 22px;
  margin: 8px 0;
}
:deep(ul li) { margin-bottom: 4px; list-style: disc; }
:deep(ol li) { margin-bottom: 4px; list-style: decimal; }
:deep(li > ul, li > ol) { margin: 4px 0; }
:deep(a) { color: var(--nv-2); text-decoration: underline; }
:deep(strong) { font-weight: 700; color: var(--text); }
:deep(em) { font-style: italic; }
:deep(hr) {
  border: none;
  border-top: 1px solid var(--line);
  margin: 16px 0;
}
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 13px;
  display: block;
  overflow-x: auto;
}
:deep(thead) { background: var(--panel-2); }
:deep(th) {
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  color: var(--text);
  border: 1px solid var(--line);
  white-space: nowrap;
}
:deep(td) {
  padding: 8px 12px;
  border: 1px solid var(--line);
  color: var(--text-2);
  vertical-align: top;
}
:deep(tbody tr:nth-child(even)) { background: rgba(118, 185, 0, 0.03); }
:deep(tbody tr:hover) { background: rgba(118, 185, 0, 0.06); }
:deep(p) { margin: 0 0 8px; }
:deep(p:last-child) { margin-bottom: 0; }
:deep(img) { max-width: 100%; border-radius: 8px; }

/* Input Area */
.pg-input-area {
  border-top: 1px solid var(--line);
  padding: 16px 24px 20px;
  background: var(--bg-2);
}
.img-previews { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
.img-preview {
  position: relative;
  width: 64px; height: 64px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--line);
}
.img-preview img { width: 100%; height: 100%; object-fit: cover; }
.img-remove {
  position: absolute;
  top: 2px; right: 2px;
  width: 18px; height: 18px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 12px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  max-width: 860px;
  margin: 0 auto;
}
.input-btn {
  flex-shrink: 0;
  width: 42px; height: 42px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.input-btn:hover { border-color: var(--gold); color: var(--gold-2); }
.pg-input {
  flex: 1;
  padding: 11px 16px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 14px;
  color: var(--text);
  font-size: 14.5px;
  resize: none;
  outline: none;
  transition: border-color 0.3s;
  font-family: var(--sans);
  line-height: 1.6;
  max-height: 160px;
}
.pg-input:focus { border-color: var(--gold); }
.send-btn {
  flex-shrink: 0;
  width: 42px; height: 42px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--gold), var(--gold-2));
  color: var(--ink-on-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s var(--ease-out);
}
.send-btn:hover { transform: scale(1.05); box-shadow: 0 8px 24px -6px rgba(118, 185, 0, 0.4); }
.send-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: none; }
.send-btn.stop { background: var(--danger); color: #fff; }

/* Overlay */
.pg-overlay { display: none; }

/* Dropdown transition */
.dd-enter-active, .dd-leave-active { transition: all 0.25s var(--ease-out); }
.dd-enter-from, .dd-leave-to { opacity: 0; transform: translateY(-8px); }

/* ===== Mobile ===== */
@media (max-width: 860px) {
  .pg-sidebar {
    position: fixed;
    top: 68px; left: 0; bottom: 0;
    z-index: 80;
    transform: translateX(-100%);
    transition: transform 0.35s var(--ease-out);
    width: 300px;
  }
  .pg-sidebar.open { transform: translateX(0); }
  .sb-close { display: flex; align-items: center; justify-content: center; }
  .menu-toggle { display: flex; }
  .pg-overlay {
    display: block;
    position: fixed;
    inset: 68px 0 0 0;
    z-index: 70;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
  }
  .pg-messages { padding: 20px 16px; }
  .pg-input-area { padding: 12px 16px 16px; }
}
</style>
