<template lang="pug">
.language-switcher
  .dropdown-wrapper
    button.dropdown-toggle(
      @click="toggleDropdown"
      :aria-label="$t('ui.switch_language')"
      :class="{ 'is-page-bar': isPageBar, 'is-open': isDropdownOpen }"
    )
      span.dropdown-label Language
      span.dropdown-arrow ▼
    .dropdown-menu(v-show="isDropdownOpen" :class="{ 'is-page-bar': isPageBar }")
      .dropdown-item(
        v-for="lang in availableLanguages"
        :key="lang.code"
        @click="selectLanguage(lang.code)"
        :class="{ 'is-active': locale === lang.code }"
      )
        span {{ lang.label }}
</template>

<script setup lang="ts">
const { locale, locales } = useI18n();
const { isPageBar } = useStateIsPageBar();

const isDropdownOpen = ref(false);

const availableLanguages = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectLanguage = (langCode: string) => {
  locale.value = langCode;
  isDropdownOpen.value = false;
};

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element;
    if (!target.closest(".language-switcher")) {
      isDropdownOpen.value = false;
    }
  };
  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});
</script>

<style lang="scss" scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.dropdown-wrapper {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.35rem;
  letter-spacing: 0.11em;
  transition: all ease 1s;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0 1.8em;
  position: relative;
  font-family: inherit;
  font-weight: inherit;

  &:hover {
    opacity: 0.8;
  }

  &.is-page-bar {
    color: white;
  }

  &.is-open {
    .dropdown-arrow {
      transform: rotate(180deg);
    }
  }
}

.dropdown-label {
  font-weight: inherit;
}

.dropdown-arrow {
  font-size: 0.8em;
  transition: transform 0.2s ease-out;
  opacity: 0.7;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 1000;

  &.is-page-bar {
    background: #001525;
    border-color: #333;
    box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
  }
}

.dropdown-item {
  padding: 0.75em 1em;
  cursor: pointer;
  transition: background-color 0.2s ease-out;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }

  &.is-active {
    background-color: #e3f2fd;
    font-weight: 500;
  }

  .dropdown-menu.is-page-bar & {
    color: white;

    &:hover {
      background-color: #ffffff11;
    }

    &.is-active {
      background-color: #ffffff22;
    }
  }
}
</style>
