<template>
  <footer class="footer">
    <div class="container">
      <hr class="hairline" />
      <div class="foot-grid">
        <div class="foot-brand">
          <div class="serif foot-cn">星皓</div>
          <p class="foot-slogan">星之所向,万模来潮。</p>
          <p class="foot-note">基于 NVIDIA NIM 构建 · 一个密钥,直达 118 个全球顶尖模型</p>
        </div>
        <div class="foot-col">
          <div class="foot-title mono">平台</div>
          <router-link to="/models" @click="playClick">模型广场</router-link>
          <router-link to="/playground" @click="playClick">在线体验</router-link>
          <router-link to="/docs" @click="playClick">开发文档</router-link>
        </div>
        <div class="foot-col">
          <div class="foot-title mono">资源</div>
          <a href="https://build.nvidia.com/models" target="_blank" rel="noopener" @click="playClick">NVIDIA Build</a>
          <a href="https://docs.api.nvidia.com" target="_blank" rel="noopener" @click="playClick">NIM 文档</a>
          <a href="https://integrate.api.nvidia.com/v1" target="_blank" rel="noopener" @click="playClick">API 端点</a>
        </div>
      </div>

      <!-- NVIDIA 合作伙伴 -->
      <div class="foot-partner">
        <span class="partner-label mono">技术合作伙伴</span>
        <a href="https://www.nvidia.com" target="_blank" rel="noopener" class="partner-logo" @click="playClick">
          <img :src="nvidiaLogo" alt="NVIDIA" />
        </a>
        <span class="partner-desc">Powered by NVIDIA NIM · GPU 加速推理</span>
      </div>

      <div class="foot-base mono">
        <span>© 2026 XINHAO · 星皓智能</span>
        <span>POWERED BY NVIDIA NIM</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { playClick } from '@/utils/sound'
import nvidiaLogo from '@/assets/nvidia_logo.png'
</script>

<style scoped>
.footer { margin-top: 120px; padding-bottom: 40px; }
.foot-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 40px;
  padding: 56px 0 40px;
}
.foot-cn { font-size: 30px; font-weight: 700; letter-spacing: 0.2em; color: var(--gold-2); }
.foot-slogan { margin-top: 10px; color: var(--text-2); font-size: 14px; }
.foot-note { margin-top: 6px; color: var(--text-3); font-size: 12px; }
.foot-col { display: flex; flex-direction: column; gap: 12px; font-size: 13.5px; }
.foot-col a { color: var(--text-2); transition: color 0.3s; width: fit-content; }
.foot-col a:hover { color: var(--gold-2); }
.foot-title { font-size: 10px; letter-spacing: 0.4em; color: var(--text-3); margin-bottom: 6px; }

/* NVIDIA 合作伙伴 */
.foot-partner {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px 0;
  border-top: 1px solid var(--line);
}
.partner-label {
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--text-3);
  text-transform: uppercase;
  white-space: nowrap;
}
.partner-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s var(--ease-out);
}
.partner-logo:hover {
  border-color: var(--line-strong);
  background: rgba(118, 185, 0, 0.06);
}
.partner-logo img {
  height: 22px;
  width: auto;
  object-fit: contain;
}
.partner-desc {
  font-size: 12px;
  color: var(--text-3);
  letter-spacing: 0.05em;
}

.foot-base {
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-size: 10.5px;
  letter-spacing: 0.2em;
  color: var(--text-3);
}
@media (max-width: 720px) {
  .foot-grid { grid-template-columns: 1fr; gap: 28px; }
  .foot-partner { flex-wrap: wrap; gap: 12px; }
}
</style>
