<template>
  <div class="docs-page">
    <!-- ===== Sidebar ===== -->
    <aside class="docs-sidebar">
      <div class="ds-inner">
        <div class="ds-title mono">DOCUMENTATION</div>
        <nav class="ds-nav">
          <a
            v-for="s in sections"
            :key="s.id"
            :href="`#${s.id}`"
            class="ds-link"
            :class="{ active: activeSection === s.id }"
            @click.prevent="scrollTo(s.id)"
          >
            {{ s.label }}
          </a>
        </nav>
      </div>
    </aside>

    <!-- ===== Content ===== -->
    <main class="docs-content">
      <div class="dc-wrap">
        <!-- Header -->
        <section class="dc-head">
          <span class="eyebrow" v-reveal>API REFERENCE</span>
          <h1 class="display dc-title" v-reveal="60">开发文档</h1>
          <p class="dc-intro" v-reveal="120">
            星皓 XINHAO 基于 NVIDIA NIM 构建，完全兼容 OpenAI API 格式。
            只需修改 base_url 与 model 字段，即可无缝切换至 NVIDIA 加速推理。
          </p>
        </section>

        <!-- Quick Start -->
        <section id="quickstart" class="doc-section">
          <h2 class="doc-h2 serif">快速开始</h2>
          <p class="doc-p">端点地址与认证方式：</p>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-k mono">Base URL</div>
              <div class="info-v mono">https://integrate.api.nvidia.com/v1</div>
            </div>
            <div class="info-item">
              <div class="info-k mono">认证方式</div>
              <div class="info-v">Bearer Token（API Key）</div>
            </div>
            <div class="info-item">
              <div class="info-k mono">协议</div>
              <div class="info-v">HTTPS · RESTful · SSE</div>
            </div>
            <div class="info-item">
              <div class="info-k mono">兼容性</div>
              <div class="info-v">OpenAI API 100% 兼容</div>
            </div>
          </div>

          <p class="doc-p">三行代码发起第一次请求：</p>
          <CodeBlock :tabs="quickStartTabs" />
        </section>

        <!-- Authentication -->
        <section id="auth" class="doc-section">
          <h2 class="doc-h2 serif">认证</h2>
          <p class="doc-p">
            所有请求需在 Header 中携带 API Key。NVIDIA NIM 使用 Bearer Token 认证，
            格式为 <code class="inline-code">Authorization: Bearer nvapi-xxxx</code>。
          </p>
          <div class="callout">
            <div class="callout-icon">!</div>
            <div class="callout-body">
              <strong>安全提示：</strong>API Key 等同于账户凭证，请勿在前端代码中硬编码或提交至版本控制。生产环境应通过后端代理转发请求。
            </div>
          </div>
        </section>

        <!-- Chat Completions -->
        <section id="chat" class="doc-section">
          <h2 class="doc-h2 serif">对话补全</h2>
          <p class="doc-p">
            <code class="inline-code">POST /v1/chat/completions</code> —— 核心接口，支持流式与非流式响应。
          </p>

          <h3 class="doc-h3 serif">请求参数</h3>
          <div class="param-table-wrap">
            <table class="param-table">
              <thead>
                <tr>
                  <th>参数</th>
                  <th>类型</th>
                  <th>必填</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in chatParams" :key="p.name">
                  <td class="mono">{{ p.name }}</td>
                  <td class="mono">{{ p.type }}</td>
                  <td>{{ p.required ? '是' : '否' }}</td>
                  <td>{{ p.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="doc-h3 serif">示例</h3>
          <CodeBlock :tabs="chatTabs" />
        </section>

        <!-- Parameter Tuning -->
        <section id="params" class="doc-section">
          <h2 class="doc-h2 serif">参数调优</h2>
          <p class="doc-p">
            三个核心参数控制 AI 的生成行为：<strong>Temperature</strong>、<strong>Top P</strong> 和 <strong>Max Tokens</strong>。
            理解它们的含义与取值影响，是获得高质量回答的关键。
          </p>

          <!-- Temperature -->
          <div class="param-detail">
            <div class="pd-header">
              <span class="pd-name serif">Temperature</span>
              <span class="pd-range mono">0.0 — 2.0</span>
              <span class="pd-default mono">默认 0.6</span>
            </div>
            <p class="pd-desc">
              控制生成结果的<strong>随机性与创造性</strong>。模型在每一步预测下一个 token 时，
              会根据概率分布进行采样；Temperature 对这个分布进行缩放——值越低，模型越倾向于选择高概率词汇，
              输出更确定、保守；值越高，低概率词汇被选中的机会增大，输出更多样、富有创意。
            </p>
            <div class="pd-guide">
              <div class="pd-row">
                <span class="pd-val mono">0.0 — 0.3</span>
                <span class="pd-effect">精确、确定性强。适合代码生成、数据提取、事实问答、翻译等需要准确性的任务</span>
              </div>
              <div class="pd-row">
                <span class="pd-val mono">0.4 — 0.7</span>
                <span class="pd-effect">平衡模式。兼顾准确性与灵活性，适合日常对话、内容总结、通用问答</span>
              </div>
              <div class="pd-row">
                <span class="pd-val mono">0.8 — 1.2</span>
                <span class="pd-effect">发散创意。适合创意写作、头脑风暴、广告文案、故事创作</span>
              </div>
              <div class="pd-row">
                <span class="pd-val mono">1.3 — 2.0</span>
                <span class="pd-effect">高度随机。输出可能不连贯或偏离主题，仅在特殊场景下使用</span>
              </div>
            </div>
            <div class="callout">
              <div class="callout-icon">!</div>
              <div class="callout-body">
                <strong>设置建议：</strong>如果回答出现"胡说八道"或偏离事实，降低 Temperature；如果回答太死板、千篇一律，适当提高。大多数场景下 0.3-0.7 是最佳区间。
              </div>
            </div>
          </div>

          <!-- Top P -->
          <div class="param-detail">
            <div class="pd-header">
              <span class="pd-name serif">Top P</span>
              <span class="pd-range mono">0.0 — 1.0</span>
              <span class="pd-default mono">默认 0.95</span>
            </div>
            <p class="pd-desc">
              又称<strong>核采样（Nucleus Sampling）</strong>。模型先按概率从高到低排列所有候选 token，
              然后选择累计概率达到 P 值的最小 token 集合，只在这个集合中采样。P=0.95 表示只考虑概率前 95% 的词汇，
              排除了尾部极低概率的"噪声词"。与 Temperature 不同，Top P 是在<strong>词汇范围</strong>上做截断，
              而非改变概率分布形状。
            </p>
            <div class="pd-guide">
              <div class="pd-row">
                <span class="pd-val mono">0.1 — 0.5</span>
                <span class="pd-effect">仅从高概率词汇中选择，输出聚焦且保守。适合专业领域问答、结构化输出</span>
              </div>
              <div class="pd-row">
                <span class="pd-val mono">0.6 — 0.9</span>
                <span class="pd-effect">允许适度多样性，兼顾准确与自然。适合大多数对话场景</span>
              </div>
              <div class="pd-row">
                <span class="pd-val mono">0.9 — 1.0</span>
                <span class="pd-effect">几乎不截断，模型可从全部词汇中选择。适合创意写作、开放式讨论</span>
              </div>
            </div>
            <div class="callout">
              <div class="callout-icon">!</div>
              <div class="callout-body">
                <strong>Temperature vs Top P：</strong>两者都控制随机性，但机制不同。通常<strong>只需调整其中一个</strong>即可——
                建议固定 Top P=0.95，通过调节 Temperature 来控制创造性；或固定 Temperature=0.7，通过调节 Top P 来控制词汇范围。两者同时调高可能导致输出不可控。
              </div>
            </div>
          </div>

          <!-- Max Tokens -->
          <div class="param-detail">
            <div class="pd-header">
              <span class="pd-name serif">Max Tokens</span>
              <span class="pd-range mono">256 — 8192</span>
              <span class="pd-default mono">默认 2048</span>
            </div>
            <p class="pd-desc">
              限制模型单次回复的<strong>最大 token 数量</strong>。一个 token 大约对应 0.5-1 个中文字符或 1 个英文单词。
              当生成达到此上限时，模型会立即停止输出，即使回答尚未完成。这个参数直接影响<strong>回复长度和 API 费用</strong>——
              token 数越多，生成时间越长、消耗资源越多。
            </p>
            <div class="pd-guide">
              <div class="pd-row">
                <span class="pd-val mono">256 — 512</span>
                <span class="pd-effect">短回复。适合简单问答、单句翻译、关键词提取、分类判断</span>
              </div>
              <div class="pd-row">
                <span class="pd-val mono">1024 — 2048</span>
                <span class="pd-effect">中等长度。适合日常对话、文章摘要、代码片段、解释说明</span>
              </div>
              <div class="pd-row">
                <span class="pd-val mono">4096 — 8192</span>
                <span class="pd-effect">长文输出。适合长篇文章生成、完整代码文件、详细技术方案、多步骤推理</span>
              </div>
            </div>
            <div class="callout">
              <div class="callout-icon">!</div>
              <div class="callout-body">
                <strong>注意事项：</strong>Max Tokens 是上限而非目标——模型可能在远未达到上限时就自然结束。设置过小会导致回答被截断（表现为突然中断或末尾不完整）；设置过大则无实质副作用，但会增加最大计费上限。建议根据任务复杂度合理设置。
              </div>
            </div>
          </div>

          <!-- Quick Reference Table -->
          <h3 class="doc-h3 serif">速查表</h3>
          <div class="param-table-wrap">
            <table class="param-table">
              <thead>
                <tr>
                  <th>任务场景</th>
                  <th>Temperature</th>
                  <th>Top P</th>
                  <th>Max Tokens</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in paramGuide" :key="r.scene">
                  <td>{{ r.scene }}</td>
                  <td class="mono">{{ r.temp }}</td>
                  <td class="mono">{{ r.topP }}</td>
                  <td class="mono">{{ r.maxT }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Streaming -->
        <section id="streaming" class="doc-section">
          <h2 class="doc-h2 serif">流式输出</h2>
          <p class="doc-p">
            设置 <code class="inline-code">"stream": true</code> 即可启用 SSE（Server-Sent Events）流式响应。
            每个 chunk 以 <code class="inline-code">data: </code> 前缀传输，以 <code class="inline-code">data: [DONE]</code> 结束。
          </p>
          <CodeBlock :tabs="streamTabs" />

          <h3 class="doc-h3 serif">SSE 响应格式</h3>
          <pre class="raw-pre mono"><code>data: {<span class="json-key">"id"</span>:<span class="json-str">"chatcmpl-xxx"</span>,<span class="json-key">"choices"</span>:[{<span class="json-key">"delta"</span>:{<span class="json-key">"content"</span>:<span class="json-str">"你"</span>},<span class="json-key">"index"</span>:0}]}

data: {<span class="json-key">"id"</span>:<span class="json-str">"chatcmpl-xxx"</span>,<span class="json-key">"choices"</span>:[{<span class="json-key">"delta"</span>:{<span class="json-key">"content"</span>:<span class="json-str">"好"</span>},<span class="json-key">"index"</span>:0}]}

data: [DONE]</code></pre>
        </section>

        <!-- Vision -->
        <section id="vision" class="doc-section">
          <h2 class="doc-h2 serif">多模态（视觉）</h2>
          <p class="doc-p">
            视觉模型（如 Llama 3.2 Vision、Gemma 3 等）支持图片输入。
            使用 <code class="inline-code">content</code> 数组格式，混合文本与图片。
          </p>
          <CodeBlock :tabs="visionTabs" />
          <p class="doc-p">
            图片支持 Base64 Data URL 或公开 URL 两种格式。
            建议单张图片不超过 10MB，长边不超过 4096px。
          </p>
        </section>

        <!-- Embeddings -->
        <section id="embeddings" class="doc-section">
          <h2 class="doc-h2 serif">向量嵌入</h2>
          <p class="doc-p">
            <code class="inline-code">POST /v1/embeddings</code> —— 将文本编码为高维向量，用于 RAG 检索与语义相似度计算。
          </p>
          <CodeBlock :tabs="embedTabs" />
        </section>

        <!-- Models List -->
        <section id="models-list" class="doc-section">
          <h2 class="doc-h2 serif">模型列表</h2>
          <p class="doc-p">
            <code class="inline-code">GET /v1/models</code> —— 获取所有可用模型 ID。
          </p>
          <CodeBlock :tabs="listTabs" />
        </section>

        <!-- Error Codes -->
        <section id="errors" class="doc-section">
          <h2 class="doc-h2 serif">错误码</h2>
          <div class="param-table-wrap">
            <table class="param-table">
              <thead>
                <tr>
                  <th>状态码</th>
                  <th>含义</th>
                  <th>处理建议</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="e in errorCodes" :key="e.code">
                  <td class="mono err-code">{{ e.code }}</td>
                  <td>{{ e.meaning }}</td>
                  <td>{{ e.advice }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- SDKs -->
        <section id="sdks" class="doc-section">
          <h2 class="doc-h2 serif">SDK 兼容</h2>
          <p class="doc-p">由于完全兼容 OpenAI API，可直接使用以下官方 SDK：</p>
          <div class="sdk-grid">
            <div class="sdk-card" v-for="sdk in sdks" :key="sdk.name">
              <div class="sdk-name serif">{{ sdk.name }}</div>
              <div class="sdk-lang mono">{{ sdk.lang }}</div>
              <pre class="sdk-code mono">{{ sdk.code }}</pre>
            </div>
          </div>
        </section>

        <!-- Footer note -->
        <section class="doc-end">
          <hr class="hairline" />
          <p class="doc-end-text">
            更多模型与能力，请访问
            <a href="https://build.nvidia.com/models" target="_blank" rel="noopener" class="doc-link">NVIDIA Build</a>
            或直接前往
            <router-link to="/playground" class="doc-link">在线体验</router-link>
            。
          </p>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import { playClick } from '@/utils/sound'

const activeSection = ref('quickstart')

const sections = [
  { id: 'quickstart', label: '快速开始' },
  { id: 'auth', label: '认证' },
  { id: 'chat', label: '对话补全' },
  { id: 'params', label: '参数调优' },
  { id: 'streaming', label: '流式输出' },
  { id: 'vision', label: '多模态视觉' },
  { id: 'embeddings', label: '向量嵌入' },
  { id: 'models-list', label: '模型列表' },
  { id: 'errors', label: '错误码' },
  { id: 'sdks', label: 'SDK 兼容' }
]

const chatParams = [
  { name: 'model', type: 'string', required: true, desc: '模型 ID，如 meta/llama-3.3-70b-instruct' },
  { name: 'messages', type: 'array', required: true, desc: '消息数组，含 role 与 content 字段' },
  { name: 'temperature', type: 'float', required: false, desc: '采样温度 0-2，控制随机性，详见参数调优' },
  { name: 'top_p', type: 'float', required: false, desc: '核采样阈值 0-1，控制词汇范围，详见参数调优' },
  { name: 'max_tokens', type: 'int', required: false, desc: '最大生成 token 数，控制回复长度，详见参数调优' },
  { name: 'stream', type: 'bool', required: false, desc: '是否流式输出，默认 false' }
]

const errorCodes = [
  { code: '400', meaning: '请求参数错误', advice: '检查 model ID、messages 格式与参数范围' },
  { code: '401', meaning: '认证失败', advice: '确认 API Key 正确且未过期' },
  { code: '404', meaning: '模型不存在', advice: '检查 model ID 拼写，或调用 /v1/models 获取列表' },
  { code: '422', meaning: '输入不支持', advice: '如向非视觉模型发送图片，检查模型能力' },
  { code: '429', meaning: '请求频率超限', advice: '降低并发，添加重试退避策略' },
  { code: '500', meaning: '服务端错误', advice: '稍后重试，如持续请联系 NVIDIA 支持' }
]

const paramGuide = [
  { scene: '代码生成', temp: '0.2', topP: '0.95', maxT: '4096' },
  { scene: '日常对话', temp: '0.6', topP: '0.95', maxT: '2048' },
  { scene: '创意写作', temp: '0.9', topP: '0.98', maxT: '4096' },
  { scene: '事实问答', temp: '0.1', topP: '0.50', maxT: '1024' },
  { scene: '翻译任务', temp: '0.3', topP: '0.95', maxT: '2048' },
  { scene: '数据提取', temp: '0.0', topP: '0.30', maxT: '1024' },
  { scene: '长文生成', temp: '0.7', topP: '0.95', maxT: '8192' },
  { scene: '摘要总结', temp: '0.5', topP: '0.90', maxT: '1024' }
]

const sdks = [
  {
    name: 'Python',
    lang: 'openai >= 1.0',
    code: `from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-xxxx"
)

resp = client.chat.completions.create(
    model="meta/llama-3.3-70b-instruct",
    messages=[{"role": "user", "content": "你好"}],
)`
  },
  {
    name: 'JavaScript',
    lang: 'openai npm',
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: "nvapi-xxxx"
});

const resp = await client.chat.completions.create({
  model: "meta/llama-3.3-70b-instruct",
  messages: [{ role: "user", content: "你好" }]
});`
  },
  {
    name: 'LangChain',
    lang: 'langchain-openai',
    code: `from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-xxxx",
    model="meta/llama-3.3-70b-instruct"
)

print(llm.invoke("你好"))`
  }
]

const quickStartTabs = [
  {
    lang: 'cURL',
    code: `curl -X POST https://integrate.api.nvidia.com/v1/chat/completions \\
  -H "Authorization: Bearer nvapi-xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "meta/llama-3.3-70b-instruct",
    "messages": [{"role": "user", "content": "你好"}],
    "max_tokens": 512
  }'`
  },
  {
    lang: 'Python',
    code: `from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-xxxx"
)

resp = client.chat.completions.create(
    model="meta/llama-3.3-70b-instruct",
    messages=[{"role": "user", "content": "你好"}]
)
print(resp.choices[0].message.content)`
  },
  {
    lang: 'JavaScript',
    code: `const res = await fetch(
  "https://integrate.api.nvidia.com/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer nvapi-xxxx",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta/llama-3.3-70b-instruct",
      messages: [{ role: "user", content: "你好" }]
    })
  }
);
const data = await res.json();
console.log(data.choices[0].message.content);`
  }
]

