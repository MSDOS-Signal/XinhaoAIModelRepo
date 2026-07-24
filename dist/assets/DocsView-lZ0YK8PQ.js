import{_ as $,y as P,a as i,c as d,b as e,F as y,r as f,q as B,t as n,j,i as C,o as N,m as D,w as O,e as l,g as _,d as u,f as E,h as R,k as L,A as V}from"./index-COGS4HMV.js";const H={class:"code-block"},U={class:"cb-bar"},M={class:"cb-tabs"},z=["onClick"],K={key:0,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none"},J={key:1,width:"14",height:"14",viewBox:"0 0 14 14",fill:"none"},F={class:"cb-copy-text"},X={class:"cb-code-wrap"},Y={class:"cb-pre mono"},G=["innerHTML"],Q={__name:"CodeBlock",props:{tabs:{type:Array,required:!0}},setup(w){const p=w,c=j(0),v=j(!1),x=C(()=>{var o;return((o=p.tabs[c.value])==null?void 0:o.code)||""}),q=C(()=>{var o;return((o=p.tabs[c.value])==null?void 0:o.lang)||""}),I=C(()=>A(x.value,q.value));function A(o,r){let t=o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");if(r==="JSON")t=t.replace(/"([^"]+)":/g,'<span class="syn-key">"$1"</span>:'),t=t.replace(/: "([^"]*)"/g,': <span class="syn-str">"$1"</span>'),t=t.replace(/: (\d+)/g,': <span class="syn-num">$1</span>'),t=t.replace(/\b(true|false|null)\b/g,'<span class="syn-bool">$1</span>');else{t=t.replace(/(#[^\n]*)/g,'<span class="syn-comment">$1</span>'),t=t.replace(/(\/\/[^\n]*)/g,'<span class="syn-comment">$1</span>'),t=t.replace(/("(?:[^"\\]|\\.)*")/g,'<span class="syn-str">$1</span>'),t=t.replace(/('(?:[^'\\]|\\.)*')/g,'<span class="syn-str">$1</span>');const m=["import","from","const","let","var","function","return","if","else","for","while","class","new","await","async","def","print","True","False","None","self","in","not","and","or","is","None"],b=new RegExp(`\\b(${m.join("|")})\\b`,"g");t=t.replace(b,'<span class="syn-kw">$1</span>'),t=t.replace(/\b(\d+\.?\d*)\b/g,'<span class="syn-num">$1</span>'),t=t.replace(/(\w+)\(/g,'<span class="syn-fn">$1</span>(')}return t}function T(){var o;(o=navigator.clipboard)==null||o.writeText(x.value),v.value=!0,setTimeout(()=>v.value=!1,1800)}return P(()=>p.tabs,()=>{c.value=0}),(o,r)=>(i(),d("div",H,[e("div",U,[e("div",M,[(i(!0),d(y,null,f(w.tabs,(t,m)=>(i(),d("button",{key:m,class:B(["cb-tab",{active:c.value===m}]),onClick:b=>c.value=m},n(t.lang),11,z))),128))]),e("button",{class:"cb-copy",onClick:T,title:"复制代码"},[v.value?(i(),d("svg",J,[...r[1]||(r[1]=[e("path",{d:"m3 7 3 3 5-6",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)])])):(i(),d("svg",K,[...r[0]||(r[0]=[e("rect",{x:"4",y:"4",width:"8",height:"8",rx:"1.5",stroke:"currentColor","stroke-width":"1.3"},null,-1),e("path",{d:"M2 9V3a1 1 0 0 1 1-1h6",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},null,-1)])])),e("span",F,n(v.value?"已复制":"复制"),1)])]),e("div",X,[e("pre",Y,[e("code",{innerHTML:I.value},null,8,G)])])]))}},h=$(Q,[["__scopeId","data-v-25bdcbfb"]]),W={class:"docs-page"},Z={class:"docs-sidebar"},ee={class:"ds-inner"},se={class:"ds-nav"},te=["href","onClick"],ae={class:"docs-content"},oe={class:"dc-wrap"},ne={class:"dc-head"},ie={class:"eyebrow"},de={class:"display dc-title"},le={class:"dc-intro"},ce={id:"quickstart",class:"doc-section"},re={id:"chat",class:"doc-section"},pe={class:"param-table-wrap"},me={class:"param-table"},ue={class:"mono"},ve={class:"mono"},ge={id:"streaming",class:"doc-section"},he={id:"vision",class:"doc-section"},be={id:"embeddings",class:"doc-section"},ye={id:"models-list",class:"doc-section"},fe={id:"errors",class:"doc-section"},xe={class:"param-table-wrap"},ke={class:"param-table"},_e={class:"mono err-code"},we={id:"sdks",class:"doc-section"},qe={class:"sdk-grid"},Ie={class:"sdk-name serif"},Ae={class:"sdk-lang mono"},Te={class:"sdk-code mono"},Se={class:"doc-end"},Ce={class:"doc-end-text"},Oe={__name:"DocsView",setup(w){const p=j("quickstart"),c=[{id:"quickstart",label:"快速开始"},{id:"auth",label:"认证"},{id:"chat",label:"对话补全"},{id:"streaming",label:"流式输出"},{id:"vision",label:"多模态视觉"},{id:"embeddings",label:"向量嵌入"},{id:"models-list",label:"模型列表"},{id:"errors",label:"错误码"},{id:"sdks",label:"SDK 兼容"}],v=[{name:"model",type:"string",required:!0,desc:"模型 ID，如 meta/llama-3.3-70b-instruct"},{name:"messages",type:"array",required:!0,desc:"消息数组，含 role 与 content 字段"},{name:"temperature",type:"float",required:!1,desc:"采样温度 0-2，越高越发散，默认 0.6"},{name:"top_p",type:"float",required:!1,desc:"核采样阈值 0-1，默认 0.95"},{name:"max_tokens",type:"int",required:!1,desc:"最大生成 token 数，默认 2048"},{name:"stream",type:"bool",required:!1,desc:"是否流式输出，默认 false"}],x=[{code:"400",meaning:"请求参数错误",advice:"检查 model ID、messages 格式与参数范围"},{code:"401",meaning:"认证失败",advice:"确认 API Key 正确且未过期"},{code:"404",meaning:"模型不存在",advice:"检查 model ID 拼写，或调用 /v1/models 获取列表"},{code:"422",meaning:"输入不支持",advice:"如向非视觉模型发送图片，检查模型能力"},{code:"429",meaning:"请求频率超限",advice:"降低并发，添加重试退避策略"},{code:"500",meaning:"服务端错误",advice:"稍后重试，如持续请联系 NVIDIA 支持"}],q=[{name:"Python",lang:"openai >= 1.0",code:`from openai import OpenAI

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
console.log(data.choices[0].message.content);`}],A=[{lang:"cURL",code:`curl -X POST https://integrate.api.nvidia.com/v1/chat/completions \\
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
}`}],o=[{lang:"Python",code:`resp = client.chat.completions.create(
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
print(f"维度: {len(vector)}")`}],t=[{lang:"cURL",code:`curl https://integrate.api.nvidia.com/v1/models \\
  -H "Authorization: Bearer nvapi-xxxx"`},{lang:"Python",code:`models = client.models.list()
for m in models.data:
    print(m.id)`}];function m(k){const s=document.getElementById(k);if(!s)return;const g=s.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:g,behavior:"smooth"})}function b(){const k=window.scrollY+120;for(let s=c.length-1;s>=0;s--){const g=document.getElementById(c[s].id);if(g&&g.getBoundingClientRect().top+window.scrollY<=k){p.value=c[s].id;return}}p.value=c[0].id}return N(()=>window.addEventListener("scroll",b,{passive:!0})),D(()=>window.removeEventListener("scroll",b)),(k,s)=>{const g=R("router-link"),S=L("reveal");return i(),d("div",W,[e("aside",Z,[e("div",ee,[s[0]||(s[0]=e("div",{class:"ds-title mono"},"DOCUMENTATION",-1)),e("nav",se,[(i(),d(y,null,f(c,a=>e("a",{key:a.id,href:`#${a.id}`,class:B(["ds-link",{active:p.value===a.id}]),onClick:V(je=>m(a.id),["prevent"])},n(a.label),11,te)),64))])])]),e("main",ae,[e("div",oe,[e("section",ne,[O((i(),d("span",ie,[...s[1]||(s[1]=[l("API REFERENCE",-1)])])),[[S]]),O((i(),d("h1",de,[...s[2]||(s[2]=[l("开发文档",-1)])])),[[S,60]]),O((i(),d("p",le,[...s[3]||(s[3]=[l(" 星皓 XINHAO 基于 NVIDIA NIM 构建，完全兼容 OpenAI API 格式。 只需修改 base_url 与 model 字段，即可无缝切换至 NVIDIA 加速推理。 ",-1)])])),[[S,120]])]),e("section",ce,[s[4]||(s[4]=_('<h2 class="doc-h2 serif" data-v-52d78200>快速开始</h2><p class="doc-p" data-v-52d78200>端点地址与认证方式：</p><div class="info-grid" data-v-52d78200><div class="info-item" data-v-52d78200><div class="info-k mono" data-v-52d78200>Base URL</div><div class="info-v mono" data-v-52d78200>https://integrate.api.nvidia.com/v1</div></div><div class="info-item" data-v-52d78200><div class="info-k mono" data-v-52d78200>认证方式</div><div class="info-v" data-v-52d78200>Bearer Token（API Key）</div></div><div class="info-item" data-v-52d78200><div class="info-k mono" data-v-52d78200>协议</div><div class="info-v" data-v-52d78200>HTTPS · RESTful · SSE</div></div><div class="info-item" data-v-52d78200><div class="info-k mono" data-v-52d78200>兼容性</div><div class="info-v" data-v-52d78200>OpenAI API 100% 兼容</div></div></div><p class="doc-p" data-v-52d78200>三行代码发起第一次请求：</p>',4)),u(h,{tabs:I})]),s[29]||(s[29]=_('<section id="auth" class="doc-section" data-v-52d78200><h2 class="doc-h2 serif" data-v-52d78200>认证</h2><p class="doc-p" data-v-52d78200> 所有请求需在 Header 中携带 API Key。NVIDIA NIM 使用 Bearer Token 认证， 格式为 <code class="inline-code" data-v-52d78200>Authorization: Bearer nvapi-xxxx</code>。 </p><div class="callout" data-v-52d78200><div class="callout-icon" data-v-52d78200>!</div><div class="callout-body" data-v-52d78200><strong data-v-52d78200>安全提示：</strong>API Key 等同于账户凭证，请勿在前端代码中硬编码或提交至版本控制。生产环境应通过后端代理转发请求。 </div></div></section>',1)),e("section",re,[s[6]||(s[6]=e("h2",{class:"doc-h2 serif"},"对话补全",-1)),s[7]||(s[7]=e("p",{class:"doc-p"},[e("code",{class:"inline-code"},"POST /v1/chat/completions"),l(" —— 核心接口，支持流式与非流式响应。 ")],-1)),s[8]||(s[8]=e("h3",{class:"doc-h3 serif"},"请求参数",-1)),e("div",pe,[e("table",me,[s[5]||(s[5]=e("thead",null,[e("tr",null,[e("th",null,"参数"),e("th",null,"类型"),e("th",null,"必填"),e("th",null,"说明")])],-1)),e("tbody",null,[(i(),d(y,null,f(v,a=>e("tr",{key:a.name},[e("td",ue,n(a.name),1),e("td",ve,n(a.type),1),e("td",null,n(a.required?"是":"否"),1),e("td",null,n(a.desc),1)])),64))])])]),s[9]||(s[9]=e("h3",{class:"doc-h3 serif"},"示例",-1)),u(h,{tabs:A})]),e("section",ge,[s[10]||(s[10]=_('<h2 class="doc-h2 serif" data-v-52d78200>流式输出</h2><p class="doc-p" data-v-52d78200> 设置 <code class="inline-code" data-v-52d78200>&quot;stream&quot;: true</code> 即可启用 SSE（Server-Sent Events）流式响应。 每个 chunk 以 <code class="inline-code" data-v-52d78200>data: </code> 前缀传输，以 <code class="inline-code" data-v-52d78200>data: [DONE]</code> 结束。 </p>',2)),u(h,{tabs:T}),s[11]||(s[11]=_(`<h3 class="doc-h3 serif" data-v-52d78200>SSE 响应格式</h3><pre class="raw-pre mono" data-v-52d78200><code data-v-52d78200>data: {<span class="json-key" data-v-52d78200>&quot;id&quot;</span>:<span class="json-str" data-v-52d78200>&quot;chatcmpl-xxx&quot;</span>,<span class="json-key" data-v-52d78200>&quot;choices&quot;</span>:[{<span class="json-key" data-v-52d78200>&quot;delta&quot;</span>:{<span class="json-key" data-v-52d78200>&quot;content&quot;</span>:<span class="json-str" data-v-52d78200>&quot;你&quot;</span>},<span class="json-key" data-v-52d78200>&quot;index&quot;</span>:0}]}

data: {<span class="json-key" data-v-52d78200>&quot;id&quot;</span>:<span class="json-str" data-v-52d78200>&quot;chatcmpl-xxx&quot;</span>,<span class="json-key" data-v-52d78200>&quot;choices&quot;</span>:[{<span class="json-key" data-v-52d78200>&quot;delta&quot;</span>:{<span class="json-key" data-v-52d78200>&quot;content&quot;</span>:<span class="json-str" data-v-52d78200>&quot;好&quot;</span>},<span class="json-key" data-v-52d78200>&quot;index&quot;</span>:0}]}

data: [DONE]</code></pre>`,2))]),e("section",he,[s[12]||(s[12]=e("h2",{class:"doc-h2 serif"},"多模态（视觉）",-1)),s[13]||(s[13]=e("p",{class:"doc-p"},[l(" 视觉模型（如 Llama 3.2 Vision、Gemma 3 等）支持图片输入。 使用 "),e("code",{class:"inline-code"},"content"),l(" 数组格式，混合文本与图片。 ")],-1)),u(h,{tabs:o}),s[14]||(s[14]=e("p",{class:"doc-p"}," 图片支持 Base64 Data URL 或公开 URL 两种格式。 建议单张图片不超过 10MB，长边不超过 4096px。 ",-1))]),e("section",be,[s[15]||(s[15]=e("h2",{class:"doc-h2 serif"},"向量嵌入",-1)),s[16]||(s[16]=e("p",{class:"doc-p"},[e("code",{class:"inline-code"},"POST /v1/embeddings"),l(" —— 将文本编码为高维向量，用于 RAG 检索与语义相似度计算。 ")],-1)),u(h,{tabs:r})]),e("section",ye,[s[17]||(s[17]=e("h2",{class:"doc-h2 serif"},"模型列表",-1)),s[18]||(s[18]=e("p",{class:"doc-p"},[e("code",{class:"inline-code"},"GET /v1/models"),l(" —— 获取所有可用模型 ID。 ")],-1)),u(h,{tabs:t})]),e("section",fe,[s[20]||(s[20]=e("h2",{class:"doc-h2 serif"},"错误码",-1)),e("div",xe,[e("table",ke,[s[19]||(s[19]=e("thead",null,[e("tr",null,[e("th",null,"状态码"),e("th",null,"含义"),e("th",null,"处理建议")])],-1)),e("tbody",null,[(i(),d(y,null,f(x,a=>e("tr",{key:a.code},[e("td",_e,n(a.code),1),e("td",null,n(a.meaning),1),e("td",null,n(a.advice),1)])),64))])])])]),e("section",we,[s[21]||(s[21]=e("h2",{class:"doc-h2 serif"},"SDK 兼容",-1)),s[22]||(s[22]=e("p",{class:"doc-p"},"由于完全兼容 OpenAI API，可直接使用以下官方 SDK：",-1)),e("div",qe,[(i(),d(y,null,f(q,a=>e("div",{class:"sdk-card",key:a.name},[e("div",Ie,n(a.name),1),e("div",Ae,n(a.lang),1),e("pre",Te,n(a.code),1)])),64))])]),e("section",Se,[s[28]||(s[28]=e("hr",{class:"hairline"},null,-1)),e("p",Ce,[s[24]||(s[24]=l(" 更多模型与能力，请访问 ",-1)),s[25]||(s[25]=e("a",{href:"https://build.nvidia.com/models",target:"_blank",rel:"noopener",class:"doc-link"},"NVIDIA Build",-1)),s[26]||(s[26]=l(" 或直接前往 ",-1)),u(g,{to:"/playground",class:"doc-link"},{default:E(()=>[...s[23]||(s[23]=[l("在线体验",-1)])]),_:1}),s[27]||(s[27]=l(" 。 ",-1))])])])])])}}},Be=$(Oe,[["__scopeId","data-v-52d78200"]]);export{Be as default};
