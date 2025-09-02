<template lang="pug">
.hotel-page(:class='{ "is-page-bar": isPageBar }')
  .hotel-body-wrapper
    transition(name="fade")
      .hotel-body(v-if="hotel.length > 0")
        .hotel-rte(v-html="hotel[0].contents")
      .hotel-body.hotel-body--empty(v-else)
        .loader Loading...

</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, watchEffect } from 'vue'

  const nuxtApp = useNuxtApp()
  const dayJs: any = nuxtApp.$dayjs

  const format = function (date: string) {
    if(date) {
      return dayJs(date).format('YYYY.MM.DD')
    } else {
      return '';
    }
  }

  export interface Hotel {
    contents: string
    date: string
  }

  const {data: hotel, pending, error, refresh} = await useFetch('/api/hotel')
  if( process.client ) {
    if (hotel.length <= 0 || !hotel?.value[0]?.contents) {
      window.location.href = '/'
    }
  }

  const isNewsBodyDisplay = ref<Boolean>(false)

  const route = useRoute()

  // クライアントサイドでbodyにスタイルを適用
  if (process.client) {
    onMounted(() => {
      document.body.style.background = '#1F2824'
      document.body.style.color = '#ffffff'
    })
  }

  const currentPath = computed(
    () => `https://janaicoffee.tokyo${route.path}`
  );

  const currentTitle = computed(
    () => `${route.meta.title ? route.meta.title + ' | ' + "JANAI COFFEE " : "JANAI COFFEE "}`
  );

  definePageMeta({
    title: 'Hotel',
  })

  useHead({
    title: 'Hotel',
    meta: [
      { hid: 'robots', name: 'robots', content: 'noindex,nofollow' },
      { property: 'og:url', content: currentPath },
      { property: 'og:title', content: currentTitle}
    ],
  });

  // レイアウトを指定
  definePageMeta({
    layout: 'page'
  });

</script>

<style lang="scss" scoped>
.hotel-page {
  transition: 1s ease all;
  padding: 1vh 0;
  min-height: 98vh;
  background: #1F2824;
  color: #fff;
  .hotel-rte {
    color: #fff;
  }
}

.hotel-body {
  max-width: 800px;
  margin: 0 auto 100px;
  width: 100%;
}

.hotel-rte {
  color: #111;
  font-size: 1.6rem;
  line-height: 1.4em;
  letter-spacing: 0.02em;
  padding: 0 1em;
  white-space: pre-wrap;
  font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3',
    '游ゴシック Medium', 'Yu Gothic Medium', '游ゴシック体', 'Yu Gothic',
    'MS PGothic', arial, sans-serif;
  :deep(img) {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6),
  :deep(p) {
    margin: 1em 0;
    text-align: center;
  }
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-weight: bold;
    margin: 1.4em 0;
  }
  :deep(h1) {
    font-size: 1.5em;
  }
  :deep(h2) {
    font-size: 1.3em;
  }
  :deep(h3) {
    font-size: 1.2em;
  }
  :deep(a) {
    color: #645d5a;
  }
  :deep(img + p ){
    margin-top: 1em;
  }
  :deep(blockquote p) {
    text-align: center;
    white-space: initial;
  }
  :deep(blockquote a) {
    display: block;
  }
}
.is-page-bar {
}

.hotel-body--empty {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #e1e1e1;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}

@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
