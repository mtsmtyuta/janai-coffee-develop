<template lang="pug">
.top-page(:class='{ "is-page-bar": isPageBar }')
  wave(:circleProgress='circleProgress')
  .eyecatch
    #eyecatch-logo.eyecatch-logo(@mousedown="onMousedown" @mouseup="onMouseup" @mousemove="onMousemove" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend")
      .eyecatch-logo-circle
        icon-logo-maru
      .eyecatch-logo-icon(v-if='!isPageBar')
        icon-logo-icon
      .eyecatch-logo-icon.logo-icon-bar(v-if='isPageBar')
        icon-logo-icon-bar
    .eyecatch-sidetexts
      .sidetext-left janaicoffee.tokyo
      .sidetext-right janaicoffee.tokyo
    .eyecatch-news(v-if='NewsNum')
      .news-short
        .news-info {{ $t('content.news') }}
        .news-short-content#news-short-content
          .news-date {{ format(news[NewsDisplayNum].createdAt) }}
          .news-title(@click='openNewsBody') {{ news[NewsDisplayNum].title }}
        .news-arrows(v-if='NewsNum > 1')
          .news-arrow-left.news-arrow(@click='minusNewsDisplayNum') &lt;
          .news-arrow-size
            span.news-display-num#news-display-num {{NewsDisplayNum + 1}}
            span.news-display-slash /
            span.news-num {{NewsNum}}
          .news-arrow-right.news-arrow(@click='plusNewsDisplayNum') &gt;
    .eyecatch-reservation(v-if='isPageBar')
      .reservation-button-wrapper: a.reservation-button(href='https://yoyaku.toreta.in/janaicoffee/#/' target="_blank") {{ $t('content.reservation_button') }}
      .reservation-caption {{ $t('content.reservation_caption') }}
  .news-body-wrapper
    transition(name="fade")
      news-body(v-if='isNewsBodyDisplay' :news='news[NewsDisplayNum]' @cancelNewsBody="closeNewsBody" @onClickNewsLeftArrow='minusNewsDisplayNum' @onClickNewsRightArrow='plusNewsDisplayNum')
  .page-content.non-padding
    .page-content-main
      section.section.section-concept#concept(v-scroll-motion="handleScrollMotion")
        .section-body
          .section-item(:class='{"reverse": isPageBar, "add-bg-image": isPageBar}')
            .section-item-title
              .title-image-wrapper
                transition(name="fade")
                  .title-image-inner(v-if='!isPageBar')
                    img.title-image(src='/assets/concept-coffee1.jpg' srcset='/assets/concept-coffee1.jpg 1x, /assets/concept-coffee1@2x.jpg 2x')
            .section-item-content(:class='{"is-fullwidth": isPageBar}')
              transition(name="fade")
                h2.subtitle(v-if='!isPageBar')
                  | {{ $t('content.concept_coffee_title') }}
                  br
                  | {{ $t('content.concept_coffee_subtitle') }}
                h2.subtitle(v-else)
                  | {{ $t('content.concept_bar_title') }}
                  br
                  | {{ $t('content.concept_bar_subtitle') }}
              transition(name="fade")
                .discription(v-if='!isPageBar' v-html="$t('content.concept_coffee_description').replace(/\\n/g, '<br>')")
                .discription(v-else v-html="$t('content.concept_bar_description').replace(/\\n/g, '<br>')")
      section.section.section-concept#drink(v-scroll-motion="handleScrollMotion")
        .section-body
          .section-item(:class='{"reverse": !isPageBar}')
            .section-item-title
              .title-image-wrapper
                transition(name="fade")
                  .title-image-inner(v-show='!isPageBar')
                    img.title-image(src='/assets/drink-coffee1.jpg' srcset='/assets/drink-coffee1.jpg 1x, /assets/drink-coffee1@2x.jpg 2x')
                transition(name="fade")
                  .title-image-inner(v-show='isPageBar')
                    swiper-container(:autoplay="{delay: 3000}" :loop='true' v-if="slideImages.length!==0")
                      swiper-slide(v-for="(top, index) in slideImages" :key="index")
                        img.title-image(:src="top.src" :srcset="top.srcset")
            .section-item-content
              transition(name="fade")
                h2.subtitle(v-if='!isPageBar') {{ $t('content.drink_coffee_title') }}
                h2.subtitle(v-else) {{ $t('content.drink_bar_title') }}
              transition(name="fade")
                .discription(v-if='!isPageBar' v-html="$t('content.drink_coffee_description').replace(/\\n/g, '<br>')")
                .discription(v-else)
                  | {{ $t('content.drink_bar_description') }}
                  br
                  | 辿り着いた方だけが入れるバーがあります。
                  br
                  | スタッフにこちらの
                  br
                  | サイトの画面をお見せください。
                  br
                  | お客様を店内へとご案内いたします。
                  br
                  | (この画面をお見せ頂けない方は
                  br
                  | ご入店をお断りしています。)
      transition(name="fade")
        section.section.section-concept.section-add-padding#menu(v-if='!isPageBar' v-scroll-motion="handleScrollMotion")
          .section-body
            .section-item
              .section-item-content.is-center
                h2.subtitle(v-html="$t('content.takeout_title').replace(/\\n/g, '<br class=\"disable-pc\">')")
                .discription(v-html="$t('content.takeout_description').replace(/\\n/g, '<br>')")
      transition(name="fade")
        section.section.section-concept#menu(v-if='isPageBar' v-scroll-motion="handleScrollMotion")
          .section-body
            .section-item.reverse
              .section-item-title.title-portrait
                .title-image-wrapper
                  .title-image-inner
                    img.title-image.title-image-portrait(src='/assets/menu-bar1.jpg' srcset='/assets/menu-bar1.jpg 1x, /assets/menu-bar1@2x.jpg 2x')
              .section-item-content
                h2.subtitle {{ $t('content.menu_bar_title') }}
                .discription
                  | {{ $t('content.menu_bar_description') }}
                  br
                  | ちなみにバー側のページは
                  br
                  | 縦読みしても意味がありません。
      transition(name="fade")
        section.section.section-photos#photos(v-if='isPageBar' v-scroll-motion="handleScrollMotion")
          .section-body
            .section-item
              img.section-photos-image(src='/assets/photos-bar.jpg' srcset='/assets/photos-bar.jpg 1x, /assets/photos-bar@2x.jpg 2x')
      section.section.section-access.section-add-padding#access(v-scroll-motion="handleScrollMotion")
        .section-body
          .section-item.reverse
            .section-item-title.section-item-title-access
              .access-list
                ul
                  li {{ $t('content.access_name') }}
                  li {{ $t('content.access_hours') }}
                  li {{ $t('content.access_address') }}
                  li {{ $t('content.access_location') }}
                  li: a(href="mailto:info@janaicoffee.tokyo") MAIL：{{ $t('content.access_email') }}
                  li(v-if='isPageBar') {{ $t('content.access_reservation_note') }}
                  li(v-if='isPageBar') {{ $t('content.access_form_label') }}
                    a.access-form-link(href='https://yoyaku.toreta.in/janaicoffee/#/' target="_blank") https://yoyaku.toreta.in/janaicoffee/#/
            .section-item-content.access-map-wrapper
              .access-map
                iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.2771109716264!2d139.70512671525782!3d35.64554368020272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b40c4376027%3A0x37bc19385da775f3!2z44CSMTUwLTAwMjIg5p2x5Lqs6YO95riL6LC35Yy65oG15q-U5a-_5Y2X77yS5LiB55uu77yT4oiS77yR77yT!5e0!3m2!1sja!2sjp!4v1583213725652!5m2!1sja!2sjp" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="")
