<template lang="pug">
  .button(:class='[type, size]')
    slot
      svg
      .text テキスト
</template>

<script setup lang="ts">
const props = defineProps<{
  type: String,
  size: String,
}>()

</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  appearance: none;
  height: 40px;
  border-radius: 23px;
  justify-content: center;
  padding: 0 6em;
  font-size: 1.4rem;
  letter-spacing: 0.1em;
  font-weight: bold;
  background: $gradient-g;
  color: white;
  box-shadow: 0 1px 2px rgba(black, 0.3);
  cursor: pointer;
  svg + .text {
    padding-left: 0.5em;
  }
  svg {
    width: 22px;
    path {
      fill: white;
    }
    &:first-child {
      margin-right: 8px;
    }
    &:last-child {
      margin-left: 8px;
    }
  }
  &:focus {
    outline: none;
  }
  &.b {
    background: $gradient-b;
  }
  &.p {
    background: #f70038;
  }
  &.large {
    font-size: 1.6rem;
    height: 60px;
    border-radius: 30px;
    padding: 0 56px;
    svg {
      width: 20px;
    }
  }
  @include pc() {
    transition: all 0.2s ease-out;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 1px rgba(black, 0.3);
      transform: translateY(2px);
    }
  }
  @include sp() {
    padding: 0 3em;
  }
}
</style>