const chatTabs = [
  {
    lang: 'cURL',
    code: `curl -X POST https://integrate.api.nvidia.com/v1/chat/completions \\
  -H "Authorization: Bearer nvapi-xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-ai/deepseek-v4-pro",
    "messages": [
      {"role": "system", "content": "你是专业翻译"},
      {"role": "user", "content": "翻译：人工智能"}
    ],
    "temperature": 0.3,
    "top_p": 0.95,
    "max_tokens": 1024
  }'`
  },
  {
    lang: 'Python',
    code: `resp = client.chat.completions.create(
    model="deepseek-ai/deepseek-v4-pro",
    messages=[
        {"role": "system", "content": "你是专业翻译"},
        {"role": "user", "content": "翻译：人工智能"}
    ],
    temperature=0.3,
    top_p=0.95,
    max_tokens=1024
)
print(resp.choices[0].message.content)`
  }
]

const streamTabs = [
  {
    lang: 'Python',
    code: `stream = client.chat.completions.create(
    model="meta/llama-3.3-70b-instruct",
    messages=[{"role": "user", "content": "讲个故事"}],
    stream=True
)

for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)`
  },
  {
    lang: 'JavaScript',
    code: `const res = await fetch(
  "https://integrate.api.nvidia.com/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer nvapi-xxxx",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta/llama-3.3-70b-instruct",
      messages: [{ role: "user", content: "讲个故事" }],
      stream: true
    })
  }
);

const reader = res.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const text = decoder.decode(value);
  // 解析 data: 行...
}`
  }
]