</template>
    
<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { register } from 'swiper/element/bundle';
  register();

  import iconLogoMaru from '../public/assets/logo_maru2.svg?component'
  import iconLogoIcon from '../public/assets/logo-icon.svg?component'
  import iconLogoIconBar from '../public/assets/logo-icon-bar.svg?component'
  interface News {
    title: string
    createdAt: string
    body?: string
  }

  const nuxtApp = useNuxtApp()
  const dayJs: any = nuxtApp.$dayjs

  const format = function (date: string) {
    if(date) {
      return dayJs(date).format('YYYY.MM.DD')
    } else {
      return '';
    }

  }


  //カスタムディレクティブ
  const vScrollMotion = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const f = function(e: Event) {
        if (binding.value(e, el)) {
          document.removeEventListener('scroll', f)
        }
      }
      document.addEventListener('scroll', function() {}, false)
      document.addEventListener('scroll', f)
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
      const f = function(e: Event) {
        if (binding.value(e, el)) {
          document.removeEventListener('scroll', f)
        }
      }
      document.addEventListener('scroll', function() {}, false)
      document.addEventListener('scroll', f)
    }
  }

  const slideImages = [
    {
      src: '/assets/menu-bar1.jpg',
      srcset: '/assets/drink-bar1.jpg 1x, /assets/drink-bar1@2x.jpg 2x',
    },
    {
      src: '/assets/menu-bar2.jpg',
      srcset: '/assets/drink-bar2.jpg 1x, /assets/drink-bar2@2x.jpg 2x',
    },
    {
      src: '/assets/menu-bar3.jpg',
      srcset: '/assets/drink-bar3.jpg 1x, /assets/drink-bar3@2x.jpg 2x',
    },
    {
      src: '/assets/menu-bar4.jpg',
      srcset: '/assets/drink-bar4.jpg 1x, /assets/drink-bar4@2x.jpg 2x',
    }
  ]

