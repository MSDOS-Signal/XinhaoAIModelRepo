/* ============================================================
 * 星皓 XINHAO · NVIDIA NIM 全量模型目录
 * 数据来源:https://integrate.api.nvidia.com/v1/models(实时拉取后人工标注)
 * 每个模型标注:类别 / 能力标签 / 上下文 / 参数量 / 一句话简介
 * available 字段:该 API Key 是否可正常调用(实测)
 * img 字段:NVIDIA 资源库模型配图
 * ============================================================ */

export const TAG_LABELS = {
  vision: '图像识别',
  multimodal: '多模态',
  fn: '函数调用',
  longctx: '长上下文',
  reason: '深度推理',
  code: '代码能力',
  agent: 'Agent 能力',
  multilang: '多语言',
  light: '轻量高效',
  moe: 'MoE 架构',
  fast: '快速响应',
  rag: '检索增强',
  embed: '向量嵌入',
  docparse: '文档解析',
  moderate: '内容审核',
  pii: '实体识别',
  translate: '机器翻译',
  imagegen: '图像生成',
  reward: '奖励模型',
  align: '对齐评估',
  synth: '合成数据',
  creative: '创意写作',
  fin: '金融专长',
  med: '医疗专长',
  domain: '专业领域',
  chart: '图表理解',
  audio: '音频理解',
  video: '视频理解',
  videodetect: '合成视频检测',
  edge: '端侧部署',
  fim: '代码补全'
}

export const CATEGORIES = {
  chat: { label: '对话生成', color: '#76b900' },
  vision: { label: '视觉理解', color: '#8fb8d9' },
  code: { label: '代码工程', color: '#9fd9a8' },
  embed: { label: '嵌入检索', color: '#c4a8e0' },
  safety: { label: '安全可信', color: '#e0a8a8' },
  doc: { label: '文档解析', color: '#d9c48f' },
  translate: { label: '机器翻译', color: '#8fd9d0' },
  reward: { label: '奖励对齐', color: '#e0b8d0' },
  image: { label: '图像生成', color: '#9ddc1f' },
  other: { label: '专项能力', color: '#b8c0d0' }
}

// 模型广场顶部筛选条
export const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'chat', label: '对话' },
  { key: 'vision', label: '图像识别' },
  { key: 'reason', label: '深度推理' },
  { key: 'code', label: '代码' },
  { key: 'agent', label: 'Agent' },
  { key: 'longctx', label: '长上下文' },
  { key: 'fn', label: '函数调用' },
  { key: 'multimodal', label: '多模态' },
  { key: 'embed', label: '嵌入检索' },
  { key: 'docparse', label: '文档解析' },
  { key: 'safety', label: '安全审核' },
  { key: 'translate', label: '翻译' },
  { key: 'reward', label: '奖励模型' },
  { key: 'light', label: '轻量高效' }
]

const m = (id, name, cat, params, ctx, tags, desc, flags = {}) => ({
  id, name, org: id.split('/')[0], cat, params, ctx, tags, desc, ...flags
})

export const ORG_NAMES = {
  '01-ai': '零一万物', abacusai: 'Abacus.AI', adept: 'Adept', ai21labs: 'AI21 Labs',
  aisingapore: 'AI Singapore', baai: '智源研究院', bigcode: 'BigCode', bytedance: '字节跳动',
  databricks: 'Databricks', 'deepseek-ai': 'DeepSeek', google: 'Google', ibm: 'IBM',
  meta: 'Meta', microsoft: 'Microsoft', minimaxai: 'MiniMax', mistralai: 'Mistral AI',
  moonshotai: 'Moonshot AI', 'nv-mistralai': 'NVIDIA × Mistral', nvidia: 'NVIDIA',
  openai: 'OpenAI', poolside: 'Poolside', qwen: '通义千问', sarvamai: 'Sarvam AI',
  snowflake: 'Snowflake', 'stepfun-ai': '阶跃星辰', thinkingmachines: 'Thinking Machines',
  upstage: 'Upstage', writer: 'Writer', 'z-ai': '智谱 Z.ai', zyphra: 'Zyphra'
}

