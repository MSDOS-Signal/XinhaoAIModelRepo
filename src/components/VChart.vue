<template>
  <div ref="el" class="v-chart" :style="{ height }"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  option: { type: Object, required: true },
  height: { type: String, default: '320px' }
})

const el = ref(null)
let chart = null
let ro = null

onMounted(() => {
  chart = echarts.init(el.value, null, { renderer: 'canvas' })
  chart.setOption(props.option)
  ro = new ResizeObserver(() => chart && chart.resize())
  ro.observe(el.value)
})

watch(
  () => props.option,
  (opt) => { chart && chart.setOption(opt, { notMerge: true }) },
  { deep: true }
)

onBeforeUnmount(() => {
  ro && ro.disconnect()
  chart && chart.dispose()
})
</script>

<style scoped>
.v-chart { width: 100%; }
</style>