//newsの対応
    // async asyncData() {
    //   const news = await newsApi.getNews()
    //   return { news }
    // }
    // news!: News[]
    const {data: news, pending, error, refresh} = await useFetch('/api/news')

    const isMousedown = ref<Boolean>(false)
    const mouseX = ref<number>(0)
    const mouseY = ref<number>(0)
    const firstTheta = ref<number>(0)
    const beforeTheta = ref<number>(0)
    // 円をなぞる範囲(半径の範囲内に収まるか, 角度を網羅できるか)
    const circleProgress = ref<number>(0)
    const circleRange = reactive({
      r: 0,
      rRange: 80, // 半径の判定の甘さ(幅60*2のマージン)
      thetaRange: 0.2 * Math.PI, // 回転速度の判定の甘さ(theta/event)
      centerX: 0,
      centerY: 0
    })
    const isFirstTouch = ref<Boolean>(false)
    const isNewsBodyDisplay = ref<Boolean>(false)
    const NewsDisplayNum = ref<number>(0)

    const { isPageBar, setIsPageBar } = useStateIsPageBar()


    const fixHeight = computed(() => {
      return 100 * Math.floor(circleProgress.value * 10) + 'px'
    })
    const fixOpacity = computed(() => {
      return Math.floor(circleProgress.value * 10) / 10
    })
    const NewsNum = computed(() => {
      return news.value?.length
    })

    const openNewsBody = () => {
      isNewsBodyDisplay.value = true
    }
    const closeNewsBody = () => {
      isNewsBodyDisplay.value = false
    }
    const plusNewsDisplayNum = () => {
      if (NewsNum.value > 1) {
        if (NewsDisplayNum.value >= NewsNum.value - 1) {
          NewsDisplayNum.value = 0
        } else {
          NewsDisplayNum.value++
        }
        fadeShortContent()
      }
    }
    const minusNewsDisplayNum = () => {
      if (NewsNum.value > 1) {
        if (NewsDisplayNum.value <= 0) {
          NewsDisplayNum.value = NewsNum.value - 1
        } else {
          NewsDisplayNum.value--
        }
        fadeShortContent()
      }
    }
    const fadeShortContent = () => {
      const newsShortContent = document.getElementById('news-short-content')
      const newsDisplayNum = document.getElementById('news-display-num')
      if (newsShortContent && newsDisplayNum) {
        newsShortContent.classList.add('news-short-fadeout')
        newsShortContent.classList.remove('news-short-fadein')
        newsDisplayNum.classList.add('news-short-fadeout')
        newsDisplayNum.classList.remove('news-short-fadein')
        setTimeout(function() {
          newsShortContent.classList.add('news-short-fadein')
          newsShortContent.classList.remove('news-short-fadeout')
          newsDisplayNum.classList.add('news-short-fadein')
          newsDisplayNum.classList.remove('news-short-fadeout')
        }, 50)
      }
    }
    const handleResize = () => {
      // ディスクリプションの縦幅を揃えて画像サイズがばらばらにならないようにする
      const sectionItemContents = Array.from(
        document.getElementsByClassName('section-item-content')
      )
      if (sectionItemContents) {
        sectionItemContents.forEach(sectionItemContent => {
          ;(sectionItemContent as HTMLElement).style.height = ''
        })
        const sectionItemContentsHeight = sectionItemContents.map(
          sectionItemContent => sectionItemContent.clientHeight
        )
        const sectionItemContentsHeightMax = Math.max.apply(
          null,
          sectionItemContentsHeight
        )
        sectionItemContents.forEach(sectionItemContent => {
          ;(sectionItemContent as HTMLElement).style.height =
            sectionItemContentsHeightMax + 'px'
        })
      }
    }
    const handleTouchMove  = (event: Event) => {
      event.preventDefault()
    }

    const onMousedown = () => {
      culcCircleRange()
      isMousedown.value = true
      isFirstTouch.value = true
      firstTheta.value = 0
      beforeTheta.value = 0
    }
    const onTouchstart = () => {
      culcCircleRange()
      isMousedown.value = true
      isFirstTouch.value = true
      firstTheta.value = 0
      beforeTheta.value = 0
      // マウスイベントの2重実行禁止
      document.removeEventListener('mousedown', onMousedown, {})
      document.removeEventListener('mousemove', onMousemove, {})
      document.removeEventListener('mouseup', onMouseup, {})
      // 通常のスクロールを禁止
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false
      })
    }
    const onMouseup = () => {
      resetMouseParam()
    }
    const onTouchend = () => {
      resetMouseParam(true)
    }
    const resetMouseParam = (isTouch: boolean = false) => {
      isMousedown.value = false
      isFirstTouch.value = false
      mouseX.value = 0
      mouseY.value = 0
      firstTheta.value = 0
      beforeTheta.value = 0
      circleProgress.value = 0
      // スクロール禁止解除
      if (isTouch) {
        document.removeEventListener('touchmove', handleTouchMove, {})
      }
    }
    const onMousemove = (e: MouseEvent) => {
      if (isMousedown.value) {
        if (e != null) {
          mouseX.value = e.offsetX
          mouseY.value = e.offsetY
          const isCircleRangeReturn = isCircleRange(
            mouseX.value,
            mouseY.value,
            beforeTheta.value
          )
          beforeTheta.value = isCircleRangeReturn.theta
          if (isCircleRangeReturn.isCircleRange === false) {
            resetMouseParam()
          } else {
            circleProgress.value =
              (isCircleRangeReturn.theta - firstTheta.value) / (2 * Math.PI)
            if (circleProgress.value > 0.99) {
              resetScrollMotionFade()
              setIsPageBar()
              resetMouseParam()
            }
          }
        }
      }
    }
    const onTouchmove = (e: TouchEvent) => {
      if (isMousedown.value) {
        if (e.touches[0] && e.currentTarget instanceof HTMLElement) {
          const targetRect = e.currentTarget.getBoundingClientRect()
          mouseX.value = e.touches[0].clientX - targetRect.left
          mouseY.value = e.touches[0].clientY - targetRect.top
          const isCircleRangeReturn = isCircleRange(
            mouseX.value,
            mouseY.value,
            beforeTheta.value
          )
          beforeTheta.value = isCircleRangeReturn.theta
          if (isCircleRangeReturn.isCircleRange === false) {
            resetMouseParam(true)
          } else {
            circleProgress.value =
              (isCircleRangeReturn.theta - firstTheta.value) / (2 * Math.PI)
            if (circleProgress.value > 0.99) {
              resetScrollMotionFade()
              setIsPageBar()
              resetMouseParam(true)
            }
          }
        }
      }
    }
    const isCircleRange = (inputX: number, inputY: number, beforeTheta: number) => {
      let isXPositive = true
      let isYPositive = true
      let x = inputX - circleRange.centerX
      // 時計回り(反時計回りの場合条件を逆に)
      if (x > 0) {
        x = -x
        isXPositive = false
      }
      let y = circleRange.centerY - inputY
      // 時計回り(反時計回りの場合条件を逆に)
      if (y > 0) {
        y = -y
        isYPositive = false
      }
  
      // r, theta計算
      const r = Math.sqrt(x * x + y * y)
      let theta = Math.acos(x / r)
      if (isXPositive && !isYPositive) {
        theta = 2 * Math.PI - theta
      } else if (!isXPositive && isYPositive) {
        theta = Math.PI - theta
      } else if (!isXPositive && !isYPositive) {
        theta = Math.PI + theta
      }
  
      // rが範囲内か
      if (
        circleRange.r + circleRange.rRange > r &&
        circleRange.r - circleRange.rRange < r
      ) {
      } else {
        return { isCircleRange: false, theta: 0 }
      }
  
      // 初期値がない場合は初期値をセットして終了
      if (isFirstTouch.value) {
        firstTheta.value = theta
        isFirstTouch.value = false
        return { isCircleRange: true, theta }
      }
  
      // 初期値より小さい値は加算
      if (firstTheta.value > theta) {
        theta = theta + 2 * Math.PI
      }
  
      // theta の移動差分(回転速度)が範囲内か
      if (Math.abs(beforeTheta - theta) < circleRange.thetaRange) {
        return { isCircleRange: true, theta }
      } else {
        return { isCircleRange: false, theta: 0 }
      }
    }
  
    const culcCircleRange = () => {
      // const idLogoMaruCircle = document.getElementById('logo-maru-circle')
      const idLogoMaruCircle = document.getElementById('eyecatch-logo')
      const idEyecatchLogo = document.getElementById('eyecatch-logo')
      if (idLogoMaruCircle && idEyecatchLogo) {
        const idLogoMaruCircleRect = idLogoMaruCircle.getBoundingClientRect()
        const idEyecatchLogoRect = idEyecatchLogo.getBoundingClientRect()
        circleRange.r = idLogoMaruCircleRect.width / 2
        circleRange.centerX =
          idLogoMaruCircleRect.left - idEyecatchLogoRect.left + circleRange.r
        circleRange.centerY =
          idLogoMaruCircleRect.top - idEyecatchLogoRect.top + circleRange.r
      }
    }
    const handleScrollMotion = (e: any, el: HTMLElement) => {
      if (e.target) {
        const targetPosition = el.getBoundingClientRect().top + window.scrollY
        const targetPositionSpace = targetPosition - window.outerHeight / 2
        if (window.scrollY > targetPositionSpace) {
          el.classList.add('scroll-motion-fade')
        }
        // return false
        return window.scrollY > targetPosition + 100
      }
    }
    const resetScrollMotionFade = () => {
      // scroll motion 初期化
      const ScrollMotionFades = Array.from(
        document.getElementsByClassName('scroll-motion-fade')
      )
      if (ScrollMotionFades) {
        ScrollMotionFades.forEach(ScrollMotionFade => {
          ;(ScrollMotionFade as HTMLElement).classList.remove(
            'scroll-motion-fade'
          )
        })
      }
    }

  definePageMeta({
    keepalive: true,
  })
  