const visionTabs = [
  {
    lang: 'Python',
    code: `resp = client.chat.completions.create(
    model="meta/llama-3.2-90b-vision-instruct",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "描述这张图片"},
            {"type": "image_url",
             "image_url": {"url": "https://example.com/image.jpg"}}
        ]
    }]
)
print(resp.choices[0].message.content)`
  },
  {
    lang: 'JSON',
    code: `{
  "model": "meta/llama-3.2-90b-vision-instruct",
  "messages": [{
    "role": "user",
    "content": [
      { "type": "text", "text": "描述这张图片" },
      { "type": "image_url",
        "image_url": {
          "url": "data:image/jpeg;base64,/9j/4AAQ..."
        }
      }
    ]
  }]
}`
  }
]

const embedTabs = [
  {
    lang: 'cURL',
    code: `curl -X POST https://integrate.api.nvidia.com/v1/embeddings \\
  -H "Authorization: Bearer nvapi-xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "baai/bge-m3",
    "input": "人工智能改变世界",
    "input_type": "query"
  }'`
  },
  {
    lang: 'Python',
    code: `resp = client.embeddings.create(
    model="baai/bge-m3",
    input="人工智能改变世界"
)
vector = resp.data[0].embedding
print(f"维度: {len(vector)}")`
  }
]

