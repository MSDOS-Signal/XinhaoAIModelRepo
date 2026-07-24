import{_ as $,z as D,a as o,c as l,b as a,F as h,r as b,s as N,t as n,p as j,j as B,i as C,o as E,m as R,w as O,e as i,g as y,d as m,f as L,h as M,k as V,B as H}from"./index-BTTWwKTe.js";const U={class:"code-block"},z={class:"cb-bar"},K={class:"cb-tabs"},J=["onClick"],F={key:0,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none"},G={key:1,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none"},X={class:"cb-copy-text"},Y={class:"cb-code-wrap"},Q={class:"cb-pre mono"},W=["innerHTML"],Z={__name:"CodeBlock",props:{tabs:{type:Array,required:!0}},setup(T){const p=T,c=B(0),u=B(!1),k=C(()=>{var d;return((d=p.tabs[c.value])==null?void 0:d.code)||""}),w=C(()=>{var d;return((d=p.tabs[c.value])==null?void 0:d.lang)||""}),q=C(()=>I(k.value,w.value));function I(d,r){let e=d.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");if(r==="JSON")e=e.replace(/"([^"]+)":/g,'<span class="syn-key">"$1"</span>:'),e=e.replace(/: "([^"]*)"/g,': <span class="syn-str">"$1"</span>'),e=e.replace(/: (\d+)/g,': <span class="syn-num">$1</span>'),e=e.replace(/\b(true|false|null)\b/g,'<span class="syn-bool">$1</span>');else{e=e.replace(/(#[^\n]*)/g,'<span class="syn-comment">$1</span>'),e=e.replace(/(\/\/[^\n]*)/g,'<span class="syn-comment">$1</span>'),e=e.replace(/("(?:[^"\\]|\\.)*")/g,'<span class="syn-str">$1</span>'),e=e.replace(/('(?:[^'\\]|\\.)*')/g,'<span class="syn-str">$1</span>');const v=["import","from","const","let","var","function","return","if","else","for","while","class","new","await","async","def","print","True","False","None","self","in","not","and","or","is","None"],x=new RegExp(`\\b(${v.join("|")})\\b`,"g");e=e.replace(x,'<span class="syn-kw">$1</span>'),e=e.replace(/\b(\d+\.?\d*)\b/g,'<span class="syn-num">$1</span>'),e=e.replace(/(\w+)\(/g,'<span class="syn-fn">$1</span>(')}return e}function P(d){j(),c.value=d}function A(){var d;j(),(d=navigator.clipboard)==null||d.writeText(k.value),u.value=!0,setTimeout(()=>u.value=!1,1800)}return D(()=>p.tabs,()=>{c.value=0}),(d,r)=>(o(),l("div",U,[a("div",z,[a("div",K,[(o(!0),l(h,null,b(T.tabs,(e,v)=>(o(),l("button",{key:v,class:N(["cb-tab",{active:c.value===v}]),onClick:x=>P(v)},n(e.lang),11,J))),128))]),a("button",{class:"cb-copy",onClick:A,title:"复制代码"},[u.value?(o(),l("svg",G,[...r[1]||(r[1]=[a("path",{d:"m3 7 3 3 5-6",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])])):(o(),l("svg",F,[...r[0]||(r[0]=[a("rect",{x:"4",y:"4",width:"8",height:"8",rx:"1.5",stroke:"currentColor","stroke-width":"1.3"},null,-1),a("path",{d:"M2 9V3a1 1 0 0 1 1-1h6",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},null,-1)])])),a("span",X,n(u.value?"已复制":"复制"),1)])]),a("div",Y,[a("pre",Q,[a("code",{innerHTML:q.value},null,8,W)])])]))}},g=$(Z,[["__scopeId","data-v-8bd5e993"]]),aa={class:"docs-page"},sa={class:"docs-sidebar"},ea={class:"ds-inner"},ta={class:"ds-nav"},na=["href","onClick"],da={class:"docs-content"},oa={class:"dc-wrap"},la={class:"dc-head"},ia={class:"eyebrow"},ca={class:"display dc-title"},ra={class:"dc-intro"},pa={id:"quickstart",class:"doc-section"},va={id:"chat",class:"doc-section"},ma={class:"param-table-wrap"},ua={class:"param-table"},fa={class:"mono"},ga={class:"mono"},ha={id:"params",class:"doc-section"},ba={class:"param-table-wrap"},xa={class:"param-table"},ya={class:"mono"},ka={class:"mono"},_a={class:"mono"},Ta={id:"streaming",class:"doc-section"},wa={id:"vision",class:"doc-section"},qa={id:"embeddings",class:"doc-section"},Ia={id:"models-list",class:"doc-section"},Pa={id:"errors",class:"doc-section"},Aa={class:"param-table-wrap"},Sa={class:"param-table"},Ca={class:"mono err-code"},Oa={id:"sdks",class:"doc-section"},ja={class:"sdk-grid"},Ba={class:"sdk-name serif"},$a={class:"sdk-lang mono"},Na={class:"sdk-code mono"},Da={class:"doc-end"},Ea={class:"doc-end-text"},Ra={__name:"DocsView",setup(T){const p=B("quickstart"),c=[{id:"quickstart",label:"快速开始"},{id:"auth",label:"认证"},{id:"chat",label:"对话补全"},{id:"params",label:"参数调优"},{id:"streaming",label:"流式输出"},{id:"vision",label:"多模态视觉"},{id:"embeddings",label:"向量嵌入"},{id:"models-list",label:"模型列表"},{id:"errors",label:"错误码"},{id:"sdks",label:"SDK 兼容"}],u=[{name:"model",type:"string",required:!0,desc:"模型 ID，如 meta/llama-3.3-70b-instruct"},{name:"messages",type:"array",required:!0,desc:"消息数组，含 role 与 content 字段"},{name:"temperature",type:"float",required:!1,desc:"采样温度 0-2，控制随机性，详见参数调优"},{name:"top_p",type:"float",required:!1,desc:"核采样阈值 0-1，控制词汇范围，详见参数调优"},{name:"max_tokens",type:"int",required:!1,desc:"最大生成 token 数，控制回复长度，详见参数调优"},{name:"stream",type:"bool",required:!1,desc:"是否流式输出，默认 false"}],k=[{code:"400",meaning:"请求参数错误",advice:"检查 model ID、messages 格式与参数范围"},{code:"401",meaning:"认证失败",advice:"确认 API Key 正确且未过期"},{code:"404",meaning:"模型不存在",advice:"检查 model ID 拼写，或调用 /v1/models 获取列表"},{code:"422",meaning:"输入不支持",advice:"如向非视觉模型发送图片，检查模型能力"},{code:"429",meaning:"请求频率超限",advice:"降低并发，添加重试退避策略"},{code:"500",meaning:"服务端错误",advice:"稍后重试，如持续请联系 NVIDIA 支持"}],w=[{scene:"代码生成",temp:"0.2",topP:"0.95",maxT:"4096"},{scene:"日常对话",temp:"0.6",topP:"0.95",maxT:"2048"},{scene:"创意写作",temp:"0.9",topP:"0.98",maxT:"4096"},{scene:"事实问答",temp:"0.1",topP:"0.50",maxT:"1024"},{scene:"翻译任务",temp:"0.3",topP:"0.95",maxT:"2048"},{scene:"数据提取",temp:"0.0",topP:"0.30",maxT:"1024"},{scene:"长文生成",temp:"0.7",topP:"0.95",maxT:"8192"},{scene:"摘要总结",temp:"0.5",topP:"0.90",maxT:"1024"}],q=[{name:"Python",lang:"openai >= 1.0",code:`from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-xxxx"
)

resp = client.chat.completions.create(
    model="meta/llama-3.3-70b-instruct",
    messages=[{"role": "user", "content": "你好"}],
)`},{name:"JavaScript",lang:"openai npm",code:`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: "nvapi-xxxx"
});

const resp = await client.chat.completions.create({
  model: "meta/llama-3.3-70b-instruct",
  messages: [{ role: "user", content: "你好" }]
});`},{name:"LangChain",lang:"langchain-openai",code:`from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-xxxx",
    model="meta/llama-3.3-70b-instruct"
)

