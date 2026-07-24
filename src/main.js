import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/base.css'

const app = createApp(App)

// 滚动显现指令
app.directive('reveal', {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(el)
  }
})

app.use(router)
app.mount('#app')