// NVIDIA 模型配图基础 URL
const IMG = 'https://assets.ngc.nvidia.com/products/api-catalog/images'
// 图片映射(模型 slug -> 图片文件名,部分与 slug 不同)
const IMG_MAP = {
  'yi-large': 'yi-large', 'fuyu-8b': 'fuyu-8b', 'sea-lion-7b-instruct': 'sea-lion-7b-instruct',
  'bge-m3': 'bge-m3', 'starcoder2-15b': 'starcoder2-15b', 'seed-oss-36b-instruct': 'seed-oss-36b-instruct',
  'dbrx-instruct': 'dbrx-instruct', 'deepseek-v4-flash': 'deepseek-v4-flash', 'deepseek-v4-pro': 'deepseek-v4-pro',
  'deepseek-coder-6.7b-instruct': null, 'codegemma-7b': 'codegemma-7b', 'codegemma-1.1-7b': null,
  'gemma-2b': 'gemma-2b', 'gemma-2-2b-it': 'gemma-2-2b-it', 'gemma-3-12b-it': 'gemma-3-12b-it',
  'gemma-3-4b-it': 'gemma-3-4b-it', 'gemma-3n-e2b-it': 'gemma-3n-e2b-it', 'gemma-3n-e4b-it': 'gemma-3n-e4b-it',
  'gemma-4-31b-it': 'gemma-4-31b-it', 'recurrentgemma-2b': 'recurrentgemma-2b',
  'diffusiongemma-26b-a4b-it': 'diffusiongemma-26b-a4b-it',
  'granite-3.0-3b-a800m-instruct': null, 'granite-3.0-8b-instruct': null,
  'granite-34b-code-instruct': 'granite-34b-code-instruct', 'granite-8b-code-instruct': 'granite-8b-code-instruct',
  'codellama-70b': 'codellama-70b',
  'llama-3.1-70b-instruct': null, 'llama-3.1-8b-instruct': null,
  'llama-3.2-11b-vision-instruct': 'llama-3_2-11b-vision-instruct',
  'llama-3.2-1b-instruct': 'llama-3_2-1b-instruct',
  'llama-3.2-3b-instruct': 'llama-3_2-3b-instruct',
  'llama-3.2-90b-vision-instruct': 'llama-3_2-90b-vision-instruct',
  'llama-3.3-70b-instruct': null, 'llama-4-maverick-17b-128e-instruct': 'llama-4-maverick-17b-128e-instruct',
  'llama-guard-4-12b': 'llama-guard-4-12b', 'llama2-70b': 'llama2-70b',
  'kosmos-2': null, 'phi-3-vision-128k-instruct': 'phi-3-vision-128k-instruct',
  'phi-3.5-moe-instruct': null,
  'minimax-m2.7': 'minimax-m2_7', 'minimax-m3': 'minimax-m2_7',
  'codestral-22b-instruct-v0.1': null, 'ministral-14b-instruct-2512': 'ministral-14b-instruct-2512',
  'mistral-7b-instruct-v0.3': null, 'mistral-large': 'mistral-large',
  'mistral-large-2-instruct': 'mistral-large-2-instruct', 'mistral-medium-3.5-128b': 'mistral-medium-3_5-128b',
  'mistral-nemotron': 'mistral-nemotron', 'mistral-small-4-119b-2603': 'mistral-small-4-119b-2603',
  'mixtral-8x22b-v0.1': 'mixtral-8x22b-v0.1', 'mixtral-8x7b-instruct-v0.1': null,
  'kimi-k2.6': 'kimi-k2_6', 'mistral-nemo-12b-instruct': 'mistral-nemo-12b-instruct',
  'ai-synthetic-video-detector': null, 'cosmos-reason2-8b': 'cosmos3-nano-reasoner',
  'gliner-pii': 'nemotron-pii',
  'ising-calibration-1-35b-a3b': 'ising-calibration-1_5-31b', 'ising-calibration-1.5-31b': 'ising-calibration-1_5-31b',
  'nemoretriever-parse': 'nemoretriever-parse', 'nemotron-parse': 'nemotron-parse',
  'neva-22b': 'neva-22b', 'vila': 'vila',
  'nemotron-nano-12b-v2-vl': 'nvidia-nemotron-nano-12b-v2-vl',
  'llama-3.1-nemotron-nano-vl-8b-v1': 'llama-3_1-nemotron-nano-vl-8b-v1',
  'llama-3.1-nemoguard-8b-content-safety': null, 'llama-3.1-nemoguard-8b-topic-control': null,
  'llama-3.1-nemotron-safety-guard-8b-v3': null,
  'llama-3.1-nemotron-51b-instruct': null, 'llama-3.1-nemotron-70b-instruct': null,
  'llama-3.1-nemotron-nano-8b-v1': null, 'llama-3.1-nemotron-ultra-253b-v1': null,
  'llama-3.3-nemotron-super-49b-v1': null, 'llama-3.3-nemotron-super-49b-v1.5': null,
  'llama3-chatqa-1.5-70b': null, 'mistral-nemo-minitron-8b-8k-instruct': 'mistral-nemo-minitron-8b-8k-instruct',
  'nemotron-3-nano-30b-a3b': 'nemotron-3-nano-30b-a3b', 'nemotron-nano-3-30b-a3b': null,
  'nemotron-3-nano-omni-30b-a3b-reasoning': 'nemotron-3-nano-omni-30b-a3b-reasoning',
  'nemotron-3-super-120b-a12b': 'nemotron-3-super-120b-a12b', 'nemotron-3-ultra-550b-a55b': 'nemotron-3-ultra-550b-a55b',
  'nemotron-4-340b-instruct': 'nemotron-4-340b-instruct', 'nemotron-4-340b-reward': 'nemotron-4-340b-reward',
  'nemotron-mini-4b-instruct': 'nemotron-mini-4b-instruct', 'nvidia-nemotron-nano-9b-v2': 'llama-3_3-nemotron-super-49b-v1_5',
  'nemotron-3-embed-1b': 'nemotron-3-embed-1b', 'llama-nemotron-embed-1b-v2': 'llama-nemotron-embed-1b-v2',
  'llama-nemotron-embed-vl-1b-v2': 'llama-nemotron-embed-vl-1b-v2',
  'llama-3.2-nemoretriever-1b-vlm-embed-v1': null, 'llama-3.2-nv-embedqa-1b-v1': null,
  'nemotron-3.5-content-safety': 'nemotron-3.5-content-safety',
  'embed-qa-4': 'embed-qa-4', 'nv-embed-v1': 'nv-embed-v1', 'nv-embedcode-7b-v1': 'nv-embedcode-7b-v1',
  'nv-embedqa-e5-v5': 'nv-embedqa-e5-v5', 'nv-embedqa-mistral-7b-v2': 'nv-embedqa-mistral-7b-v2',
  'nvclip': 'nvclip', 'riva-translate-4b-instruct': 'riva-translate-4b-instruct',
  'riva-translate-4b-instruct-v1.1': null,
  'gpt-oss-120b': 'gpt-oss-120b', 'gpt-oss-20b': 'gpt-oss-20b',
  'laguna-xs-2.1': 'laguna-xs_2',
  'qwen3-next-80b-a3b-instruct': 'qwen3-next-80b-a3b-instruct', 'qwen3.5-397b-a17b': 'qwen3_5-396b-a18b-thinking',
  'sarvam-m': 'sarvam-m', 'arctic-embed-l': 'arctic-embed-l',
  'step-3.5-flash': 'step-3_5-flash', 'step-3.7-flash': 'step-3_7-flash',
  'inkling': 'inkling', 'solar-10.7b-instruct': null,
  'palmyra-creative-122b': 'palmyra-creative-122b', 'palmyra-fin-70b-32k': 'palmyra-fin-70b-32k',
  'palmyra-med-70b': 'palmyra-med-70b', 'palmyra-med-70b-32k': 'palmyra-med-70b-32k',
  'glm-5.2': 'glm5_1', 'zamba2-7b-instruct': 'zamba2-7b-instruct'
}

