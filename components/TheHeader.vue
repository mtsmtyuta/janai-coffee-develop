<template lang="pug">
header.header(:class='{ "fixed": isRoot && !isScroll, "is-page-bar": isPageBar }')
  .header-wrapper
    .header-logo-wrapper
      h1.header-logo: nuxt-link.header-logo(to='/' v-if='!isPageBar')
        icon-logo-yoko
      h1.header-logo: nuxt-link.header-logo(to='/' v-if='isPageBar')
        icon-logo-yoko-bar
    nav.menu
      nuxt-link.menu-item(to="/#concept") {{ $t('navigation.concept') }}
      nuxt-link.menu-item(to="/#drink" v-if='!isPageBar') {{ $t('navigation.coffee') }}
      nuxt-link.menu-item(to="/#drink" v-if='isPageBar') {{ $t('navigation.bar') }}
      nuxt-link.menu-item(to="/#menu" v-if='isPageBar') {{ $t('navigation.menu') }}
      //- nuxt-link.menu-item(to="/#product" v-if='!isPageBar') PRODUCT
      nuxt-link.menu-item(to="/#access") {{ $t('navigation.access') }}
      LanguageSwitcher
    .sp-header-menu(:class='{ "open": isMenuDisplayed }', @click='toggleMenu')
      .bar.bar-1
      .bar.bar-2
      .bar.bar-3
  nav.sp-menu(:class='{ "open": isMenuDisplayed }', @click='closeMenu')
    .sp-menu-inner
      nuxt-link.sp-menu-item(to="/#concept") {{ $t('navigation.concept') }}
      nuxt-link.sp-menu-item(to="/#drink" v-if='!isPageBar') {{ $t('navigation.coffee') }}
      nuxt-link.sp-menu-item(to="/#drink" v-if='isPageBar') {{ $t('navigation.bar') }}
      nuxt-link.sp-menu-item(to="/#menu" v-if='isPageBar') {{ $t('navigation.menu') }}
      //- nuxt-link.sp-menu-item(to="/#product" v-if='!isPageBar') PRODUCT
      nuxt-link.sp-menu-item(to="/#access") {{ $t('navigation.access') }}
      LanguageSwitcher
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import iconLogoYoko from '../public/assets/logo-yoko.svg?component'
import iconLogoYokoBar from '../public/assets/logo-yoko-bar.svg?component'

// import pagemodeStore from '~/store'
const SCROLL_THRESHOLD = 50

const isScroll = ref<Boolean>(true)
const isMenuDisplayed = ref<Boolean>(false)

const { isPageBar, setIsPageBar } = useStateIsPageBar()

const route = useRoute();

const isRoot = computed(() => {
  return route.path === '/'
})

const closeMenu = () => {
  isMenuDisplayed.value = false
}

const toggleMenu = () => {
  isMenuDisplayed.value = !isMenuDisplayed.value
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  window.addEventListener('resize', checkScroll)
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
  window.removeEventListener('resize', checkScroll)
})

const checkScroll = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  if (isScroll.value && scrollTop < SCROLL_THRESHOLD) {
    isScroll.value = false
  } else if (!isScroll.value && scrollTop >= SCROLL_THRESHOLD) {
    isScroll.value = true
  }
}
</script>

<style lang="scss" scoped>
.header {
  transition: all ease 1s;
  background-color: #ffffffcc;
  padding: 25px 0px;
  &.is-page-bar {
    background-color: #00152585;
    .header-logo {
      svg {
        fill: white;
        filter: drop-shadow(0 0 10px white);
      }
    }
    .menu {
      .menu-item {
        color: white;
      }
    }
    .sp-menu {
      background-color: #00152585;
    }
    .sp-menu-item {
      letter-spacing: 0.15em;
      color: white;
    }
    .sp-header-menu {
      .bar {
        background-color: white;
      }
    }
  }
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  @include inner();
  @include sp() {
    padding: 0 10px;
  }
  max-width: initial;
}
.header-logo-wrapper {
  display: flex;
  justify-content: center;
}
.header-logo {
  transition: all 0.2s ease-out;
  height: 20px;
  svg {
    display: block;
    height: 100%;
    width: auto;
    transition: all ease 1s;
  }
  @include pc() {
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover {
      opacity: 0.8;
    }
  }
  @include sp() {
    height: 18px;
  }
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  .menu-item {
    padding: 0 1.8em;
    font-size: 1.35rem;
    letter-spacing: 0.11em;
    position: relative;
    transition: all ease 1s;
    // &.exact-active-link {
    //   &::before {
    //     content: '';
    //     width: 4em;
    //     bottom: -6px;
    //     left: 50%;
    //     transform: translate(-50%, 0);
    //     height: 1px;
    //     background-color: #bbbbbb;
    //     box-shadow: 0px 1px 0px 0px #dcdcdc42;
    //     position: absolute;
    //   }
    // }
  }
  @include sp() {
    display: none;
  }
}

.sp-header-menu,
.sp-menu {
  @include pc() {
    display: none;
  }
}

.sp-header-menu {
  position: absolute;
  z-index: 3800;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  width: 50px;
  height: 50px;
  transition: all 0.2s ease-out;
  .bar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 1px;
    border-radius: 2px;
    background-color: colors('logo');
    transition: all 0.2s ease-out;
    &.bar-2 {
      margin-top: -15px;
    }
    &.bar-3 {
      margin-top: 15px;
    }
  }
  @include hover();
  &.open {
    background-color: rgba(colors('dark'), 0);
    .bar {
      background-color: colors('text');
      &.bar-1 {
        opacity: 0;
      }
      &.bar-2 {
        margin-top: 0;
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &.bar-3 {
        margin-top: 0;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
}

.sp-menu {
  &.open {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 3500;
  background-color: #ffffffd1;
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  pointer-events: none;
  opacity: 0;
  transform: scale(1.1);
  transition: all 0.2s ease-out;
}

.sp-menu-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sp-menu-item {
  transition: all 0.2s ease-out;
  padding: 18px 14px 18px 30px;
  letter-spacing: 0.05em;
  text-indent: 0.05em;
  @include center-letter-spacing();
  @include hover();
  @include sp() {
    font-size: 1.9rem;
  }
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