const listTabs = [
  {
    lang: 'cURL',
    code: `curl https://integrate.api.nvidia.com/v1/models \\
  -H "Authorization: Bearer nvapi-xxxx"`
  },
  {
    lang: 'Python',
    code: `models = client.models.list()
for m in models.data:
    print(m.id)`
  }
]

function scrollTo(id) {
  playClick()
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 90
  window.scrollTo({ top, behavior: 'smooth' })
}

function onScroll() {
  const scrollY = window.scrollY + 120
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id)
    if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
      activeSection.value = sections[i].id
      return
    }
  }
  activeSection.value = sections[0].id
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.docs-page {
  display: flex;
  margin-top: 68px;
  min-height: calc(100svh - 68px);
}

/* ===== Sidebar ===== */
.docs-sidebar {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 68px;
  height: calc(100svh - 68px);
  overflow-y: auto;
  border-right: 1px solid var(--line);
  background: var(--bg-2);
}
.ds-inner { padding: 32px 20px; }
.ds-title {
  font-size: 10px;
  letter-spacing: 0.4em;
  color: var(--text-3);
  margin-bottom: 20px;
}
.ds-nav { display: flex; flex-direction: column; gap: 2px; }
.ds-link {
  display: block;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13.5px;
  color: var(--text-2);
  transition: all 0.25s;
  border-left: 2px solid transparent;
}
.ds-link:hover { color: var(--gold-2); background: var(--panel); }
.ds-link.active {
  color: var(--gold-2);
  border-left-color: var(--gold);
  background: rgba(118, 185, 0, 0.06);
}