/** 获取模型配图 URL */
export function modelImage(id) {
  const slug = id.split('/')[1]
  const file = IMG_MAP[slug]
  return file ? `${IMG}/${file}.jpg` : null
}

/* ---------- 厂商 Logo 系统 ---------- */
// 厂商 ID -> logo 文件名(均位于 src/assets/)
const ORG_LOGO = {
  '01-ai': '01-ai',
  abacusai: 'abacusai',
  adept: 'adept',
  ai21labs: 'ai21labs',
  aisingapore: 'aisingapore',
  baai: 'baai',
  bigcode: 'bigcode',
  bytedance: 'bytedance',
  databricks: 'databricks',
  'deepseek-ai': 'deepseek',
  google: 'google',
  ibm: 'ibm',
  meta: 'meta',
  microsoft: 'microsoft',
  minimaxai: 'minimax',
  mistralai: 'mistral',
  moonshotai: 'moonshot',
  'nv-mistralai': 'nv-mistralai', // 特殊:双 logo
  nvidia: 'nvidia',
  openai: 'openai',
  poolside: 'poolside',
  qwen: 'qwen',
  sarvamai: 'sarvam',
  snowflake: 'snowflake',
  'stepfun-ai': 'stepfun',
  thinkingmachines: 'thinkingmachines',
  upstage: 'upstage',
  writer: 'writer',
  'z-ai': 'z-ai',
  zyphra: 'zyphra'
}

/**
 * 获取厂商 logo URL
 * @param {string} org - 厂商 ID
 * @returns {string[]} logo 路径数组(nv-mistralai 返回两个,其余返回一个)
 */
export function orgLogos(org) {
  if (org === 'nv-mistralai') {
    return [
      new URL('../assets/nvidia.png', import.meta.url).href,
      new URL('../assets/mistral.png', import.meta.url).href
    ]
  }
  const file = ORG_LOGO[org]
  if (!file) return []
  return [new URL(`../assets/${file}.png`, import.meta.url).href]
}

// 不可用模型集合(API Key 无权限调用,返回 404)
// 2026-07-24 实测:新 API Key nvapi-QKfes... 可正常对话的模型仅 13 个
const UNAVAILABLE = new Set([
  '01-ai/yi-large', 'adept/fuyu-8b', 'ai21labs/jamba-1.5-large-instruct',
  'aisingapore/sea-lion-7b-instruct', 'bigcode/starcoder2-15b', 'databricks/dbrx-instruct',
  'deepseek-ai/deepseek-coder-6.7b-instruct', 'google/codegemma-1.1-7b', 'google/codegemma-7b',
  'google/gemma-2b', 'google/gemma-3-12b-it', 'google/gemma-3-4b-it', 'google/recurrentgemma-2b',
  'ibm/granite-3.0-3b-a800m-instruct', 'ibm/granite-3.0-8b-instruct', 'ibm/granite-34b-code-instruct',
  'ibm/granite-8b-code-instruct', 'meta/codellama-70b', 'meta/llama2-70b',
  'microsoft/kosmos-2', 'microsoft/phi-3-vision-128k-instruct', 'microsoft/phi-3.5-moe-instruct',
  'mistralai/codestral-22b-instruct-v0.1', 'mistralai/mistral-7b-instruct-v0.3',
  'mistralai/mistral-large', 'mistralai/mistral-large-2-instruct', 'mistralai/mixtral-8x22b-v0.1',
  'moonshotai/kimi-k2.6', 'nv-mistralai/mistral-nemo-12b-instruct',
  'nvidia/cosmos-reason2-8b', 'nvidia/llama-3.1-nemotron-51b-instruct',
  'nvidia/llama-3.1-nemotron-70b-instruct', 'nvidia/llama-3.1-nemotron-ultra-253b-v1',
  'nvidia/llama3-chatqa-1.5-70b', 'nvidia/mistral-nemo-minitron-8b-8k-instruct',
  'nvidia/nemotron-4-340b-instruct', 'nvidia/nemotron-4-340b-reward', 'nvidia/nemotron-nano-3-30b-a3b',
  'nvidia/neva-22b', 'nvidia/vila',
  'qwen/qwen3.5-397b-a17b', 'writer/palmyra-creative-122b', 'writer/palmyra-fin-70b-32k',
  'writer/palmyra-med-70b', 'writer/palmyra-med-70b-32k', 'zyphra/zamba2-7b-instruct'
])

