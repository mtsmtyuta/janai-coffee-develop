<script lang="ts" setup>
import { computed } from '#imports';
import { useRouter } from '#app';
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const currentPath = computed(
  () => `http://janaicoffee.tokyo/${router.currentRoute.value.path}`
);

const currentTitle = computed(
  () => `${route.meta.title ? route.meta.title + ' | ' + "JANAI COFFEE" : "JANAI COFFEE" }`
);



const isMobilemenuAcitive = ref<Boolean>(false);

const mobilemenuToggle = () => {
  isMobilemenuAcitive.value = !isMobilemenuAcitive.value 
}

const mobilemenuClose= () => {
  isMobilemenuAcitive.value = false
}

const config = useRuntimeConfig();
let robots = 'index,follow'
console.log(config.public.environment)
if(config.public.environment == 'development'){
  console.log('development')
  robots = 'noindex,nofollow'
}

useHead({
  meta: [
    { property: 'og:url', content: currentPath },
    { property: 'og:title', content: currentTitle},
    { hid: 'robots', name: 'robots', content: robots },
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk  + ' | ' + "JANAI COFFEE" }` : "JANAI COFFEE"
  },
  
});



</script>

<template>
  <div>
    <div class="main page">
      <TheHeader class="page-header"></TheHeader>
      <div class="page-body">
        <slot />
      </div>
      <TheFooter class="page-footer"></TheFooter>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  @include sp() {
    min-width: unset;
  }
}

.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4000;
}

.page-body {
  flex: 1;
  // margin-top: 84px;
  position: relative;
  &:not(.top-page) {
    // background: #f1f1f1;
    background: white;
  }
  @include sp() {
    // margin-top: 51px;
  }
}
</style>