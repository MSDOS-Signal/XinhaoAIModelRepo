/* ============================================================
 * 星皓 XINHAO · NVIDIA NIM API 客户端
 *
 * 开发环境:Vite 代理 /nvapi -> https://integrate.api.nvidia.com/v1
 *   (Vite 代理在服务端注入 API Key,前端不接触密钥)
 * 生产环境:Cloudflare Pages Function /api -> 服务端注入 API Key
 *   (Function 在服务端注入 API Key,前端不接触密钥)
 *
 * API Key 永远不暴露在前端代码中
 * ============================================================ */

// API 基础路径
export const API_BASE = import.meta.env.DEV
  ? '/nvapi'                    // 开发:Vite 代理(代理注入 Key)
  : '/api'                      // 生产:Cloudflare Function(Function 注入 Key)

// 请求头:前端永远不传 Authorization
const headers = () => ({
  'Content-Type': 'application/json'
})

/** 拉取线上模型 ID 列表 */
export async function listModels() {
  const res = await fetch(`${API_BASE}/models`, { headers: headers() })
  if (!res.ok) throw new Error(`models ${res.status}`)
  const data = await res.json()
  return (data.data || []).map((x) => x.id)
}

/**
 * 流式对话(异步生成器)
 * @param {object} opt { model, messages, temperature, top_p, max_tokens }
 * @yields {string} 增量文本
 */
export async function* streamChat(opt) {
  const body = {
    model: opt.model,
    messages: opt.messages,
    temperature: opt.temperature ?? 0.6,
    top_p: opt.top_p ?? 0.95,
    max_tokens: opt.max_tokens ?? 2048,
    stream: true
  }
  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
    signal: opt.signal
  })
  if (!res.ok) {
    let detail = ''
    try {
      const j = await res.json()
      detail = j?.error?.message || j?.message || JSON.stringify(j)
    } catch {
      detail = await res.text().catch(() => '')
    }
    throw new Error(`HTTP ${res.status} · ${detail || '请求失败'}`)
  }
  const reader = res.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buf = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() || ''
    for (const line of lines) {
      const t = line.trim()
      if (!t.startsWith('data:')) continue
      const payload = t.slice(5).trim()
      if (payload === '[DONE]') return
      try {
        const json = JSON.parse(payload)
        const delta = json.choices?.[0]?.delta?.content
        if (delta) yield delta
      } catch {
        /* 忽略半包 */
      }
    }
  }
}

/** 构造多模态消息(视觉模型) */
export function visionMessage(text, images) {
  const content = []
  if (text) content.push({ type: 'text', text })
  for (const img of images) {
    content.push({ type: 'image_url', image_url: { url: img } })
  }
  return { role: 'user', content }
}
