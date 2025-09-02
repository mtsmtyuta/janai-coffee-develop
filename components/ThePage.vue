<template lang="pug">
.access-page
  .page-content
    .page-content-main
      .section
        .section-heading
          slot(name="sectionHeader")
            h2.title Header
            h3.subtitle 見出し1
        .section-body
          slot(name="sectionBody")
            .section-body-block
              h4.section-body-title 見出し2
              p.text.section-body-text 段落
              .section-body-image-text-wrapper
                .section-body-image-wapper
                  img.section-body-image(src='')
                p.text.section-body-image-text 画像テキスト
              .section-body-contents
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.section {
  padding: 0 0 0px 0;
  font-size: 1.4rem;
}

.section-heading {
  text-align: center;
  padding: 40px 0;
  position: relative;
  z-index: 1;
  color: white;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 75px;
  &::before {
    content: '';
    width: 100vw;
    height: 100%;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    z-index: -1;
    top: 0;
    // background-size: cover;
    // background-repeat: no-repeat;
    // background-position: 0px 80%;
    // background-image: url(/assets/point01.jpg);
    min-width: 320px;
  }
  &::after {
    content: '';
    width: 100vw;
    height: 100%;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    z-index: -1;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    min-width: 320px;
  }
  .title {
    font-family: 'Playball', 'Felipa', cursive;
    font-weight: bold;
    font-size: 40px;
    letter-spacing: 0.1em;
    &.white {
      color: white;
    }
    &.gray {
      color: gray;
    }
  }
  .subtitle {
    padding-top: 0.8em;
    font-weight: bold;
    &.white {
      color: white;
    }
    &.gray {
      color: gray;
    }
  }
}
.section-body-image-text-wrapper {
  display: flex;
  padding-bottom: 90px;
  align-items: flex-end;
  justify-content: center;
  @include sp() {
    display: block;
    padding-bottom: 20px;
  }
  .section-body-image-wapper {
    position: relative;
    left: 1%;
    @include sp() {
      width: 97%;
      left: 0;
    }
    img.section-body-image {
      max-width: 500px;
      @include sp() {
        max-width: 100%;
      }
    }
  }
  .section-body-image-text {
    max-width: 340px;
    font-size: 1.4rem;
    line-height: 1.9em;
    text-align: left;
    width: 50%;
    position: relative;
    left: -1%;
    bottom: -20px;
    font-size: 1.4rem;
    box-shadow: 9px 9px 1px 0 rgba(0, 4, 0, 0.13);
    background-color: #fff;
    padding: 22px 36px;
    @include sp() {
      width: 85%;
      left: 5%;
      top: -40px;
      padding: 22px 22px;
    }
  }
}
.section-body {
  max-width: $inner-width;
  margin: 0 auto;
  img {
    max-width: 100%;
  }
  .text {
    max-width: 500px;
    margin: 0 auto;
    font-size: 1.4rem;
    line-height: 1.8em;
  }
  .section-body-text {
    max-width: 560px;
    margin: 0 auto;
    font-size: 1.4rem;
    line-height: 2.5em;
    padding-bottom: 60px;
  }
}

.section-body-block {
  text-align: center;
  & + .section-body-block {
    padding-top: 90px;
  }
}

.section-body-title {
  padding-bottom: 0.7em;
  margin-bottom: 1.7em;
  display: inline-block;
  font-size: 2.5rem;
  letter-spacing: 0.03em;
  position: relative;
  @include sp() {
    font-size: 2.2rem;
  }
  &::before {
    position: absolute;
    content: '';
    width: 4em;
    height: 3px;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0);
    background: #decebf;
    box-shadow: 0 1px 1px 0px #ead9c9;
  }
}
</style>
