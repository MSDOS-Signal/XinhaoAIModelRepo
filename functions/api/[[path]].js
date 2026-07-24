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

  // 只转发必要的请求头
  const reqHeaders = {
    'Content-Type': request.headers.get('Content-Type') || 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Accept': request.headers.get('Accept') || '*/*',
  }

  // 判断是否为流式请求(SSE)
  const isSSE = path.includes('chat/completions')

  try {
    // 转发请求,禁用 Cloudflare 缓存以避免 SSE 被缓冲
    const proxyRes = await fetch(url, {
      method: request.method,
      headers: reqHeaders,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      cf: { cacheTtl: -1, cacheEverything: false },
    })

    // 构建响应头
    const resHeaders = new Headers(proxyRes.headers)
    // 移除会导致问题的头
    resHeaders.delete('Content-Encoding')
    resHeaders.delete('Content-Length')
    resHeaders.delete('Transfer-Encoding')

    // SSE 流式响应:确保不被 CDN/代理缓冲
    if (isSSE) {
      resHeaders.set('Content-Type', 'text/event-stream; charset=utf-8')
      resHeaders.set('Cache-Control', 'no-cache, no-transform')
      resHeaders.set('X-Accel-Buffering', 'no')
    }

    // 加上 CORS 头
    for (const [k, v] of Object.entries(CORS_HEADERS)) {
      resHeaders.set(k, v)
    }

    // 流式响应:用 TransformStream 确保每个 chunk 立即透传,不被缓冲
    if (isSSE && proxyRes.body) {
      const { readable, writable } = new TransformStream()
      proxyRes.body.pipeTo(writable)
      return new Response(readable, {
        status: proxyRes.status,
        headers: resHeaders,
      })
    }

    // 非流式响应直接透传
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
