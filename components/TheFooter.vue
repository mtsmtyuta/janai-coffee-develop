<template lang="pug">
footer.footer(ref='ref_footer' :class='{ "is-page-bar": isPageBar }')
  .footer-top
    .footer-menu
      .footer-logo(v-if='!isPageBar')
        icon-logo-yoko
      .footer-logo(v-if='isPageBar')
        icon-logo-yoko-bar
      nav.menu
        nuxt-link.menu-item(to="/#concept") CONCEPT
        nuxt-link.menu-item(to="/#drink" v-if='!isPageBar') COFFEE
        nuxt-link.menu-item(to="/#drink" v-if='isPageBar') BAR
        nuxt-link.menu-item(to="/#menu") MENU
        //- nuxt-link.menu-item(to="/#product" v-if='!isPageBar') PRODUCT
        nuxt-link.menu-item(to="/#access") ACCESS
      .sns-links
        a.sns-link.instagram(href='https://www.instagram.com/janai_coffee_b/' target='_blank' v-if='isPageBar')
          img(src="/assets/instagram.png")
        a.sns-link.instagram(href='https://www.instagram.com/janai_coffee/' target='_blank' v-else)
          img(src="/assets/instagram.png")

  .footer-bottom
    .copy Copyright &copy; 2020 JANAI COFFEE All Rights Reserved.
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import iconLogoYoko from '../public/assets/logo-yoko.svg?component'
import iconLogoYokoBar from '../public/assets/logo-yoko-bar.svg?component'


const isFixed = ref<Boolean>(false)
const { isPageBar, setIsPageBax } = useStateIsPageBar()
let ref_footer = ref()

const handleScroll = () => {
  if (ref_footer.footer) {
    const footer = ref_footer.footer as HTMLElement
    const scrollHeight = document.body.scrollHeight
    const innerHeight = window.innerHeight
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    const scrollMargin = scrollHeight - scrollTop - innerHeight
    const threshold = footer.clientHeight - 144
    if (!isFixed.value && scrollMargin < threshold) {
      isFixed.value = true
    } else if (isFixed.value && scrollMargin >= threshold) {
      isFixed.value = false
    }
  }
}

handleScroll()
if (process.client) {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleScroll)
}


onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  }
})


const scrollTop = () => {
  scroller.pagetop()
}



</script>

<style lang="scss" scoped>
.scroll-top {
  position: fixed;
  z-index: 3000;
  width: 60px;
  height: 60px;
  bottom: 24px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(black, 0.6);
  transform: translateX(500px);
  svg {
    width: 17px;
    transform: rotate(-90deg);
    path {
      fill: white;
    }
  }
  &.fixed {
    position: absolute;
    left: auto;
    transform: translateX(0);
    bottom: auto;
    right: 0;
    bottom: 0px;
  }
  @include hover();
  @include sp() {
    left: auto;
    right: 8px;
    bottom: 8px;
    transform: translateX(0);
    width: 50px;
    height: 50px;
    &.fixed {
      position: fixed;
      top: auto;
      right: 8px;
      bottom: 8px;
    }
  }
}

.footer {
  width: 100%;
  box-sizing: border-box;
  @include inner(initial);
  // background-color: #f9f9f9;
  background-color: #001525;
  color: white;
  // border-top: 1px solid gray;
  /* color: white; */
  padding: 50px 0;
  margin: 0 auto;
  transition: all ease 1s;
  @include sp() {
    padding: 47px 0 43px;
  }
  &.is-page-bar {
    background-color: #001525;
    color: white;
  }
}

.footer-top {
  padding-bottom: 20px;
  position: relative;
}
.footer-bottom {
  display: flex;
  justify-content: center;
}

.footer-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .menu {
    padding-top: 30px;
  }
  .menu-item {
    font-size: 1.4rem;
    letter-spacing: 0.11em;
    padding: 0 0.6em;
    transition: all ease 1s;
    color: inherit;
  }
  .sns-links {
    padding-top: 30px;
    display: flex;
    width: 170px;
    max-width: 100%;
    justify-content: center;
    align-items: baseline;
    @include sp() {
      padding-top: 35px;
    }
  }
  .sns-link {
    width: 40px;
    display: block;
    color: inherit;
    &.twitter {
      width: 40px;
    }
    &.instagram {
      width: 38px;
    }
    &.facebook {
      width: 20px;
    }
    img {
      width: 100%;
    }
    svg {
      transition: all ease 1s;
      fill: currentColor;
    }
    @include sp() {
      &.twitter {
        width: 31px;
      }
      &.instagram {
        width: 29px;
      }
      &.facebook {
        width: 15px;
      }
    }
  }
}

.footer-logo {
  width: 300px;
  max-width: 76%;
  svg {
    width: 100%;
    transition: all ease 1s;
    fill: currentColor;
  }
}
.copy {
  @include font-roboto-condensed();
  font-size: 1rem;
  text-align: right;
  padding: 14px 0 8px;
}

// svg
#design-logo-yoko {
  .cls-1 {
    fill: none;
  }
  .cls-2 {
    fill: #fff;
  }
}
</style>