export const MODELS = [
  // ---------- 零一万物 / Abacus / Adept / AI21 / AI Singapore ----------
  m('01-ai/yi-large', 'Yi-Large', 'chat', '—', '32K', ['multilang', 'fn'], '零一万物旗舰闭源模型,中英文双语能力均衡。'),
  m('abacusai/dracarys-llama-3.1-70b-instruct', 'Dracarys 70B', 'chat', '70B', '128K', ['code', 'longctx'], 'Abacus.AI 基于 Llama 3.1 微调的代码增强模型。'),
  m('adept/fuyu-8b', 'Fuyu 8B', 'vision', '8B', '16K', ['vision', 'chart', 'light'], 'Adept 多模态模型,擅长图表、UI 界面与文档理解。'),
  m('ai21labs/jamba-1.5-large-instruct', 'Jamba 1.5 Large', 'chat', '94B·A12B', '256K', ['longctx', 'moe', 'multilang'], 'SSM×Transformer 混合架构,超长上下文吞吐之王。'),
  m('aisingapore/sea-lion-7b-instruct', 'SEA-LION 7B', 'chat', '7B', '8K', ['multilang', 'light'], '专为东南亚 11 种语言优化的区域语言模型。'),

  // ---------- 嵌入 ----------
  m('baai/bge-m3', 'BGE-M3', 'embed', '0.6B', '8K', ['embed', 'multilang', 'rag'], '智源多语言向量模型,支持 100+ 语言、稠密/稀疏/多向量混合检索。'),
  m('snowflake/arctic-embed-l', 'Arctic Embed L', 'embed', '0.3B', '8K', ['embed', 'rag'], 'Snowflake 检索向量模型,MTEB 榜单常客。'),
  m('nvidia/embed-qa-4', 'NV Embed QA 4', 'embed', '—', '32K', ['embed', 'rag'], 'NVIDIA 问答检索向量模型,企业级 RAG 首选。'),
  m('nvidia/llama-3.2-nv-embedqa-1b-v1', 'NV EmbedQA 1B', 'embed', '1B', '32K', ['embed', 'rag'], '基于 Llama 3.2 的问答向量模型。'),
  m('nvidia/llama-nemotron-embed-1b-v2', 'Nemotron Embed 1B v2', 'embed', '1B', '32K', ['embed', 'rag'], 'Nemotron 系列文本向量模型 v2。'),
  m('nvidia/llama-nemotron-embed-vl-1b-v2', 'Nemotron Embed VL 1B', 'embed', '1B', '32K', ['embed', 'vision', 'rag'], '支持图文混合内容的向量嵌入。'),
  m('nvidia/llama-3.2-nemoretriever-1b-vlm-embed-v1', 'NeMo Retriever VLM Embed', 'embed', '1B', '32K', ['embed', 'vision', 'rag'], '面向视觉文档检索的 VLM 向量模型。'),
  m('nvidia/nemotron-3-embed-1b', 'Nemotron 3 Embed 1B', 'embed', '1B', '32K', ['embed', 'rag'], '第三代 Nemotron 向量模型,多语言检索增强。', { fresh: true }),
  m('nvidia/nv-embed-v1', 'NV Embed v1', 'embed', '7B', '32K', ['embed', 'rag'], 'NVIDIA 通用文本向量模型。'),
  m('nvidia/nv-embedcode-7b-v1', 'NV EmbedCode 7B', 'embed', '7B', '32K', ['embed', 'code', 'rag'], '代码语义检索专用向量模型。'),
  m('nvidia/nv-embedqa-e5-v5', 'NV EmbedQA E5 v5', 'embed', '—', '32K', ['embed', 'rag'], 'E5 架构问答向量模型。'),
  m('nvidia/nv-embedqa-mistral-7b-v2', 'NV EmbedQA Mistral 7B', 'embed', '7B', '32K', ['embed', 'rag'], '基于 Mistral 7B 的检索向量模型。'),
  m('nvidia/nvclip', 'NVCLIP', 'embed', '—', '—', ['embed', 'vision'], 'NVIDIA 版 CLIP,图文跨模态向量对齐。'),

  // ---------- BigCode / 字节 / Databricks ----------
  m('bigcode/starcoder2-15b', 'StarCoder2 15B', 'code', '15B', '16K', ['code', 'fim'], 'BigCode 开源代码模型,支持 600+ 编程语言。'),
  m('bytedance/seed-oss-36b-instruct', 'Seed-OSS 36B', 'chat', '36B', '512K', ['reason', 'longctx', 'agent'], '字节跳动开源模型,512K 超长上下文与可控推理预算。', { fresh: true }),
  m('databricks/dbrx-instruct', 'DBRX Instruct', 'chat', '132B·A36B', '32K', ['moe', 'code'], 'Databricks 细粒度 MoE 通用模型。'),

  // ---------- DeepSeek ----------
  m('deepseek-ai/deepseek-coder-6.7b-instruct', 'DeepSeek Coder 6.7B', 'code', '6.7B', '16K', ['code', 'light'], '轻量代码补全与生成模型。'),
  m('deepseek-ai/deepseek-v4-flash', 'DeepSeek V4 Flash', 'chat', '—', '128K', ['reason', 'fast', 'agent'], 'DeepSeek V4 高速版,毫秒级响应的推理模型。', { fresh: true, hot: true }),
  m('deepseek-ai/deepseek-v4-pro', 'DeepSeek V4 Pro', 'chat', '—', '256K', ['reason', 'agent', 'fn', 'code'], 'DeepSeek 最新旗舰,深度推理与 Agent 工具调用全面进化。', { fresh: true, hot: true }),

  // ---------- Google ----------
  m('google/codegemma-1.1-7b', 'CodeGemma 1.1 7B', 'code', '7B', '8K', ['code', 'fim'], 'Gemma 系代码模型,IDE 补全利器。'),
  m('google/codegemma-7b', 'CodeGemma 7B', 'code', '7B', '8K', ['code'], 'Gemma 系代码生成模型。'),
  m('google/deplot', 'DePlot', 'vision', '—', '1K', ['vision', 'chart'], '图表理解专家:把统计图表一键翻译成结构化表格。'),
  m('google/diffusiongemma-26b-a4b-it', 'DiffusionGemma 26B', 'vision', '26B·A4B', '262K', ['reason', 'multimodal', 'longctx'], '扩散架构大语言模型,并行 token 生成实现极速文本推理,支持图文视频输入。', { fresh: true }),
  m('google/gemma-2-2b-it', 'Gemma 2 2B', 'chat', '2B', '8K', ['light', 'edge'], '可端侧运行的超轻量对话模型。'),
  m('google/gemma-2b', 'Gemma 2B', 'chat', '2B', '8K', ['light', 'edge'], 'Google 轻量开源模型初代。'),
  m('google/gemma-3-12b-it', 'Gemma 3 12B', 'vision', '12B', '128K', ['vision', 'multimodal', 'longctx', 'multilang'], '多模态 Gemma 3,140+ 语言,图像视频理解。'),
  m('google/gemma-3-4b-it', 'Gemma 3 4B', 'vision', '4B', '128K', ['vision', 'multimodal', 'light'], '轻量多模态,手机级算力即可跑动。'),
  m('google/gemma-3n-e2b-it', 'Gemma 3n E2B', 'vision', '2B', '32K', ['multimodal', 'audio', 'edge', 'light'], 'Gemma 3n 端侧全模态,支持图像与音频输入。'),
  m('google/gemma-3n-e4b-it', 'Gemma 3n E4B', 'vision', '4B', '32K', ['multimodal', 'audio', 'edge'], 'Gemma 3n 增强版,端侧多模态体验拉满。'),
  m('google/gemma-4-31b-it', 'Gemma 4 31B', 'vision', '31B', '256K', ['vision', 'reason', 'longctx', 'multilang'], 'Google 最新一代开源旗舰,多模态推理大幅跃升。', { fresh: true, hot: true }),
  m('google/recurrentgemma-2b', 'RecurrentGemma 2B', 'chat', '2B', '8K', ['light', 'edge'], '循环架构实验模型,无限长序列推理。'),

  // ---------- IBM ----------
  m('ibm/granite-3.0-3b-a800m-instruct', 'Granite 3.0 3B MoE', 'chat', '3B·A800M', '128K', ['moe', 'light', 'edge'], 'IBM 企业级轻量 MoE 模型。'),
  m('ibm/granite-3.0-8b-instruct', 'Granite 3.0 8B', 'chat', '8B', '128K', ['fn', 'rag'], 'IBM 企业级主力,函数调用与 RAG 表现稳定。'),
  m('ibm/granite-34b-code-instruct', 'Granite Code 34B', 'code', '34B', '8K', ['code'], 'IBM 大型代码模型。'),
  m('ibm/granite-8b-code-instruct', 'Granite Code 8B', 'code', '8B', '8K', ['code', 'light'], 'IBM 轻量代码模型。'),

  // ---------- Meta ----------
  m('meta/codellama-70b', 'Code Llama 70B', 'code', '70B', '16K', ['code'], 'Llama 2 系大型代码模型。'),
  m('meta/llama-3.1-70b-instruct', 'Llama 3.1 70B', 'chat', '70B', '128K', ['fn', 'multilang', 'longctx'], 'Meta 经典旗舰,开源生态的事实标准。'),
  m('meta/llama-3.1-8b-instruct', 'Llama 3.1 8B', 'chat', '8B', '128K', ['fn', 'light', 'fast'], '轻量旗舰,性价比之王。'),
  m('meta/llama-3.2-11b-vision-instruct', 'Llama 3.2 Vision 11B', 'vision', '11B', '128K', ['vision', 'chart', 'docparse'], 'Llama 官方视觉模型,文档与图像理解兼备。'),
  m('meta/llama-3.2-90b-vision-instruct', 'Llama 3.2 Vision 90B', 'vision', '90B', '128K', ['vision', 'chart', 'reason'], 'Llama 视觉旗舰,复杂图像推理首选。'),
  m('meta/llama-3.2-1b-instruct', 'Llama 3.2 1B', 'chat', '1B', '128K', ['light', 'edge', 'fast'], '可跑在手机上的迷你 Llama。'),
  m('meta/llama-3.2-3b-instruct', 'Llama 3.2 3B', 'chat', '3B', '128K', ['light', 'edge'], '轻量长上下文均衡之选。'),
  m('meta/llama-3.3-70b-instruct', 'Llama 3.3 70B', 'chat', '70B', '128K', ['fn', 'multilang', 'reason', 'agent'], '以 70B 之身比肩 405B,Llama 3 系集大成者。', { hot: true }),
  m('meta/llama-4-maverick-17b-128e-instruct', 'Llama 4 Maverick', 'vision', '400B·A17B', '1M', ['vision', 'moe', 'longctx', 'multilang'], '128 专家 MoE + 100 万上下文,Meta 新一代多模态巨兽。', { fresh: true, hot: true }),
  m('meta/llama-guard-4-12b', 'Llama Guard 4 12B', 'safety', '12B', '128K', ['moderate', 'vision'], '多模态内容安全护栏,输入输出双向审核。'),
  m('meta/llama2-70b', 'Llama 2 70B', 'chat', '70B', '4K', ['multilang'], 'Meta 上一代经典基座。'),

  // ---------- Microsoft ----------
  m('microsoft/kosmos-2', 'Kosmos-2', 'vision', '1.6B', '1K', ['vision'], '带目标定位(Grounding)的多模态理解模型。'),
  m('microsoft/phi-3-vision-128k-instruct', 'Phi-3 Vision 128K', 'vision', '4.2B', '128K', ['vision', 'longctx', 'light'], '小身材大视野,128K 上下文视觉理解。'),
  m('microsoft/phi-3.5-moe-instruct', 'Phi-3.5 MoE', 'chat', '42B·A6.6B', '128K', ['moe', 'light', 'reason'], '微软小模型哲学:16 专家 MoE,低延迟高推理。'),

  // ---------- MiniMax ----------
  m('minimaxai/minimax-m2.7', 'MiniMax M2.7', 'chat', '—', '256K', ['reason', 'agent', 'longctx'], 'MiniMax 新一代 MoE 模型,Agent 工作流特化。', { fresh: true }),
  m('minimaxai/minimax-m3', 'MiniMax M3', 'chat', '—', '256K', ['reason', 'agent', 'code'], 'MiniMax 最新旗舰,编程与智能体能力双突破。', { fresh: true, hot: true }),

  // ---------- Mistral ----------
  m('mistralai/codestral-22b-instruct-v0.1', 'Codestral 22B', 'code', '22B', '32K', ['code', 'fim'], 'Mistral 代码专精模型,80+ 语言。'),
  m('mistralai/ministral-14b-instruct-2512', 'Ministral 14B 2512', 'chat', '14B', '128K', ['fn', 'light'], 'Mistral 新一代中杯,边缘到云端通吃。', { fresh: true }),
  m('mistralai/mistral-7b-instruct-v0.3', 'Mistral 7B v0.3', 'chat', '7B', '32K', ['fn', 'light', 'fast'], '经典 7B,函数调用稳定。'),
  m('mistralai/mistral-large', 'Mistral Large', 'chat', '123B', '128K', ['fn', 'code', 'multilang', 'reason'], 'Mistral 旗舰,法语区最强模型。'),
  m('mistralai/mistral-large-2-instruct', 'Mistral Large 2', 'chat', '123B', '128K', ['fn', 'code', 'reason'], 'Large 二代,代码与推理显著增强。'),
  m('mistralai/mistral-medium-3.5-128b', 'Mistral Medium 3.5', 'vision', '128B', '128K', ['vision', 'fn', 'code'], '多模态中杯旗舰,企业部署性价比之选。', { fresh: true }),
  m('mistralai/mistral-nemotron', 'Mistral Nemotron', 'chat', '—', '128K', ['fn', 'rag'], 'Mistral × NVIDIA 联合优化模型。'),
  m('mistralai/mistral-small-4-119b-2603', 'Mistral Small 4', 'vision', '119B', '128K', ['vision', 'reason', 'fn'], 'Small 系列最新作,多模态与推理双修。', { fresh: true }),
  m('mistralai/mixtral-8x22b-v0.1', 'Mixtral 8×22B', 'chat', '141B·A39B', '64K', ['moe', 'multilang'], '稀疏 MoE 开山之作。'),
  m('mistralai/mixtral-8x7b-instruct-v0.1', 'Mixtral 8×7B', 'chat', '47B·A13B', '32K', ['moe', 'fn', 'fast'], '经典 MoE,速度质量均衡。'),

  // ---------- Moonshot / NVIDIA×Mistral ----------
  m('moonshotai/kimi-k2.6', 'Kimi K2.6', 'chat', '1T·A32B', '256K', ['reason', 'agent', 'code', 'fn'], '月之暗面万亿 MoE,Agentic Coding 标杆模型。', { fresh: true, hot: true }),
  m('nv-mistralai/mistral-nemo-12b-instruct', 'Mistral NeMo 12B', 'chat', '12B', '128K', ['longctx', 'fn', 'light'], 'NVIDIA × Mistral 联合打造的 128K 中杯。'),

  // ---------- NVIDIA 视觉 / 专项 ----------
  m('nvidia/ai-synthetic-video-detector', 'AI 合成视频检测器', 'safety', '—', '—', ['videodetect', 'video'], '识别 AI 生成/篡改视频,内容可信防线。', { fresh: true }),
  m('nvidia/cosmos-reason2-8b', 'Cosmos Reason2 8B', 'vision', '8B', '32K', ['vision', 'reason', 'video'], '物理世界推理模型,理解视频中的因果与空间关系。', { fresh: true }),
  m('nvidia/gliner-pii', 'GLiNER PII', 'safety', '—', '—', ['pii'], '个人敏感信息(PII)实体识别与脱敏。'),
  m('nvidia/ising-calibration-1-35b-a3b', 'Ising Calibration 1 35B', 'other', '35B·A3B', '32K', ['domain', 'moe'], '面向组合优化与量化场景的 Ising 校准模型。', { fresh: true }),
  m('nvidia/ising-calibration-1.5-31b', 'Ising Calibration 1.5 31B', 'other', '31B', '32K', ['domain'], 'Ising 校准模型 1.5 代,优化问题求解增强。', { fresh: true }),
  m('nvidia/nemoretriever-parse', 'NeMo Retriever Parse', 'doc', '—', '—', ['docparse', 'vision', 'chart'], '企业级文档解析:PDF 表格、图表、版面全还原。'),
  m('nvidia/nemotron-parse', 'Nemotron Parse', 'doc', '—', '—', ['docparse', 'vision'], '文档结构解析专用模型。'),
  m('nvidia/neva-22b', 'NeVA 22B', 'vision', '22B', '4K', ['vision'], 'NVIDIA 早期视觉对话模型。'),
  m('nvidia/vila', 'VILA', 'vision', '—', '4K', ['vision', 'video'], 'NVIDIA 视觉语言模型,支持多图与视频理解。'),
  m('nvidia/nemotron-nano-12b-v2-vl', 'Nemotron Nano 12B VL', 'vision', '12B', '128K', ['vision', 'reason', 'docparse'], '新一代视觉小钢炮,文档智能体核心。', { fresh: true }),
  m('nvidia/llama-3.1-nemotron-nano-vl-8b-v1', 'Nemotron Nano VL 8B', 'vision', '8B', '128K', ['vision', 'light', 'docparse'], '轻量视觉模型,图像问答与 OCR 兼备。'),

  // ---------- NVIDIA 安全 ----------
  m('nvidia/llama-3.1-nemoguard-8b-content-safety', 'NemoGuard 内容安全 8B', 'safety', '8B', '128K', ['moderate'], '输入输出双向内容安全审核。'),
  m('nvidia/llama-3.1-nemoguard-8b-topic-control', 'NemoGuard 话题控制 8B', 'safety', '8B', '128K', ['moderate'], '对话话题围栏,防止模型跑题越界。'),
  m('nvidia/llama-3.1-nemotron-safety-guard-8b-v3', 'Nemotron Safety Guard v3', 'safety', '8B', '128K', ['moderate', 'multilang'], '多语言安全护栏第三代。'),
  m('nvidia/nemotron-3.5-content-safety', 'Nemotron 3.5 内容安全', 'safety', '—', '32K', ['moderate'], '最新一代内容安全模型。', { fresh: true }),

  // ---------- NVIDIA Nemotron 对话家族 ----------
  m('nvidia/llama-3.1-nemotron-51b-instruct', 'Nemotron 51B', 'chat', '51B', '128K', ['fn', 'rag'], 'NVIDIA 精调中杯,HelpSteer 对齐。'),
  m('nvidia/llama-3.1-nemotron-70b-instruct', 'Nemotron 70B', 'chat', '70B', '128K', ['fn', 'rag', 'reason'], '曾登顶 Arena 的 NVIDIA 精调旗舰。'),
  m('nvidia/llama-3.1-nemotron-nano-8b-v1', 'Nemotron Nano 8B', 'chat', '8B', '128K', ['light', 'reason', 'edge'], '边缘端推理小模型。'),
  m('nvidia/llama-3.1-nemotron-ultra-253b-v1', 'Nemotron Ultra 253B', 'chat', '253B', '128K', ['reason', 'fn', 'agent', 'rag'], '253B 超级旗舰,复杂 Agent 工作流引擎。', { hot: true }),
  m('nvidia/llama-3.3-nemotron-super-49b-v1', 'Nemotron Super 49B', 'chat', '49B', '128K', ['reason', 'fn'], 'Super 系列:单卡可跑的强推理。'),
  m('nvidia/llama-3.3-nemotron-super-49b-v1.5', 'Nemotron Super 49B v1.5', 'chat', '49B', '128K', ['reason', 'fn', 'agent'], 'Super v1.5,推理与指令遵循再升级。'),
  m('nvidia/llama3-chatqa-1.5-70b', 'ChatQA 1.5 70B', 'chat', '70B', '128K', ['rag'], '检索增强问答专精,企业知识库好搭档。'),
  m('nvidia/mistral-nemo-minitron-8b-8k-instruct', 'Minitron 8B', 'chat', '8B', '8K', ['light', 'fast'], '剪枝蒸馏技术代表作。'),
  m('nvidia/nemotron-3-nano-30b-a3b', 'Nemotron 3 Nano 30B', 'chat', '30B·A3B', '128K', ['reason', 'moe', 'light'], '第三代 Nano MoE,3B 激活跑出 30B 智能。', { fresh: true }),
  m('nvidia/nemotron-nano-3-30b-a3b', 'Nemotron Nano 3 30B', 'chat', '30B·A3B', '128K', ['reason', 'moe', 'agent'], 'Nano 3 开放权重版,混合 MoE 架构。', { fresh: true }),
  m('nvidia/nemotron-3-nano-omni-30b-a3b-reasoning', 'Nemotron 3 Nano Omni', 'vision', '30B·A3B', '128K', ['multimodal', 'audio', 'vision', 'reason'], '全模态推理:文本、图像、音频一统。', { fresh: true }),
  m('nvidia/nemotron-3-super-120b-a12b', 'Nemotron 3 Super 120B', 'chat', '120B·A12B', '256K', ['reason', 'moe', 'agent', 'longctx'], '第三代 Super,120B 总参 12B 激活。', { fresh: true, hot: true }),
  m('nvidia/nemotron-3-ultra-550b-a55b', 'Nemotron 3 Ultra 550B', 'chat', '550B·A55B', '256K', ['reason', 'moe', 'agent'], '550B 宇宙级旗舰,NVIDIA 当家花旦。', { fresh: true, hot: true }),
  m('nvidia/nemotron-4-340b-instruct', 'Nemotron 4 340B', 'chat', '340B', '4K', ['synth'], '合成数据生成巨兽,训模型的模型。'),
  m('nvidia/nemotron-4-340b-reward', 'Nemotron 4 340B Reward', 'reward', '340B', '4K', ['reward', 'align'], 'RLHF 奖励模型,HelpSteer2 同款。'),
  m('nvidia/nemotron-mini-4b-instruct', 'Nemotron Mini 4B', 'chat', '4B', '4K', ['light', 'edge'], '游戏 NPC 与端侧对话小模型。'),
  m('nvidia/nvidia-nemotron-nano-9b-v2', 'Nemotron Nano 9B v2', 'chat', '9B', '128K', ['reason', 'light'], 'Nano 9B 二代,可控推理开关。'),

  // ---------- NVIDIA 翻译 ----------
  m('nvidia/riva-translate-4b-instruct', 'Riva Translate 4B', 'translate', '4B', '1K', ['translate', 'multilang'], 'Riva 实时翻译模型,32 种语言互译。'),
  m('nvidia/riva-translate-4b-instruct-v1.1', 'Riva Translate 4B v1.1', 'translate', '4B', '1K', ['translate', 'multilang'], 'Riva 翻译 v1.1,低资源语言增强。'),

  // ---------- OpenAI / Poolside / Qwen ----------
  m('openai/gpt-oss-120b', 'GPT-OSS 120B', 'chat', '117B·A5.1B', '128K', ['reason', 'fn', 'agent'], 'OpenAI 开源权重模型,可完全私有化部署的 o 系血统。', { fresh: true, hot: true }),
  m('openai/gpt-oss-20b', 'GPT-OSS 20B', 'chat', '21B·A3.6B', '128K', ['reason', 'light', 'fast'], 'GPT-OSS 轻量版,16GB 显存即可驾驭。', { fresh: true }),
  m('poolside/laguna-xs-2.1', 'Laguna XS 2.1', 'code', '—', '128K', ['code', 'agent'], 'Poolside 软件工程 Agent 模型,仓库级代码理解。', { fresh: true }),
  m('qwen/qwen3-next-80b-a3b-instruct', 'Qwen3-Next 80B', 'chat', '80B·A3B', '256K', ['reason', 'moe', 'longctx', 'agent'], '通义千问下一代架构,超高稀疏度 MoE。', { fresh: true, hot: true }),
  m('qwen/qwen3.5-397b-a17b', 'Qwen3.5 397B', 'chat', '397B·A17B', '256K', ['reason', 'moe', 'fn', 'agent'], 'Qwen 超大杯旗舰,中文理解天花板。', { fresh: true, hot: true }),

  // ---------- Sarvam / 阶跃 / Tinker / Upstage ----------
  m('sarvamai/sarvam-m', 'Sarvam M', 'chat', '—', '32K', ['multilang'], '印度 10 种官方语言专家模型。'),
  m('stepfun-ai/step-3.5-flash', 'Step 3.5 Flash', 'vision', '—', '256K', ['vision', 'fast', 'reason'], '阶跃星辰多模态闪电版。', { fresh: true }),
  m('stepfun-ai/step-3.7-flash', 'Step 3.7 Flash', 'vision', '—', '256K', ['vision', 'fast', 'agent'], 'Step 3.7:更快更强的多模态闪电。', { fresh: true }),
  m('thinkingmachines/inkling', 'Inkling', 'chat', '—', '128K', ['reason'], 'Thinking Machines 实验性推理模型。', { fresh: true }),
  m('upstage/solar-10.7b-instruct', 'Solar 10.7B', 'chat', '10.7B', '4K', ['light'], 'Upstage 深度上采样明星小模型。'),

  // ---------- Writer ----------
  m('writer/palmyra-creative-122b', 'Palmyra Creative 122B', 'chat', '122B', '32K', ['creative'], '创意写作专精:小说、文案、剧本一把好手。'),
  m('writer/palmyra-fin-70b-32k', 'Palmyra Fin 70B', 'chat', '70B', '32K', ['fin', 'domain'], '金融专精:研报、财报、合规样样精通。'),
  m('writer/palmyra-med-70b', 'Palmyra Med 70B', 'chat', '70B', '8K', ['med', 'domain'], '医疗专精:临床术语与循证表达。'),
  m('writer/palmyra-med-70b-32k', 'Palmyra Med 70B 32K', 'chat', '70B', '32K', ['med', 'domain', 'longctx'], '长上下文医疗专精版。'),

  // ---------- 智谱 / Zyphra ----------
  m('z-ai/glm-5.2', 'GLM 5.2', 'chat', '—', '200K', ['reason', 'agent', 'code', 'fn'], '智谱最新旗舰,国产 Agentic Coding 第一梯队。', { fresh: true, hot: true }),
  m('zyphra/zamba2-7b-instruct', 'Zamba2 7B', 'chat', '7B', '8K', ['light', 'fast'], 'Mamba 混合架构,低显存高吞吐。')
].map(model => ({
  ...model,
  available: !UNAVAILABLE.has(model.id),
  img: modelImage(model.id)
}))

