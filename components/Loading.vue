<template lang="pug">
  .container
    .loading
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  width: 26px;
  height: 26px;
  border: 4px solid rgba(colors('b'), 0.3);
  border-top: 4px solid colors('b');
  border-radius: 50%;
  animation: rotate 0.6s infinite cubic-bezier(0.5, 0.75, 0.75, 0.5);
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