/* ===== Content ===== */
.docs-content {
  flex: 1;
  min-width: 0;
  padding: 0 48px;
  max-width: 880px;
}
.dc-wrap { padding: 48px 0 80px; }

.dc-head { margin-bottom: 56px; }
.dc-title { font-size: clamp(36px, 6vw, 56px); margin-top: 18px; }
.dc-intro { margin-top: 16px; color: var(--text-2); font-size: 15px; line-height: 1.8; max-width: 640px; }

.doc-section { margin-bottom: 56px; scroll-margin-top: 90px; }
.doc-h2 {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}
.doc-h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 24px 0 12px;
  color: var(--gold-2);
}
.doc-p { font-size: 14.5px; color: var(--text-2); line-height: 1.8; margin-bottom: 14px; }

.inline-code {
  font-family: var(--mono);
  font-size: 0.88em;
  background: var(--panel-2);
  padding: 2px 7px;
  border-radius: 4px;
  color: var(--gold-2);
  border: 1px solid var(--line);
}

/* Info grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin: 20px 0;
}
.info-item {
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--panel);
}
.info-k { font-size: 10px; letter-spacing: 0.25em; color: var(--text-3); margin-bottom: 6px; }
.info-v { font-size: 13.5px; color: var(--text); }

/* Callout */
.callout {
  display: flex;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 10px;
  border: 1px solid rgba(118, 185, 0, 0.25);
  background: rgba(118, 185, 0, 0.05);
  margin: 16px 0;
}
.callout-icon {
  flex-shrink: 0;
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--gold);
  color: var(--ink-on-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}