print(llm.invoke("你好"))`}],I=[{lang:"cURL",code:`curl -X POST https://integrate.api.nvidia.com/v1/chat/completions \\
  -H "Authorization: Bearer nvapi-xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "meta/llama-3.3-70b-instruct",
    "messages": [{"role": "user", "content": "你好"}],
    "max_tokens": 512
  }'`},{lang:"Python",code:`from openai import OpenAI

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key="nvapi-xxxx"
)

resp = client.chat.completions.create(
    model="meta/llama-3.3-70b-instruct",
    messages=[{"role": "user", "content": "你好"}]
)
print(resp.choices[0].message.content)`},{lang:"JavaScript",code:`const res = await fetch(
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
console.log(data.choices[0].message.content);`}],P=[{lang:"cURL",code:`curl -X POST https://integrate.api.nvidia.com/v1/chat/completions \\
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
  }'`},{lang:"Python",code:`resp = client.chat.completions.create(
    model="deepseek-ai/deepseek-v4-pro",
    messages=[
        {"role": "system", "content": "你是专业翻译"},
        {"role": "user", "content": "翻译：人工智能"}
    ],
    temperature=0.3,
    top_p=0.95,
    max_tokens=1024
)
print(resp.choices[0].message.content)`}],A=[{lang:"Python",code:`stream = client.chat.completions.create(
    model="meta/llama-3.3-70b-instruct",
    messages=[{"role": "user", "content": "讲个故事"}],
    stream=True
)

