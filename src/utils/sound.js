/* ============================================================
 * 星皓 XINHAO · 音效系统
 * click.mp3 — UI 点击反馈
 * ding.mp3 — 消息发送/接收
 * ============================================================ */

import clickUrl from '@/assets/click.mp3'
import dingUrl from '@/assets/ding.mp3'

let clickAudio = null
let dingAudio = null

/** 预加载音频,避免首次播放延迟 */
function ensureAudio() {
  if (!clickAudio) {
    clickAudio = new Audio(clickUrl)
    clickAudio.volume = 0.3
    clickAudio.preload = 'auto'
  }
  if (!dingAudio) {
    dingAudio = new Audio(dingUrl)
    dingAudio.volume = 0.4
    dingAudio.preload = 'auto'
  }
}

/** 播放点击音效 */
export function playClick() {
  try {
    ensureAudio()
    clickAudio.currentTime = 0
    clickAudio.play().catch(() => {})
  } catch {}
}

/** 播放消息音效(发送/接收) */
export function playDing() {
  try {
    ensureAudio()
    dingAudio.currentTime = 0
    dingAudio.play().catch(() => {})
  } catch {}
}