.callout-body { font-size: 13.5px; color: var(--text-2); line-height: 1.7; }
.callout-body strong { color: var(--gold-2); }

/* Tables */
.param-table-wrap { overflow-x: auto; margin: 16px 0; }
.param-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}
.param-table th {
  text-align: left;
  padding: 10px 14px;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--text-3);
  border-bottom: 1px solid var(--line-strong);
  font-family: var(--mono);
  text-transform: uppercase;
}
.param-table td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  color: var(--text-2);
}
.param-table td.mono { font-family: var(--mono); color: var(--gold-2); font-size: 12.5px; }
.err-code { color: var(--danger) !important; }

/* Parameter Detail Cards */
.param-detail {
  margin: 24px 0;
  padding: 24px;
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--panel);
}
.pd-header {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.pd-name { font-size: 20px; font-weight: 600; color: var(--text); }
.pd-range {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--nv-2);
  padding: 3px 10px;
  border-radius: 5px;
  background: rgba(118, 185, 0, 0.1);
  border: 1px solid rgba(118, 185, 0, 0.25);
}
.pd-default {
  font-size: 11px;
  color: var(--text-3);
}
.pd-desc {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.85;
  margin-bottom: 16px;
}
.pd-desc strong { color: var(--nv-2); font-weight: 600; }
.pd-guide {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 16px;
}
.pd-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--bg-3);
  border: 1px solid var(--line);
}
.pd-row:nth-child(odd) { background: rgba(118, 185, 0, 0.02); }
.pd-val {
  flex-shrink: 0;
  min-width: 100px;
  font-size: 12px;
  color: var(--nv-2);
  font-weight: 600;
  padding-top: 1px;
}
.pd-effect {
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.6;
}

/* Raw pre */
.raw-pre {
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 16px;
  font-size: 12.5px;
  line-height: 1.7;
  overflow-x: auto;
  color: var(--text-2);
}
.json-key { color: var(--gold); }
.json-str { color: #8fbf8f; }

/* SDK grid */
.sdk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.sdk-card {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--panel);
}
.sdk-name { font-size: 18px; font-weight: 600; color: var(--gold-2); }
.sdk-lang { font-size: 10px; letter-spacing: 0.2em; color: var(--text-3); margin: 4px 0 12px; }
.sdk-code {
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  color: var(--text-2);
  overflow-x: auto;
}

/* End */
.doc-end { margin-top: 60px; }
.doc-end-text { margin-top: 20px; font-size: 14px; color: var(--text-2); }
.doc-link { color: var(--gold-2); text-decoration: underline; }

@media (max-width: 860px) {
  .docs-sidebar { display: none; }
  .docs-content { padding: 0 20px; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>
