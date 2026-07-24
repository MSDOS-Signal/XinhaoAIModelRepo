import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue'), meta: { title: '首页' } },
  { path: '/models', name: 'models', component: () => import('@/views/ModelsView.vue'), meta: { title: '模型广场' } },
  { path: '/playground', name: 'playground', component: () => import('@/views/PlaygroundView.vue'), meta: { title: '在线体验' } },
  { path: '/docs', name: 'docs', component: () => import('@/views/DocsView.vue'), meta: { title: '开发文档' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · 星皓 XINHAO` : '星皓 XINHAO'
})

export default router
