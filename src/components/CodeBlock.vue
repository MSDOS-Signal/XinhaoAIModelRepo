<template>
  <div class="code-block">
    <div class="cb-bar">
      <div class="cb-tabs">
        <button
          v-for="(tab, i) in tabs"
          :key="i"
          class="cb-tab"
          :class="{ active: activeIdx === i }"
          @click="onTabClick(i)"
        >
          {{ tab.lang }}
        </button>
      </div>
      <button class="cb-copy" @click="copy" :title="'复制代码'">
        <svg v-if="!copied" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3" />
          <path d="M2 9V3a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="m3 7 3 3 5-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="cb-copy-text">{{ copied ? '已复制' : '复制' }}</span>
      </button>
    </div>
    <div class="cb-code-wrap">
      <pre class="cb-pre mono"><code v-html="highlighted"></code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { playClick } from '@/utils/sound'

const props = defineProps({
  tabs: { type: Array, required: true }
})

const activeIdx = ref(0)
const copied = ref(false)

const currentCode = computed(() => props.tabs[activeIdx.value]?.code || '')
const currentLang = computed(() => props.tabs[activeIdx.value]?.lang || '')

const highlighted = computed(() => {
  return highlight(currentCode.value, currentLang.value)
})

function highlight(code, lang) {
  // Escape HTML first
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  if (lang === 'JSON') {
    // JSON highlighting
    html = html.replace(/"([^"]+)":/g, '<span class="syn-key">"$1"</span>:')
    html = html.replace(/: "([^"]*)"/g, ': <span class="syn-str">"$1"</span>')
    html = html.replace(/: (\d+)/g, ': <span class="syn-num">$1</span>')
    html = html.replace(/\b(true|false|null)\b/g, '<span class="syn-bool">$1</span>')
  } else {
    // Generic code highlighting
    // Comments
    html = html.replace(/(#[^\n]*)/g, '<span class="syn-comment">$1</span>')
    html = html.replace(/(\/\/[^\n]*)/g, '<span class="syn-comment">$1</span>')
    // Strings
    html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="syn-str">$1</span>')
    html = html.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="syn-str">$1</span>')
    // Keywords
    const keywords = ['import', 'from', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'new', 'await', 'async', 'def', 'print', 'True', 'False', 'None', 'self', 'in', 'not', 'and', 'or', 'is', 'None']
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
    html = html.replace(kwRegex, '<span class="syn-kw">$1</span>')
    // Numbers
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="syn-num">$1</span>')
    // Function calls
    html = html.replace(/(\w+)\(/g, '<span class="syn-fn">$1</span>(')
  }

  return html
}

function onTabClick(i) {
  playClick()
  activeIdx.value = i
}

function copy() {
  playClick()
  navigator.clipboard?.writeText(currentCode.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 1800)
}

// Reset to first tab when tabs change
watch(() => props.tabs, () => { activeIdx.value = 0 })
</script>

<style scoped>
.code-block {
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  margin: 14px 0;
  background: var(--bg-3);
}
.cb-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 14px;
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.02);
}
.cb-tabs { display: flex; gap: 2px; }
.cb-tab {
  padding: 9px 14px;
  border: none;
  background: transparent;
  color: var(--text-3);
  font-size: 12px;
  font-family: var(--mono);
  letter-spacing: 0.05em;
  border-bottom: 2px solid transparent;
  transition: all 0.25s;
  cursor: pointer;
}
.cb-tab:hover { color: var(--text-2); }
.cb-tab.active {
  color: var(--gold-2);
  border-bottom-color: var(--gold);
}
.cb-copy {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-3);
  font-size: 11px;
  transition: all 0.25s;
}
.cb-copy:hover { color: var(--gold-2); border-color: var(--line-strong); }
.cb-copy-text { font-family: var(--mono); letter-spacing: 0.05em; }

.cb-code-wrap { overflow-x: auto; }
.cb-pre {
  padding: 16px 18px;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--text);
  white-space: pre;
}

/* Syntax highlight colors */
:deep(.syn-key) { color: var(--gold); }
:deep(.syn-str) { color: #8fbf8f; }
:deep(.syn-num) { color: #d9a87c; }
:deep(.syn-bool) { color: #c4a8e0; }
:deep(.syn-kw) { color: #8fb8d9; }
:deep(.syn-fn) { color: #9ddc1f; }
:deep(.syn-comment) { color: var(--text-3); font-style: italic; }
</style>
