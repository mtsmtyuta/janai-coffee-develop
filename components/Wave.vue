<template lang="pug">
#canvas-container.canvas-wave(:class='{ "is-page-bar": isPageBar }' :style='{ opacity: fixOpacity, bottom: fixBottom}')
  .canvas-bg
  canvas#sineCanvas(width="800" height="300")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'

  export interface Props {
    circleProgress: number
  }

  const props = withDefaults(defineProps<Props>(), {
    circleProgress: 0
  })


  const unit = ref<number>(100)
  const canvas =  ref<HTMLCanvasElement | null>(null)
  const context =  ref<CanvasRenderingContext2D | null>(null)
  const canvas2 =  ref<HTMLCanvasElement | null>(null)
  const context2 =  ref<CanvasRenderingContext2D | null>(null)
  const windowHeight = ref<number>(0)
  const height = ref<number>(0)
  const width = ref<number>(0)
  const xAxis = ref<number>(0)
  const yAxis = ref<number>(0)
  const timeoutID = ref<any>(0)
  const drawSeconds =  ref<number>(0)
  const drawT = ref<number>(0)
  


  const { isPageBar, setIsPageBax } = useStateIsPageBar()

  const fixBottom = computed(() => {
    return windowHeight.value * 0.1 * Math.floor(props.circleProgress * 10) + 'px'
  })

  const fixOpacity = computed(() => {
    return Math.floor(props.circleProgress * 10) / 10
  })

  const fixColor = computed(() => {
    if (isPageBar.value === true) {
      return 'white'
    } else {
      return '#1d0e04'
    }
  })
  

  const init = () => {
    if (!canvas.value) {
      canvas.value = document.getElementById('sineCanvas') as HTMLCanvasElement
    }
    if (!canvas.value) {
      return
    }
    canvas.value.width =
      document.documentElement.clientWidth > 320
        ? document.documentElement.clientWidth
        : 320
    windowHeight.value = document.documentElement.clientHeight
    canvas.value.height = 300
    context.value = canvas.value.getContext('2d')
    height.value = 300
    width.value = canvas.value.width
    xAxis.value = Math.floor(height.value / 2)
    yAxis.value = 0
    drawCanvus()
  }

  const drawCanvus = () => {
    if (context.value) {
      context.value.clearRect(0, 0, width.value, height.value)
    }
    drawWave(fixColor.value, 1, 3, 0)
    drawSeconds.value = drawSeconds.value + 0.009
    drawT.value = drawSeconds.value * Math.PI
    timeoutID.value = setTimeout(drawCanvus, 35)
  }

  const drawWave = (color: string, alpha: number, zoom: number, delay: number) => {
    if (context.value) {
      context.value.fillStyle = color
      context.value.globalAlpha = alpha
      context.value.beginPath()
      drawSine(drawT.value / 0.5, zoom, delay)
      context.value.lineTo(width.value + 10, height.value)
      context.value.lineTo(0, height.value)
      context.value.closePath()
      context.value.fill()
    }
  }
  const drawSine = (t: number, zoom: number, delay: number) => {
    let x = t
    let y = Math.sin(x) / zoom
    if (context.value) {
      context.value.moveTo(yAxis.value, unit.value * y + xAxis.value)
      for (let i = yAxis.value; i <= width.value + 10; i += 10) {
        x = t + (-yAxis.value + i) / unit.value / zoom;
        y = Math.sin(x - delay) / 3;
        context.value.lineTo(i, unit.value * y + xAxis.value);
      }
    }
  }
  const handleResize = () => {
    drawSeconds.value = 0
    drawT.value = 0
    clearTimeout(timeoutID.value)
    init()
  }

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  if (process.client) {
    window.addEventListener('resize', handleResize)
    init()
  }

</script>

<style lang="scss" scoped>
.canvas-wave {
  transition: all ease 0.55s;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  min-width: 320px;
  pointer-events: none;
  z-index: 10000;
}
.canvas-bg {
  width: inherit;
  position: absolute;
  height: 100vh;
  min-width: 320px;
  top: 298px;
  background-color: #1d0e04;
}
.is-page-bar {
  .canvas-bg {
    background-color: white;
  }
}
</style>
