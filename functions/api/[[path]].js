/**
 * 星皓 XINHAO · Cloudflare Pages Function 代理
 *
 * 将前端 /api/* 请求转发到 NVIDIA NIM API,在服务端注入 API Key
 * 前端永远接触不到 API Key,杜绝泄露风险
 *
 * 路由映射:
 *   /api/chat/completions  ->  https://integrate.api.nvidia.com/v1/chat/completions
 *   /api/models            ->  https://integrate.api.nvidia.com/v1/models
 *   /api/*                 ->  https://integrate.api.nvidia.com/v1/*
 */

const NVIDIA_BASE = 'https://integrate.api.nvidia.com/v1'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

/** JSON 响应工具函数(自动带 CORS 头) */
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

/** CORS 预检 */
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function onRequest(context) {
  const { request, env, params } = context

  // 从环境变量获取 API Key
  const apiKey = env.NVIDIA_API_KEY
  if (!apiKey) {
    return jsonResponse(
      { error: { message: '服务器未配置 API Key,请在 Cloudflare Dashboard → Settings → Environment Variables 中设置 NVIDIA_API_KEY' } },
      500
    )
  }

  // 构建目标 URL
  const path = params.path ? params.path.join('/') : ''
  const url = `${NVIDIA_BASE}/${path}`

  // 只转发必要的请求头,丢弃 Host / CF-* / Content-Length / Accept-Encoding 等
  // 这些头会导致 NVIDIA API 拒绝请求或编码不匹配
  const reqHeaders = {
    'Content-Type': request.headers.get('Content-Type') || 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': request.headers.get('Accept') || '*/*',
  }

  try {
    // 转发请求
    const proxyRes = await fetch(url, {
      method: request.method,
      headers: reqHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    })

    // 构建响应头:复制 NVIDIA 的响应头,但移除会导致问题的头
    const resHeaders = new Headers(proxyRes.headers)
    // 移除 Content-Encoding: Workers fetch() 已自动解压 body,
    // 如果保留此头,浏览器会尝试二次解压导致 "Failed to fetch"
    resHeaders.delete('Content-Encoding')
    // 移除 Content-Length: body 经过 Workers 后长度可能变化
    resHeaders.delete('Content-Length')
    // 移除 Transfer-Encoding: 让 Workers 自动处理
    resHeaders.delete('Transfer-Encoding')
    // 加上 CORS 头
    for (const [k, v] of Object.entries(CORS_HEADERS)) {
      resHeaders.set(k, v)
    }

    // 流式响应直接透传 body
    return new Response(proxyRes.body, {
      status: proxyRes.status,
      headers: resHeaders,
    })
  } catch (err) {
    return jsonResponse(
      { error: { message: `代理请求失败: ${err.message || '未知错误'}` } },
      502
    )
  }
}
