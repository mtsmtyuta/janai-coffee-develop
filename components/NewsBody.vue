<template lang="pug">
.news-body(:class='{ "is-page-bar": isPageBar }')
  .news-body-inner
    .news-body-content
      .news-body-title {{news.title}}
      .news-body-info
        .news-info-date {{format(news.createdAt)}}
      .news-body-main(v-html='news.body')
    .news-body-cancel(@click="cancelNewsBody")
  .news-body-ovarlay(@click="cancelNewsBody")
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
interface News {
  title: string
  createdAt: string
  body?: string
}
// import pagemodeStore from '~/store'

const props = defineProps<{
  news: News
}>()
const emit = defineEmits([
    'cancelNewsBody',
    'onClickNewsLeftArrow',
    'onClickNewsRightArrow'
  ]
)
const nuxtApp = useNuxtApp()
const dayJs: any = nuxtApp.$dayjs

const format = function (date: string) {
  if(date) {
    return dayJs(date).format('YYYY.MM.DD')
  } else {
    return '';
  }

}

  const cancelNewsBody = () => {
    emit('cancelNewsBody')
  }
  const onClickNewsLeftArrow = () => {
    emit('onClickNewsLeftArrow')
  }
  const onClickNewsRightArrow = () => {
    emit('onClickNewsRightArrow')
  }

  const { isPageBar, setIsPageBar } = useStateIsPageBar()


</script>

<style lang="scss" scoped>
.news-body {
  font-family: Noto Sans JP, 'メイリオ', Meiryo, Hiragino Kaku Gothic ProN,
    'ヒラギノ角ゴ ProN W3', sans-serif;
  .news-body-arrow {
    position: absolute;
    width: 34px;
    height: 34px;
    cursor: pointer;
    transform: translateY(-50%);
    top: 50%;
    &::before {
      content: '';
      position: absolute;
      box-sizing: border-box;
      display: block;
      height: 49%;
      top: 47%;
      left: 15%;
      width: 49%;
      border-top: 1px solid #001525;
      border-right: 1px solid #001525;
    }
    &.news-body-arrow-left {
      left: 0px;
      &::before {
        transform: rotate(-135deg) translate(-50%, 0);
        transform-origin: top;
      }
    }
    &.news-body-arrow-right {
      right: 0px;
      &::before {
        transform: rotate(45deg) translate(-50%, 0);
        transform-origin: top;
      }
    }
  }
  .news-body-inner {
    padding: 43px 37px 50px;
    white-space: pre-wrap;
    position: fixed;
    width: 80vw;
    max-width: 800px;
    max-height: 90vh;
    overflow: scroll;
    background-color: white;
    border-radius: 1px;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    z-index: 10000;
    box-shadow: 0px 0px 12px #00000042;
    @include sp() {
      width: 95vw;
      padding: 50px 20px;
    }
  }
  .news-body-info {
    padding-top: 0.8em;
    display: flex;
    font-size: 0.9em;
    .news-info-text {
      font-weight: bold;
    }
    .news-info-date {
      color: #4c4c4c;
    }
  }
  .news-body-title {
    font-size: 1.5em;
    letter-spacing: 0.01em;
  }
  .news-body-main {
    padding-top: 1.9em;
    letter-spacing: 0.13em;
    line-height: 1.5em;
    font-size: 0.97em;
    :deep(p + p) {
      padding-top: 1em;
    }
    :deep(a) {
      color: #1a0dab;
      text-decoration: underline;
    }
  }
  .news-body-main p {
    padding-top: 1em;
  }
  .news-body-cancel {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    background: #e2e2e2;
    cursor: pointer;
    &::before,
    &::after {
      content: '';
      background-color: #001525;
      position: absolute;
      box-sizing: border-box;
      display: block;
      left: 25%;
      width: 50%;
      height: 2%;
      top: 47%;
      left: 15%;
      width: 70%;
    }
    &::before {
      transform: rotate(315deg);
    }
    &::after {
      transform: rotate(-315deg);
    }
  }
  .news-body-ovarlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.3;
    z-index: 9999;
    &::before {
      content: '';
    }
  }
}

.news-body.is-page-bar {
  .news-body-inner {
    // background-color: #2f2f2f;
    box-shadow: 0px 0px 12px #989898;
    color: #001525;
  }
  .news-body-info {
    .news-info-date {
      color: #afafaf;
    }
  }
  .news-body-cancel {
    background: #001525;
    &::before,
    &::after {
      background-color: #fff;
    }
  }
  .news-body-ovarlay {
    background-color: white;
  }
}
</style>
