import{_ as $,z as N,a as c,c as i,b as e,F as y,r as f,s as P,t as o,p as j,j as B,i as C,o as D,m as E,w as O,e as l,g as x,d as v,f as R,h as L,k as V,B as H}from"./index-4yZ8hObk.js";const U={class:"code-block"},z={class:"cb-bar"},M={class:"cb-tabs"},K=["onClick"],J={key:0,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none"},F={key:1,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none"},X={class:"cb-copy-text"},Y={class:"cb-code-wrap"},G={class:"cb-pre mono"},Q=["innerHTML"],W={__name:"CodeBlock",props:{tabs:{type:Array,required:!0}},setup(_){const m=_,d=B(0),g=B(!1),k=C(()=>{var n;return((n=m.tabs[d.value])==null?void 0:n.code)||""}),w=C(()=>{var n;return((n=m.tabs[d.value])==null?void 0:n.lang)||""}),q=C(()=>I(k.value,w.value));function I(n,r){let s=n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");if(r==="JSON")s=s.replace(/"([^"]+)":/g,'<span class="syn-key">"$1"</span>:'),s=s.replace(/: "([^"]*)"/g,': <span class="syn-str">"$1"</span>'),s=s.replace(/: (\d+)/g,': <span class="syn-num">$1</span>'),s=s.replace(/\b(true|false|null)\b/g,'<span class="syn-bool">$1</span>');else{s=s.replace(/(#[^\n]*)/g,'<span class="syn-comment">$1</span>'),s=s.replace(/(\/\/[^\n]*)/g,'<span class="syn-comment">$1</span>'),s=s.replace(/("(?:[^"\\]|\\.)*")/g,'<span class="syn-str">$1</span>'),s=s.replace(/('(?:[^'\\]|\\.)*')/g,'<span class="syn-str">$1</span>');const p=["import","from","const","let","var","function","return","if","else","for","while","class","new","await","async","def","print","True","False","None","self","in","not","and","or","is","None"],u=new RegExp(`\\b(${p.join("|")})\\b`,"g");s=s.replace(u,'<span class="syn-kw">$1</span>'),s=s.replace(/\b(\d+\.?\d*)\b/g,'<span class="syn-num">$1</span>'),s=s.replace(/(\w+)\(/g,'<span class="syn-fn">$1</span>(')}return s}function T(n){j(),d.value=n}function A(){var n;j(),(n=navigator.clipboard)==null||n.writeText(k.value),g.value=!0,setTimeout(()=>g.value=!1,1800)}return N(()=>m.tabs,()=>{d.value=0}),(n,r)=>(c(),i("div",U,[e("div",z,[e("div",M,[(c(!0),i(y,null,f(_.tabs,(s,p)=>(c(),i("button",{key:p,class:P(["cb-tab",{active:d.value===p}]),onClick:u=>T(p)},o(s.lang),11,K))),128))]),e("button",{class:"cb-copy",onClick:A,title:"复制代码"},[g.value?(c(),i("svg",F,[...r[1]||(r[1]=[e("path",{d:"m3 7 3 3 5-6",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])])):(c(),i("svg",J,[...r[0]||(r[0]=[e("rect",{x:"4",y:"4",width:"8",height:"8",rx:"1.5",stroke:"currentColor","stroke-width":"1.3"},null,-1),e("path",{d:"M2 9V3a1 1 0 0 1 1-1h6",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},null,-1)])])),e("span",X,o(g.value?"已复制":"复制"),1)])]),e("div",Y,[e("pre",G,[e("code",{innerHTML:q.value},null,8,Q)])])]))}},b=$(W,[["__scopeId","data-v-8bd5e993"]]),Z={class:"docs-page"},ee={class:"docs-sidebar"},ae={class:"ds-inner"},se={class:"ds-nav"},te=["href","onClick"],ne={class:"docs-content"},oe={class:"dc-wrap"},ce={class:"dc-head"},ie={class:"eyebrow"},le={class:"display dc-title"},de={class:"dc-intro"},re={id:"quickstart",class:"doc-section"},pe={id:"chat",class:"doc-section"},me={class:"param-table-wrap"},ue={class:"param-table"},ve={class:"mono"},ge={class:"mono"},he={id:"streaming",class:"doc-section"},be={id:"vision",class:"doc-section"},ye={id:"embeddings",class:"doc-section"},fe={id:"models-list",class:"doc-section"},ke={id:"errors",class:"doc-section"},xe={class:"param-table-wrap"},_e={class:"param-table"},we={class:"mono err-code"},qe={id:"sdks",class:"doc-section"},Ie={class:"sdk-grid"},Te={class:"sdk-name serif"},Ae={class:"sdk-lang mono"},Se={class:"sdk-code mono"},Ce={class:"doc-end"},Oe={class:"doc-end-text"},je={__name:"DocsView",setup(_){const m=B("quickstart"),d=[{id:"quickstart",label:"快速开始"},{id:"auth",label:"认证"},{id:"chat",label:"对话补全"},{id:"streaming",label:"流式输出"},{id:"vision",label:"多模态视觉"},{id:"embeddings",label:"向量嵌入"},{id:"models-list",label:"模型列表"},{id:"errors",label:"错误码"},{id:"sdks",label:"SDK 兼容"}],g=[{name:"model",type:"string",required:!0,desc:"模型 ID，如 meta/llama-3.3-70b-instruct"},{name:"messages",type:"array",required:!0,desc:"消息数组，含 role 与 content 字段"},{name:"temperature",type:"float",required:!1,desc:"采样温度 0-2，越高越发散，默认 0.6"},{name:"top_p",type:"float",required:!1,desc:"核采样阈值 0-1，默认 0.95"},{name:"max_tokens",type:"int",required:!1,desc:"最大生成 token 数，默认 2048"},{name:"stream",type:"bool",required:!1,desc:"是否流式输出，默认 false"}],k=[{code:"400",meaning:"请求参数错误",advice:"检查 model ID、messages 格式与参数范围"},{code:"401",meaning:"认证失败",advice:"确认 API Key 正确且未过期"},{code:"404",meaning:"模型不存在",advice:"检查 model ID 拼写，或调用 /v1/models 获取列表"},{code:"422",meaning:"输入不支持",advice:"如向非视觉模型发送图片，检查模型能力"},{code:"429",meaning:"请求频率超限",advice:"降低并发，添加重试退避策略"},{code:"500",meaning:"服务端错误",advice:"稍后重试，如持续请联系 NVIDIA 支持"}],w=[{name:"Python",lang:"openai >= 1.0",code:`from openai import OpenAI

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

print(llm.invoke("你好"))`}],q=[{lang:"cURL",code:`curl -X POST https://integrate.api.nvidia.com/v1/chat/completions \\
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
console.log(data.choices[0].message.content);`}],I=[{lang:"cURL",code:`curl -X POST https://integrate.api.nvidia.com/v1/chat/completions \\
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
print(resp.choices[0].message.content)`}],T=[{lang:"Python",code:`stream = client.chat.completions.create(
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
}`}],A=[{lang:"Python",code:`resp = client.chat.completions.create(
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
}`}],n=[{lang:"cURL",code:`curl -X POST https://integrate.api.nvidia.com/v1/embeddings \\
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
print(f"维度: {len(vector)}")`}],r=[{lang:"cURL",code:`curl https://integrate.api.nvidia.com/v1/models \\
  -H "Authorization: Bearer nvapi-xxxx"`},{lang:"Python",code:`models = client.models.list()
for m in models.data:
    print(m.id)`}];function s(u){j();const a=document.getElementById(u);if(!a)return;const h=a.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:h,behavior:"smooth"})}function p(){const u=window.scrollY+120;for(let a=d.length-1;a>=0;a--){const h=document.getElementById(d[a].id);if(h&&h.getBoundingClientRect().top+window.scrollY<=u){m.value=d[a].id;return}}m.value=d[0].id}return D(()=>window.addEventListener("scroll",p,{passive:!0})),E(()=>window.removeEventListener("scroll",p)),(u,a)=>{const h=L("router-link"),S=V("reveal");return c(),i("div",Z,[e("aside",ee,[e("div",ae,[a[0]||(a[0]=e("div",{class:"ds-title mono"},"DOCUMENTATION",-1)),e("nav",se,[(c(),i(y,null,f(d,t=>e("a",{key:t.id,href:`#${t.id}`,class:P(["ds-link",{active:m.value===t.id}]),onClick:H(Be=>s(t.id),["prevent"])},o(t.label),11,te)),64))])])]),e("main",ne,[e("div",oe,[e("section",ce,[O((c(),i("span",ie,[...a[1]||(a[1]=[l("API REFERENCE",-1)])])),[[S]]),O((c(),i("h1",le,[...a[2]||(a[2]=[l("开发文档",-1)])])),[[S,60]]),O((c(),i("p",de,[...a[3]||(a[3]=[l(" 星皓 XINHAO 基于 NVIDIA NIM 构建，完全兼容 OpenAI API 格式。 只需修改 base_url 与 model 字段，即可无缝切换至 NVIDIA 加速推理。 ",-1)])])),[[S,120]])]),e("section",re,[a[4]||(a[4]=x('<h2 class="doc-h2 serif" data-v-27a8ca0c>快速开始</h2><p class="doc-p" data-v-27a8ca0c>端点地址与认证方式：</p><div class="info-grid" data-v-27a8ca0c><div class="info-item" data-v-27a8ca0c><div class="info-k mono" data-v-27a8ca0c>Base URL</div><div class="info-v mono" data-v-27a8ca0c>https://integrate.api.nvidia.com/v1</div></div><div class="info-item" data-v-27a8ca0c><div class="info-k mono" data-v-27a8ca0c>认证方式</div><div class="info-v" data-v-27a8ca0c>Bearer Token（API Key）</div></div><div class="info-item" data-v-27a8ca0c><div class="info-k mono" data-v-27a8ca0c>协议</div><div class="info-v" data-v-27a8ca0c>HTTPS · RESTful · SSE</div></div><div class="info-item" data-v-27a8ca0c><div class="info-k mono" data-v-27a8ca0c>兼容性</div><div class="info-v" data-v-27a8ca0c>OpenAI API 100% 兼容</div></div></div><p class="doc-p" data-v-27a8ca0c>三行代码发起第一次请求：</p>',4)),v(b,{tabs:q})]),a[29]||(a[29]=x('<section id="auth" class="doc-section" data-v-27a8ca0c><h2 class="doc-h2 serif" data-v-27a8ca0c>认证</h2><p class="doc-p" data-v-27a8ca0c> 所有请求需在 Header 中携带 API Key。NVIDIA NIM 使用 Bearer Token 认证， 格式为 <code class="inline-code" data-v-27a8ca0c>Authorization: Bearer nvapi-xxxx</code>。 </p><div class="callout" data-v-27a8ca0c><div class="callout-icon" data-v-27a8ca0c>!</div><div class="callout-body" data-v-27a8ca0c><strong data-v-27a8ca0c>安全提示：</strong>API Key 等同于账户凭证，请勿在前端代码中硬编码或提交至版本控制。生产环境应通过后端代理转发请求。 </div></div></section>',1)),e("section",pe,[a[6]||(a[6]=e("h2",{class:"doc-h2 serif"},"对话补全",-1)),a[7]||(a[7]=e("p",{class:"doc-p"},[e("code",{class:"inline-code"},"POST /v1/chat/completions"),l(" —— 核心接口，支持流式与非流式响应。 ")],-1)),a[8]||(a[8]=e("h3",{class:"doc-h3 serif"},"请求参数",-1)),e("div",me,[e("table",ue,[a[5]||(a[5]=e("thead",null,[e("tr",null,[e("th",null,"参数"),e("th",null,"类型"),e("th",null,"必填"),e("th",null,"说明")])],-1)),e("tbody",null,[(c(),i(y,null,f(g,t=>e("tr",{key:t.name},[e("td",ve,o(t.name),1),e("td",ge,o(t.type),1),e("td",null,o(t.required?"是":"否"),1),e("td",null,o(t.desc),1)])),64))])])]),a[9]||(a[9]=e("h3",{class:"doc-h3 serif"},"示例",-1)),v(b,{tabs:I})]),e("section",he,[a[10]||(a[10]=x('<h2 class="doc-h2 serif" data-v-27a8ca0c>流式输出</h2><p class="doc-p" data-v-27a8ca0c> 设置 <code class="inline-code" data-v-27a8ca0c>&quot;stream&quot;: true</code> 即可启用 SSE（Server-Sent Events）流式响应。 每个 chunk 以 <code class="inline-code" data-v-27a8ca0c>data: </code> 前缀传输，以 <code class="inline-code" data-v-27a8ca0c>data: [DONE]</code> 结束。 </p>',2)),v(b,{tabs:T}),a[11]||(a[11]=x(`<h3 class="doc-h3 serif" data-v-27a8ca0c>SSE 响应格式</h3><pre class="raw-pre mono" data-v-27a8ca0c><code data-v-27a8ca0c>data: {<span class="json-key" data-v-27a8ca0c>&quot;id&quot;</span>:<span class="json-str" data-v-27a8ca0c>&quot;chatcmpl-xxx&quot;</span>,<span class="json-key" data-v-27a8ca0c>&quot;choices&quot;</span>:[{<span class="json-key" data-v-27a8ca0c>&quot;delta&quot;</span>:{<span class="json-key" data-v-27a8ca0c>&quot;content&quot;</span>:<span class="json-str" data-v-27a8ca0c>&quot;你&quot;</span>},<span class="json-key" data-v-27a8ca0c>&quot;index&quot;</span>:0}]}

data: {<span class="json-key" data-v-27a8ca0c>&quot;id&quot;</span>:<span class="json-str" data-v-27a8ca0c>&quot;chatcmpl-xxx&quot;</span>,<span class="json-key" data-v-27a8ca0c>&quot;choices&quot;</span>:[{<span class="json-key" data-v-27a8ca0c>&quot;delta&quot;</span>:{<span class="json-key" data-v-27a8ca0c>&quot;content&quot;</span>:<span class="json-str" data-v-27a8ca0c>&quot;好&quot;</span>},<span class="json-key" data-v-27a8ca0c>&quot;index&quot;</span>:0}]}

data: [DONE]</code></pre>`,2))]),e("section",be,[a[12]||(a[12]=e("h2",{class:"doc-h2 serif"},"多模态（视觉）",-1)),a[13]||(a[13]=e("p",{class:"doc-p"},[l(" 视觉模型（如 Llama 3.2 Vision、Gemma 3 等）支持图片输入。 使用 "),e("code",{class:"inline-code"},"content"),l(" 数组格式，混合文本与图片。 ")],-1)),v(b,{tabs:A}),a[14]||(a[14]=e("p",{class:"doc-p"}," 图片支持 Base64 Data URL 或公开 URL 两种格式。 建议单张图片不超过 10MB，长边不超过 4096px。 ",-1))]),e("section",ye,[a[15]||(a[15]=e("h2",{class:"doc-h2 serif"},"向量嵌入",-1)),a[16]||(a[16]=e("p",{class:"doc-p"},[e("code",{class:"inline-code"},"POST /v1/embeddings"),l(" —— 将文本编码为高维向量，用于 RAG 检索与语义相似度计算。 ")],-1)),v(b,{tabs:n})]),e("section",fe,[a[17]||(a[17]=e("h2",{class:"doc-h2 serif"},"模型列表",-1)),a[18]||(a[18]=e("p",{class:"doc-p"},[e("code",{class:"inline-code"},"GET /v1/models"),l(" —— 获取所有可用模型 ID。 ")],-1)),v(b,{tabs:r})]),e("section",ke,[a[20]||(a[20]=e("h2",{class:"doc-h2 serif"},"错误码",-1)),e("div",xe,[e("table",_e,[a[19]||(a[19]=e("thead",null,[e("tr",null,[e("th",null,"状态码"),e("th",null,"含义"),e("th",null,"处理建议")])],-1)),e("tbody",null,[(c(),i(y,null,f(k,t=>e("tr",{key:t.code},[e("td",we,o(t.code),1),e("td",null,o(t.meaning),1),e("td",null,o(t.advice),1)])),64))])])])]),e("section",qe,[a[21]||(a[21]=e("h2",{class:"doc-h2 serif"},"SDK 兼容",-1)),a[22]||(a[22]=e("p",{class:"doc-p"},"由于完全兼容 OpenAI API，可直接使用以下官方 SDK：",-1)),e("div",Ie,[(c(),i(y,null,f(w,t=>e("div",{class:"sdk-card",key:t.name},[e("div",Te,o(t.name),1),e("div",Ae,o(t.lang),1),e("pre",Se,o(t.code),1)])),64))])]),e("section",Ce,[a[28]||(a[28]=e("hr",{class:"hairline"},null,-1)),e("p",Oe,[a[24]||(a[24]=l(" 更多模型与能力，请访问 ",-1)),a[25]||(a[25]=e("a",{href:"https://build.nvidia.com/models",target:"_blank",rel:"noopener",class:"doc-link"},"NVIDIA Build",-1)),a[26]||(a[26]=l(" 或直接前往 ",-1)),v(h,{to:"/playground",class:"doc-link"},{default:R(()=>[...a[23]||(a[23]=[l("在线体验",-1)])]),_:1}),a[27]||(a[27]=l(" 。 ",-1))])])])])])}}},Pe=$(je,[["__scopeId","data-v-27a8ca0c"]]);export{Pe as default};