</script>
    
    
<style lang="scss" scoped>
    .eyecatch-logo-circle {
      width: 100%;
    }
    .top-page {
      transition: 1s ease all;
      background-color: white;
    }
    .page-content-main {
      // padding-top: 200px;
      padding-bottom: 0;
    }
    .eyecatch {
      // padding-bottom: 100px;
      min-height: 100vh;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      transition: ease 0.5s all;
      .eyecatch-news {
        transition: ease 0.5s all;
        .news-short {
          @include inner();
          padding-left: 60px;
          color: #001525;
          font-family: Noto Sans JP, 'メイリオ', Meiryo, Hiragino Kaku Gothic ProN,
            'ヒラギノ角ゴ ProN W3', sans-serif;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          box-sizing: border-box;
          line-height: 1.5em;
          padding-top: 24px;
          padding-bottom: 24px;
          display: flex;
          align-items: baseline;
          z-index: 1;
          @media only screen and (max-width: '1100px') {
            padding-left: 50px;
          }
          @media only screen and (max-width: '850px') {
            padding-left: 20px;
          }
          @include sp() {
            width: 97%;
            font-size: 1.2em;
            display: block;
          }
          @media only screen and (max-width: '400px') {
            font-size: 1.1em;
          }
        }
        .news-short-content {
          flex: 1 0 auto;
          display: flex;
          align-items: baseline;
          @include sp() {
            display: block;
          }
        }
        .news-display-slash {
          padding: 0 3px;
        }
        .news-info {
          padding: 0px 0.2em;
          font-weight: bold;
          font-size: 0.9em;
          letter-spacing: 0.06em;
          padding-right: 3em;
        }
        .news-date {
          padding-right: 1.5em;
          font-size: 0.9em;
          color: #4c4c4c;
        }
        .news-title {
          letter-spacing: 0.02em;
          text-decoration: underline;
          cursor: pointer;
          flex: 1 0 auto;
        }
        .news-arrows {
          display: flex;
          padding: 0 10px;
          .news-arrow {
            cursor: pointer;
            padding: 0 10px;
          }
          @include sp() {
            position: absolute;
            top: 25px;
            right: 10px;
          }
        }
      }
      .eyecatch-reservation {
        position: absolute;
        bottom: 110px;
        .reservation-button-wrapper {
          text-align: center;
          transition: ease all 0.5s;
          &:hover {
            background-color: #ffffff22;
          }
        }
        .reservation-button {
          color: inherit;
          display: inline-block;
          padding: 0.7em 5em;
          border: 1px solid;
          font-size: 1.2em;
          letter-spacing: 0.2em;
        }
        .reservation-caption {
          padding-top: 10px;
          font-size: 0.7em;
        }
      }
      .eyecatch-logo {
        width: 330px;
        max-width: 70%;
        position: relative;
        top: -15px;
        z-index: 1;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }
      .eyecatch-logo-icon {
        svg {
          position: absolute;
          width: 140px;
          max-width: 44%;
          top: 52%;
          left: 52%;
          transform: translate(-50%, -50%);
        }
        &.logo-icon-bar {
          svg {
            left: 51%;
          }
        }
      }
      .eyecatch-comming-soon {
        padding-top: 5px;
        text-align: center;
        width: 28%;
      }
      .eyecatch-sidetexts {
        .sidetext-left {
          position: absolute;
          left: 0;
          letter-spacing: 0.2em;
          top: 50%;
          transform-origin: left;
          transform: translate(13px, 4.79em) rotate(270deg);
        }
        .sidetext-right {
          position: absolute;
          letter-spacing: 0.2em;
          right: 0;
          top: 50%;
          transform-origin: right;
          transform: translate(-13px, 4.79em) rotate(90deg);
        }
      }
      .img-comming-soon {
        width: 100%;
        max-width: 120px;
      }
    }
    .news-body-wrapper {
      z-index: 30000;
      position: relative;
    }
    .text-highlight {
      @include sp() {
        background-color: white;
      }
    }
    
    .is-page-bar {
      .eyecatch {
        background-color: #001525;
        .eyecatch-news {
          .news-short {
            color: white;
          }
          .news-date {
            color: white;
          }
        }
        .eyecatch-logo-icon {
          svg {
            fill: white!important;
            filter: drop-shadow(0 0 10px white);
          }
        }
        .eyecatch-logo-circle {
          g {
            fill: white!important;
          }
          svg {
            fill: white!important;
            filter: drop-shadow(0 0 10px white);
            :deep(.st0) {
              fill: white!important;
            }
            path {
              fill: white;
            }   
          }
        }
      }
      .eyecatch-news {
        color: white;
        // text-shadow: 0px 0px 5px #ffda05;
        // font-weight: bold;
        border: none;
        background: #ffffff33;
      }
      .text-highlight {
        @include sp() {
          background-color: #222222;
        }
      }
    }
    .section {
      @include inner(initial);
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      + .section {
        padding-top: 240px;
        @include sp() {
          padding-top: 120px;
        }
      }
      &:first-child {
        padding-top: 240px;
        @include sp() {
          padding-top: 120px;
        }
      }
      &.section-add-padding {
        padding-bottom: 240px;
        @include sp() {
          padding-bottom: 100px;
        }
      }
      &.section-access {
        flex-direction: column;
        justify-content: center;
        background-color: #001525;
        color: white;
        @include sp() {
          .section-item {
            display: block;
          }
          .section-item-title {
            transform: none;
            padding-bottom: 25px;
          }
        }
      }
      .section-item {
        display: flex;
        position: relative;
        &.reverse {
          flex-direction: row-reverse;
          @include sp() {
            flex-direction: column;
          }
          .section-item-title {
            transform-origin: left top;
            .title:not(.title-access) {
              left: 90%;
              @include sp() {
                left: 6%;
              }
            }
          }
          .title-portrait {
            @include sp() {
              position: absolute;
            }
          }
          .section-item-content {
            transform-origin: right top;
          }
        }
      }
      .title-image-wrapper {
        height: 100%;
        width: 100%;
        // z-index: -1;
        display: flex;
        justify-content: flex-start;
        @include sp() {
          justify-content: center;
        }
      }
      .reverse {
        .title-image-wrapper {
          display: flex;
          justify-content: initial;
          @include sp() {
            justify-content: center;
          }
        }
      }
      .section-item-title {
        transform-origin: center top;
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 49px;
        position: relative;
        display: flex;
        align-items: center;
        @media only screen and (max-width: '1100px') {
          padding: 0 40px;
        }
        @media only screen and (max-width: '850px') {
          padding: 0 20px;
        }
        .title {
          height: 30px;
          position: absolute;
          left: 12%;
          top: -90px;
          margin-bottom: 3rem;
          z-index: 7777;
          @include sp() {
            left: 93%;
          }
          &.title-access {
            left: 90.1%;
            top: -90px;
            z-index: 0;
            @include sp() {
              left: 93%;
            }
          }
          &.section-item-title-access {
            transform: none;
          }
          svg {
            transform: rotate(90deg);
            transform-origin: left;
            height: 100%;
            width: auto;
          }
        }
        .title-image-inner {
          height: 100%;
          width: 100%;
          position: relative;
          box-shadow: -10px 10px #001525;
          // filter: brightness(1);
          @include sp() {
            text-align: right;
          }
          .title-image {
            width: auto;
            height: auto;
            position: relative;
            max-width: 100%;
            max-height: 540px;
            @include sp() {
              max-height: 100%;
            }
            &.title-image-portrait {
              max-height: 800px;
              @include sp() {
                max-height: initial;
                position: absolute;
                width: 110px;
                right: 0;
                top: 150px;
              }
            }
          }
        }
      }
      .subtitle {
        line-height: 2em;
        font-size: 1.92em;
        padding-bottom: 1.8em;
        letter-spacing: 0.2em;
        @media only screen and (max-width: '1100px') {
          font-size: 1.5em;
        }
        @media only screen and (max-width: '850px') {
          font-size: 1.4em;
        }
        @include sp() {
          font-size: 1.9em;
        }
        @media only screen and (max-width: '400px') {
          font-size: 1.7em;
          letter-spacing: 0.15em;
        }
      }
      .section-item-content {
        width: 50%;
        position: relative;
        font-size: 1.4rem;
        transform-origin: left top;
        display: flex;
        flex-direction: column;
        padding: 0 49px;
        box-sizing: border-box;
        align-items: flex-start;
        &.is-fullwidth {
          width: 100%;
        }
        &.is-center {
          width: 100%;
          align-items: center;
          text-align: center;
        }
        @media only screen and (max-width: '1100px') {
          padding: 0 40px;
        }
        @media only screen and (max-width: '850px') {
          padding: 0 20px;
        }
        &.access-map-wrapper {
          height: auto !important;
          @include sp() {
            width: 100%;
            .access-map {
              width: 100%;
            }
          }
        }
        .title {
          font-weight: bold;
          font-size: 1.2em;
          line-height: 1.8em;
          font-family: serif;
          color: colors('beige_text');
          padding: 0.7em 0 1em;
        }
      }
      .access-form-link {
        text-decoration: underline;
      }
      .access-list li {
        font-size: 1.5rem;
        line-height: 3.1em;
        letter-spacing: 0.17em;
        @media only screen and (max-width: '1100px') {
          font-size: 1.3rem;
        }
        @include sp() {
          font-size: 1.25em;
          letter-spacing: 0.07em;
        }
        @media only screen and (max-width: '400px') {
          font-size: 1.16em;
          letter-spacing: 0.03em;
        }
        @media only screen and (max-width: '360px') {
          font-size: 1.06em;
          letter-spacing: 0.03em;
        }
      }
      .discription {
        font-size: 1.5rem;
        line-height: 3.4em;
        padding-bottom: 2em;
        letter-spacing: 0.15em;
        @media only screen and (max-width: '1100px') {
          font-size: 1.3rem;
        }
        @include sp() {
          font-size: 1.25em;
          line-height: 3.3em;
          letter-spacing: 0.07em;
          padding-bottom: 0;
        }
        @media only screen and (max-width: '400px') {
          font-size: 1.16em;
          letter-spacing: 0.03em;
        }
        @media only screen and (max-width: '360px') {
          font-size: 1.06em;
          letter-spacing: 0.03em;
        }
      }
      @include sp() {
        .section-item {
          padding-bottom: 0;
          flex-direction: column;
        }
        .section-item-content {
          width: 100%;
          padding: 0;
          // height: auto !important;
        }
        .reverse {
          .section-item-content {
            width: auto;
          }
        }
        .section-item-title {
          width: 100%;
          padding: 0;
        }
        &:not(.section-access) {
          .section-item-title {
            padding-bottom: 4em;
          }
          .section-item-content {
            transform-origin: center top;
          }
        }
        .reverse {
          &:not(.section-access) {
            .section-item-title {
              left: 0;
              right: inherit;
            }
            .section-item-content {
              transform-origin: left top;
            }
            .title-image-inner {
              box-shadow: 10px 10px #001525;
              text-align: left;
            }
          }
        }
      }
    }
    
    .section-body {
      max-width: $inner-width;
      margin: 0 auto;
      width: 100%;
      .text {
        max-width: 500px;
        margin: 0 auto;
        font-size: 1.4rem;
        line-height: 1.8em;
      }
    }
    
    .section-photos-image {
      width: 100%;
      height: auto;
    }
    
    .access-list {
      font-size: 1.4rem;
      z-index: 1;
      @include sp() {
        padding: 0 4px;
      }
      a {
        color: inherit;
      }
    }
    .access-map {
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 30px;
      height: 0;
      width: 100%;
      overflow: hidden;
      transition: all ease 1s;
      iframe,
      object,
      embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    
    #design-logo-maru {
      path {
        fill: none;
        stroke: #333;
        stroke-dasharray: 5000;
        stroke-dashoffset: 0;
        stroke-width: 1;
        -webkit-animation: logoAnimation 2s ease-in forwards;
        animation: logoAnimation 2s ease-in forwards;
      }
      circle {
        stroke: #333;
        stroke-dasharray: 5000;
        stroke-dashoffset: 0;
        stroke-width: 8;
        animation: circle 1s ease-in;
      }
      @keyframes circle {
        0% {
          stroke-dashoffset: 5000;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      @-webkit-keyframes logoAnimation {
        0% {
          stroke-dashoffset: 5000;
          fill: transparent;
        }
        50% {
          fill: transparent;
        }
        100% {
          stroke-dashoffset: 0;
          fill: #333;
          stroke-width: 0;
        }
      }
      @keyframes logoAnimation {
        0% {
          stroke-dashoffset: 5000;
          fill: transparent;
        }
        50% {
          fill: transparent;
        }
        100% {
          stroke-dashoffset: 0;
          fill: #333;
          stroke-width: 0;
        }
      }
    }
    
    .top-page.is-page-bar {
      color: white;
      .section {
        background-color: #001525;
      }
      .title {
        svg {
          filter: drop-shadow(0 0 10px white);
          fill: white;
        }
      }
      .access-map {
        // box-shadow: 0 0 6px -2px white;
        iframe {
          filter: invert(0.95);
        }
      }
      .title-image-inner {
        opacity: 0.8;
        box-shadow: none;
        // filter: brightness(0.8);
      }
      .section-item.add-bg-image {
        background-image: url(/assets/concept-bar1.jpg);
        background-position: right 0%;
        background-size: contain;
        background-repeat: no-repeat;
      }
      #design-logo-maru {
        filter: drop-shadow(0 0 10px #ee0) drop-shadow(0 0 10px #fff);
        path {
          fill: none;
          stroke: white;
          stroke-dasharray: 5000;
          stroke-dashoffset: 0;
          stroke-width: 1;
          -webkit-animation: logoAnimationIsPageBar 2s ease-in forwards;
          animation: logoAnimationIsPageBar 2s ease-in forwards;
        }
        circle {
          stroke: #fffade;
          stroke-dasharray: 5000;
          stroke-dashoffset: 0;
          stroke-width: 8;
          animation: circle 1s ease-in;
        }
        @keyframes circle {
          0% {
            stroke-dashoffset: 5000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @-webkit-keyframes logoAnimationIsPageBar {
          0% {
            stroke-dashoffset: 5000;
            fill: transparent;
          }
          50% {
            fill: transparent;
          }
          100% {
            stroke-dashoffset: 0;
            fill: #fffade;
            stroke-width: 0;
          }
        }
        @keyframes logoAnimationIsPageBar {
          0% {
            stroke-dashoffset: 5000;
            fill: transparent;
          }
          50% {
            fill: transparent;
          }
          100% {
            stroke-dashoffset: 0;
            fill: #fffade;
            stroke-width: 0;
          }
        }
      }
    }
    
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
    
    .page-content-main :not(.scroll-motion-fade) {
      .subtitle {
        opacity: 0;
        transform: translateX(-10px) translateY(-10px) scale(0.93);
        transition: all ease 0.25s;
      }
      .discription {
        opacity: 0;
        transform: translateX(-10px) translateY(-10px) scale(0.93);
        transition: all ease 0.35s;
      }
      .section-item-title {
        .title {
          opacity: 0;
          transform: translateX(-10px) translateY(-10px) scale(0.93);
          transition: all ease 0.25s;
        }
        .title-image-wrapper {
          opacity: 0;
          transform: translateX(-10px) translateY(-10px) scale(0.93);
          transition: all ease 0.7s;
        }
      }
    }
    .news-short-fadeout {
      opacity: 0;
    }
    .news-short-fadein {
      animation: ChangeNewsAnimationFadeIn 0.4s forwards;
      @keyframes ChangeNewsAnimationFadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
    .page-content-main {
      .scroll-motion-fade {
        .subtitle {
          opacity: 1;
          transform: translateX(0px) translateY(0px) scale(1);
        }
        .discription {
          opacity: 1;
          transform: translateX(0px) translateY(0px) scale(1);
        }
        .section-item-title {
          .title {
            opacity: 1;
            transform: translateX(0px) translateY(0px) scale(1);
          }
          .title-image-wrapper {
            opacity: 1;
            transform: translateX(0px) translateY(0px) scale(1);
          }
        }
      }
    }
    
    // svg
    #design-logo-maru {
      .cls-logo-maru,
      .cls-logo-maru2 {
        fill: none;
      }
      .cls-logo-maru2 {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 8px;
      }
    }
    
    br.disable-pc {
      display: none;
      @include sp() {
        display: inline;
      }
    }
</style>
    