for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)`},{lang:"JavaScript",code:`const res = await fetch(
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
}`}],d=[{lang:"Python",code:`resp = client.chat.completions.create(
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
print(resp.choices[0].message.content)`},{lang:"JSON",code:`{
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
}`}],r=[{lang:"cURL",code:`curl -X POST https://integrate.api.nvidia.com/v1/embeddings \\
  -H "Authorization: Bearer nvapi-xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "baai/bge-m3",
    "input": "人工智能改变世界",
    "input_type": "query"
  }'`},{lang:"Python",code:`resp = client.embeddings.create(
    model="baai/bge-m3",
    input="人工智能改变世界"
)
vector = resp.data[0].embedding
print(f"维度: {len(vector)}")`}],e=[{lang:"cURL",code:`curl https://integrate.api.nvidia.com/v1/models \\
  -H "Authorization: Bearer nvapi-xxxx"`},{lang:"Python",code:`models = client.models.list()
for m in models.data:
    print(m.id)`}];function v(_){j();const s=document.getElementById(_);if(!s)return;const f=s.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:f,behavior:"smooth"})}function x(){const _=window.scrollY+120;for(let s=c.length-1;s>=0;s--){const f=document.getElementById(c[s].id);if(f&&f.getBoundingClientRect().top+window.scrollY<=_){p.value=c[s].id;return}}p.value=c[0].id}return E(()=>window.addEventListener("scroll",x,{passive:!0})),R(()=>window.removeEventListener("scroll",x)),(_,s)=>{const f=M("router-link"),S=V("reveal");return o(),l("div",aa,[a("aside",sa,[a("div",ea,[s[0]||(s[0]=a("div",{class:"ds-title mono"},"DOCUMENTATION",-1)),a("nav",ta,[(o(),l(h,null,b(c,t=>a("a",{key:t.id,href:`#${t.id}`,class:N(["ds-link",{active:p.value===t.id}]),onClick:H(La=>v(t.id),["prevent"])},n(t.label),11,na)),64))])])]),a("main",da,[a("div",oa,[a("section",la,[O((o(),l("span",ia,[...s[1]||(s[1]=[i("API REFERENCE",-1)])])),[[S]]),O((o(),l("h1",ca,[...s[2]||(s[2]=[i("开发文档",-1)])])),[[S,60]]),O((o(),l("p",ra,[...s[3]||(s[3]=[i(" 星皓 XINHAO 基于 NVIDIA NIM 构建，完全兼容 OpenAI API 格式。 只需修改 base_url 与 model 字段，即可无缝切换至 NVIDIA 加速推理。 ",-1)])])),[[S,120]])]),a("section",pa,[s[4]||(s[4]=y('<h2 class="doc-h2 serif" data-v-93ad127f>快速开始</h2><p class="doc-p" data-v-93ad127f>端点地址与认证方式：</p><div class="info-grid" data-v-93ad127f><div class="info-item" data-v-93ad127f><div class="info-k mono" data-v-93ad127f>Base URL</div><div class="info-v mono" data-v-93ad127f>https://integrate.api.nvidia.com/v1</div></div><div class="info-item" data-v-93ad127f><div class="info-k mono" data-v-93ad127f>认证方式</div><div class="info-v" data-v-93ad127f>Bearer Token（API Key）</div></div><div class="info-item" data-v-93ad127f><div class="info-k mono" data-v-93ad127f>协议</div><div class="info-v" data-v-93ad127f>HTTPS · RESTful · SSE</div></div><div class="info-item" data-v-93ad127f><div class="info-k mono" data-v-93ad127f>兼容性</div><div class="info-v" data-v-93ad127f>OpenAI API 100% 兼容</div></div></div><p class="doc-p" data-v-93ad127f>三行代码发起第一次请求：</p>',4)),m(g,{tabs:I})]),s[31]||(s[31]=y('<section id="auth" class="doc-section" data-v-93ad127f><h2 class="doc-h2 serif" data-v-93ad127f>认证</h2><p class="doc-p" data-v-93ad127f> 所有请求需在 Header 中携带 API Key。NVIDIA NIM 使用 Bearer Token 认证， 格式为 <code class="inline-code" data-v-93ad127f>Authorization: Bearer nvapi-xxxx</code>。 </p><div class="callout" data-v-93ad127f><div class="callout-icon" data-v-93ad127f>!</div><div class="callout-body" data-v-93ad127f><strong data-v-93ad127f>安全提示：</strong>API Key 等同于账户凭证，请勿在前端代码中硬编码或提交至版本控制。生产环境应通过后端代理转发请求。 </div></div></section>',1)),a("section",va,[s[6]||(s[6]=a("h2",{class:"doc-h2 serif"},"对话补全",-1)),s[7]||(s[7]=a("p",{class:"doc-p"},[a("code",{class:"inline-code"},"POST /v1/chat/completions"),i(" —— 核心接口，支持流式与非流式响应。 ")],-1)),s[8]||(s[8]=a("h3",{class:"doc-h3 serif"},"请求参数",-1)),a("div",ma,[a("table",ua,[s[5]||(s[5]=a("thead",null,[a("tr",null,[a("th",null,"参数"),a("th",null,"类型"),a("th",null,"必填"),a("th",null,"说明")])],-1)),a("tbody",null,[(o(),l(h,null,b(u,t=>a("tr",{key:t.name},[a("td",fa,n(t.name),1),a("td",ga,n(t.type),1),a("td",null,n(t.required?"是":"否"),1),a("td",null,n(t.desc),1)])),64))])])]),s[9]||(s[9]=a("h3",{class:"doc-h3 serif"},"示例",-1)),m(g,{tabs:P})]),a("section",ha,[s[11]||(s[11]=y('<h2 class="doc-h2 serif" data-v-93ad127f>参数调优</h2><p class="doc-p" data-v-93ad127f> 三个核心参数控制 AI 的生成行为：<strong data-v-93ad127f>Temperature</strong>、<strong data-v-93ad127f>Top P</strong> 和 <strong data-v-93ad127f>Max Tokens</strong>。 理解它们的含义与取值影响，是获得高质量回答的关键。 </p><div class="param-detail" data-v-93ad127f><div class="pd-header" data-v-93ad127f><span class="pd-name serif" data-v-93ad127f>Temperature</span><span class="pd-range mono" data-v-93ad127f>0.0 — 2.0</span><span class="pd-default mono" data-v-93ad127f>默认 0.6</span></div><p class="pd-desc" data-v-93ad127f> 控制生成结果的<strong data-v-93ad127f>随机性与创造性</strong>。模型在每一步预测下一个 token 时， 会根据概率分布进行采样；Temperature 对这个分布进行缩放——值越低，模型越倾向于选择高概率词汇， 输出更确定、保守；值越高，低概率词汇被选中的机会增大，输出更多样、富有创意。 </p><div class="pd-guide" data-v-93ad127f><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>0.0 — 0.3</span><span class="pd-effect" data-v-93ad127f>精确、确定性强。适合代码生成、数据提取、事实问答、翻译等需要准确性的任务</span></div><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>0.4 — 0.7</span><span class="pd-effect" data-v-93ad127f>平衡模式。兼顾准确性与灵活性，适合日常对话、内容总结、通用问答</span></div><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>0.8 — 1.2</span><span class="pd-effect" data-v-93ad127f>发散创意。适合创意写作、头脑风暴、广告文案、故事创作</span></div><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>1.3 — 2.0</span><span class="pd-effect" data-v-93ad127f>高度随机。输出可能不连贯或偏离主题，仅在特殊场景下使用</span></div></div><div class="callout" data-v-93ad127f><div class="callout-icon" data-v-93ad127f>!</div><div class="callout-body" data-v-93ad127f><strong data-v-93ad127f>设置建议：</strong>如果回答出现&quot;胡说八道&quot;或偏离事实，降低 Temperature；如果回答太死板、千篇一律，适当提高。大多数场景下 0.3-0.7 是最佳区间。 </div></div></div><div class="param-detail" data-v-93ad127f><div class="pd-header" data-v-93ad127f><span class="pd-name serif" data-v-93ad127f>Top P</span><span class="pd-range mono" data-v-93ad127f>0.0 — 1.0</span><span class="pd-default mono" data-v-93ad127f>默认 0.95</span></div><p class="pd-desc" data-v-93ad127f> 又称<strong data-v-93ad127f>核采样（Nucleus Sampling）</strong>。模型先按概率从高到低排列所有候选 token， 然后选择累计概率达到 P 值的最小 token 集合，只在这个集合中采样。P=0.95 表示只考虑概率前 95% 的词汇， 排除了尾部极低概率的&quot;噪声词&quot;。与 Temperature 不同，Top P 是在<strong data-v-93ad127f>词汇范围</strong>上做截断， 而非改变概率分布形状。 </p><div class="pd-guide" data-v-93ad127f><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>0.1 — 0.5</span><span class="pd-effect" data-v-93ad127f>仅从高概率词汇中选择，输出聚焦且保守。适合专业领域问答、结构化输出</span></div><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>0.6 — 0.9</span><span class="pd-effect" data-v-93ad127f>允许适度多样性，兼顾准确与自然。适合大多数对话场景</span></div><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>0.9 — 1.0</span><span class="pd-effect" data-v-93ad127f>几乎不截断，模型可从全部词汇中选择。适合创意写作、开放式讨论</span></div></div><div class="callout" data-v-93ad127f><div class="callout-icon" data-v-93ad127f>!</div><div class="callout-body" data-v-93ad127f><strong data-v-93ad127f>Temperature vs Top P：</strong>两者都控制随机性，但机制不同。通常<strong data-v-93ad127f>只需调整其中一个</strong>即可—— 建议固定 Top P=0.95，通过调节 Temperature 来控制创造性；或固定 Temperature=0.7，通过调节 Top P 来控制词汇范围。两者同时调高可能导致输出不可控。 </div></div></div><div class="param-detail" data-v-93ad127f><div class="pd-header" data-v-93ad127f><span class="pd-name serif" data-v-93ad127f>Max Tokens</span><span class="pd-range mono" data-v-93ad127f>256 — 8192</span><span class="pd-default mono" data-v-93ad127f>默认 2048</span></div><p class="pd-desc" data-v-93ad127f> 限制模型单次回复的<strong data-v-93ad127f>最大 token 数量</strong>。一个 token 大约对应 0.5-1 个中文字符或 1 个英文单词。 当生成达到此上限时，模型会立即停止输出，即使回答尚未完成。这个参数直接影响<strong data-v-93ad127f>回复长度和 API 费用</strong>—— token 数越多，生成时间越长、消耗资源越多。 </p><div class="pd-guide" data-v-93ad127f><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>256 — 512</span><span class="pd-effect" data-v-93ad127f>短回复。适合简单问答、单句翻译、关键词提取、分类判断</span></div><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>1024 — 2048</span><span class="pd-effect" data-v-93ad127f>中等长度。适合日常对话、文章摘要、代码片段、解释说明</span></div><div class="pd-row" data-v-93ad127f><span class="pd-val mono" data-v-93ad127f>4096 — 8192</span><span class="pd-effect" data-v-93ad127f>长文输出。适合长篇文章生成、完整代码文件、详细技术方案、多步骤推理</span></div></div><div class="callout" data-v-93ad127f><div class="callout-icon" data-v-93ad127f>!</div><div class="callout-body" data-v-93ad127f><strong data-v-93ad127f>注意事项：</strong>Max Tokens 是上限而非目标——模型可能在远未达到上限时就自然结束。设置过小会导致回答被截断（表现为突然中断或末尾不完整）；设置过大则无实质副作用，但会增加最大计费上限。建议根据任务复杂度合理设置。 </div></div></div><h3 class="doc-h3 serif" data-v-93ad127f>速查表</h3>',6)),a("div",ba,[a("table",xa,[s[10]||(s[10]=a("thead",null,[a("tr",null,[a("th",null,"任务场景"),a("th",null,"Temperature"),a("th",null,"Top P"),a("th",null,"Max Tokens")])],-1)),a("tbody",null,[(o(),l(h,null,b(w,t=>a("tr",{key:t.scene},[a("td",null,n(t.scene),1),a("td",ya,n(t.temp),1),a("td",ka,n(t.topP),1),a("td",_a,n(t.maxT),1)])),64))])])])]),a("section",Ta,[s[12]||(s[12]=y('<h2 class="doc-h2 serif" data-v-93ad127f>流式输出</h2><p class="doc-p" data-v-93ad127f> 设置 <code class="inline-code" data-v-93ad127f>&quot;stream&quot;: true</code> 即可启用 SSE（Server-Sent Events）流式响应。 每个 chunk 以 <code class="inline-code" data-v-93ad127f>data: </code> 前缀传输，以 <code class="inline-code" data-v-93ad127f>data: [DONE]</code> 结束。 </p>',2)),m(g,{tabs:A}),s[13]||(s[13]=y(`<h3 class="doc-h3 serif" data-v-93ad127f>SSE 响应格式</h3><pre class="raw-pre mono" data-v-93ad127f><code data-v-93ad127f>data: {<span class="json-key" data-v-93ad127f>&quot;id&quot;</span>:<span class="json-str" data-v-93ad127f>&quot;chatcmpl-xxx&quot;</span>,<span class="json-key" data-v-93ad127f>&quot;choices&quot;</span>:[{<span class="json-key" data-v-93ad127f>&quot;delta&quot;</span>:{<span class="json-key" data-v-93ad127f>&quot;content&quot;</span>:<span class="json-str" data-v-93ad127f>&quot;你&quot;</span>},<span class="json-key" data-v-93ad127f>&quot;index&quot;</span>:0}]}

