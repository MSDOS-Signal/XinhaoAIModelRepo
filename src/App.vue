<template>
  <div class="app-shell">
    <!-- 全局动态方块背景 -->
    <BlockField :opacity="0.5" :interactive="true" />
    <!-- 自定义鼠标 -->
    <CustomCursor />
    <NavBar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import BlockField from '@/components/BlockField.vue'
</script>

<style scoped>
.app-shell { min-height: 100vh; display: flex; flex-direction: column; position: relative; }
main { flex: 1; position: relative; z-index: 1; }
</style>
