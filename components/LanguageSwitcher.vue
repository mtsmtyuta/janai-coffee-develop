<template lang="pug">
.language-switcher
  button.language-toggle(
    @click="toggleLanguage"
    :aria-label="$t('ui.switch_language')"
    :class="{ 'is-page-bar': isPageBar }"
  )
    span.language-current {{ currentLanguageLabel }}
    span.language-separator /
    span.language-next {{ nextLanguageLabel }}
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const { isPageBar } = useStateIsPageBar()

const currentLanguageLabel = computed(() => {
  return locale.value === 'ja' ? '日本語' : 'English'
})

const nextLanguageLabel = computed(() => {
  return locale.value === 'ja' ? 'English' : '日本語'
})

const toggleLanguage = () => {
  locale.value = locale.value === 'ja' ? 'en' : 'ja'
}
</script>

<style lang="scss" scoped>
.language-switcher {
  display: flex;
  align-items: center;
}

.language-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  transition: all 0.2s ease-out;
  color: inherit;
  
  &:hover {
    opacity: 0.8;
  }
  
  &.is-page-bar {
    color: white;
  }
}

.language-current {
  opacity: 1;
}

.language-separator {
  margin: 0 0.5em;
  opacity: 0.6;
}

.language-next {
  opacity: 0.6;
}
</style>