data: {<span class="json-key" data-v-93ad127f>&quot;id&quot;</span>:<span class="json-str" data-v-93ad127f>&quot;chatcmpl-xxx&quot;</span>,<span class="json-key" data-v-93ad127f>&quot;choices&quot;</span>:[{<span class="json-key" data-v-93ad127f>&quot;delta&quot;</span>:{<span class="json-key" data-v-93ad127f>&quot;content&quot;</span>:<span class="json-str" data-v-93ad127f>&quot;好&quot;</span>},<span class="json-key" data-v-93ad127f>&quot;index&quot;</span>:0}]}

data: [DONE]</code></pre>`,2))]),a("section",wa,[s[14]||(s[14]=a("h2",{class:"doc-h2 serif"},"多模态（视觉）",-1)),s[15]||(s[15]=a("p",{class:"doc-p"},[i(" 视觉模型（如 Llama 3.2 Vision、Gemma 3 等）支持图片输入。 使用 "),a("code",{class:"inline-code"},"content"),i(" 数组格式，混合文本与图片。 ")],-1)),m(g,{tabs:d}),s[16]||(s[16]=a("p",{class:"doc-p"}," 图片支持 Base64 Data URL 或公开 URL 两种格式。 建议单张图片不超过 10MB，长边不超过 4096px。 ",-1))]),a("section",qa,[s[17]||(s[17]=a("h2",{class:"doc-h2 serif"},"向量嵌入",-1)),s[18]||(s[18]=a("p",{class:"doc-p"},[a("code",{class:"inline-code"},"POST /v1/embeddings"),i(" —— 将文本编码为高维向量，用于 RAG 检索与语义相似度计算。 ")],-1)),m(g,{tabs:r})]),a("section",Ia,[s[19]||(s[19]=a("h2",{class:"doc-h2 serif"},"模型列表",-1)),s[20]||(s[20]=a("p",{class:"doc-p"},[a("code",{class:"inline-code"},"GET /v1/models"),i(" —— 获取所有可用模型 ID。 ")],-1)),m(g,{tabs:e})]),a("section",Pa,[s[22]||(s[22]=a("h2",{class:"doc-h2 serif"},"错误码",-1)),a("div",Aa,[a("table",Sa,[s[21]||(s[21]=a("thead",null,[a("tr",null,[a("th",null,"状态码"),a("th",null,"含义"),a("th",null,"处理建议")])],-1)),a("tbody",null,[(o(),l(h,null,b(k,t=>a("tr",{key:t.code},[a("td",Ca,n(t.code),1),a("td",null,n(t.meaning),1),a("td",null,n(t.advice),1)])),64))])])])]),a("section",Oa,[s[23]||(s[23]=a("h2",{class:"doc-h2 serif"},"SDK 兼容",-1)),s[24]||(s[24]=a("p",{class:"doc-p"},"由于完全兼容 OpenAI API，可直接使用以下官方 SDK：",-1)),a("div",ja,[(o(),l(h,null,b(q,t=>a("div",{class:"sdk-card",key:t.name},[a("div",Ba,n(t.name),1),a("div",$a,n(t.lang),1),a("pre",Na,n(t.code),1)])),64))])]),a("section",Da,[s[30]||(s[30]=a("hr",{class:"hairline"},null,-1)),a("p",Ea,[s[26]||(s[26]=i(" 更多模型与能力，请访问 ",-1)),s[27]||(s[27]=a("a",{href:"https://build.nvidia.com/models",target:"_blank",rel:"noopener",class:"doc-link"},"NVIDIA Build",-1)),s[28]||(s[28]=i(" 或直接前往 ",-1)),m(f,{to:"/playground",class:"doc-link"},{default:L(()=>[...s[25]||(s[25]=[i("在线体验",-1)])]),_:1}),s[29]||(s[29]=i(" 。 ",-1))])])])])])}}},Va=$(Ra,[["__scopeId","data-v-93ad127f"]]);export{Va as default};