/* ---------- 派生工具 ---------- */

export function matchFilter(model, key) {
  if (key === 'all') return true
  if (key === 'chat') return model.cat === 'chat'
  if (key === 'safety') return model.cat === 'safety'
  if (key === 'embed') return model.cat === 'embed'
  return model.tags.includes(key) || model.cat === key
}

// 对话类模型(可在 Playground 中聊天)
export function isChatCapable(model) {
  return ['chat', 'vision', 'code'].includes(model.cat)
}

// 支持图片输入
export function isVisionCapable(model) {
  return model.tags.includes('vision') || model.tags.includes('multimodal')
}

const ctxNum = (ctx) => {
  if (!ctx || ctx === '—') return 0
  if (ctx.endsWith('M')) return parseFloat(ctx) * 1024
  return parseFloat(ctx) || 0
}

const paramNum = (p) => {
  if (!p || p === '—') return 0
  const n = parseFloat(p)
  return isNaN(n) ? 0 : n
}

// 能力雷达(0-5)——用于详情弹窗可视化
export function radarOf(model) {
  const p = paramNum(model.params)
  const c = ctxNum(model.ctx)
  const t = model.tags
  const clamp = (v) => Math.max(0.5, Math.min(5, Math.round(v * 2) / 2))
  return [
    { name: '语言理解', value: clamp(p ? 2.6 + Math.log10(p + 1) * 1.6 : 3.2) },
    { name: '推理能力', value: t.includes('reason') ? 5 : p >= 30 ? 4 : 3 },
    { name: '代码能力', value: model.cat === 'code' ? 5 : t.includes('code') || t.includes('agent') ? 4 : 2.5 },
    { name: '多模态', value: t.includes('multimodal') ? 5 : t.includes('vision') ? 4 : 0.5 },
    { name: '上下文', value: c >= 512 ? 5 : c >= 256 ? 4.5 : c >= 128 ? 4 : c >= 32 ? 3 : 1.5 },
    { name: '响应速度', value: t.includes('fast') || t.includes('edge') ? 5 : p && p <= 9 ? 4.5 : p <= 30 ? 3.5 : p <= 90 ? 2.5 : 1.5 }
  ]
}

export const HOT_MODELS = MODELS.filter((x) => x.hot)
export const FRESH_MODELS = MODELS.filter((x) => x.fresh)
