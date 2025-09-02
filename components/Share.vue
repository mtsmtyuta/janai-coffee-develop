<template lang="pug">
.share
  a.share-item.fb(
    :href='facebookUrl()'
    target='_blank',
    rel='noopener'
  ): nuxt-img(format="svg" src="//assets/fb.svg")
  a.share-item.tw(
    :href='twitterUrl()'
    target='_blank',
    rel='noopener'
  ): nuxt-img(format="svg" src="//assets/tw.svg")
  a.share-item.htb(
    :href='hatebUrl()'
    target='_blank',
    rel='noopener'
  ): nuxt-img(format="svg" src="//assets/htb.svg")
</template>

<script setup lang="ts">
const url = computed(() => {
  return encodeURIComponent('')
})

const title = computed(() => {
  return encodeURIComponent('PAGE TITLE')
})


const facebookUrl = () => {
  return `https://www.facebook.com/sharer/sharer.php?u=${this.url}`
}

const twitterUrl = () => {
  return `https://twitter.com/share?url=${this.url}&text=${this.title}`
}

const hatebUr = () => {
  return `http://b.hatena.ne.jp/entry/${this.url}`
}

</script>

<style lang="scss" scoped>
.share {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  @include sp() {
    padding: 40px 0;
  }
}

.share-item {
  width: 100px;
  height: 26px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  &.fb {
    background-color: #3b5999;
  }
  &.tw {
    background-color: #55acee;
  }
  &.htb {
    background-color: #00a4de;
  }
  svg {
    height: 15px;
    width: auto;
  }
  path {
    fill: white;
  }
  @include hover();
}
</style>
