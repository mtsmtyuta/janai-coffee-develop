# Design Document

## Overview

The language switcher feature will implement internationalization (i18n) for the JANAI COFFEE website, allowing users to seamlessly switch between Japanese and English content. The solution will integrate with Nuxt 3's built-in i18n capabilities and provide a clean, accessible user interface component that maintains the site's aesthetic while ensuring optimal user experience across all devices.

## Architecture

### Core Components

1. **Language Switcher Component** (`LanguageSwitcher.vue`)
   - Toggle button displaying current language (日本語/EN)
   - Smooth transition animations matching site's design language
   - Accessible keyboard navigation support
   - Mobile-optimized touch interactions

2. **I18n Configuration**
   - Nuxt i18n module integration
   - Locale detection and persistence
   - Translation file management (JSON structure)
   - Fallback language handling

3. **Translation Management System**
   - Structured translation keys for all content areas
   - Namespace organization (navigation, content, ui, etc.)
   - Development-time missing translation detection

### Integration Points

- **Header Component**: Language switcher positioned in navigation area
- **Footer Component**: Optional secondary language switcher
- **Page Content**: All static text replaced with translation keys
- **Meta Tags**: Localized SEO metadata and page titles

## Components and Interfaces

### LanguageSwitcher.vue Interface

```typescript
interface LanguageSwitcherProps {
  position?: 'header' | 'footer' | 'inline'
  variant?: 'compact' | 'full'
  showLabels?: boolean
}

interface LanguageSwitcherEmits {
  languageChanged: (locale: string) => void
}
```

### Translation Structure

```typescript
interface TranslationSchema {
  navigation: {
    concept: string
    coffee: string
    bar: string
    menu: string
    access: string
  }
  content: {
    hero: {
      title: string
      subtitle: string
      description: string
    }
    concept: {
      title: string
      subtitle: string
      description: string
    }
    // ... additional content sections
  }
  ui: {
    news: string
    reservation: string
    loading: string
    // ... UI elements
  }
  meta: {
    title: string
    description: string
    keywords: string
  }
}
```

### Composable Interface

```typescript
interface UseI18nReturn {
  locale: Ref<string>
  locales: string[]
  t: (key: string, params?: Record<string, any>) => string
  setLocale: (locale: string) => void
  getLocalizedRoute: (route: string) => string
}
```

## Data Models

### Locale Configuration

```typescript
interface LocaleConfig {
  code: string
  name: string
  displayName: string
  file: string
  dir: 'ltr' | 'rtl'
  domain?: string
}

const locales: LocaleConfig[] = [
  {
    code: 'ja',
    name: 'Japanese',
    displayName: '日本語',
    file: 'ja.json',
    dir: 'ltr'
  },
  {
    code: 'en',
    name: 'English', 
    displayName: 'EN',
    file: 'en.json',
    dir: 'ltr'
  }
]
```

### Translation File Structure

```json
{
  "navigation": {
    "concept": "CONCEPT",
    "coffee": "COFFEE", 
    "bar": "BAR",
    "menu": "MENU",
    "access": "ACCESS"
  },
  "content": {
    "hero": {
      "tagline": "janaicoffee.tokyo"
    },
    "concept": {
      "coffee": {
        "title": "私たちが提供したいのはコーヒーだけではありません。",
        "description": "時を忘れる。計ることをやめる。周りと比べない。リラックスして日常を忘れる時間を。何一つ考えず、コーヒーと非日常を存分にお楽しみいただける場所。それが『JANAI COFFEE』です。"
      },
      "bar": {
        "title": "コーヒー屋のフリをしたバー",
        "description": "禁酒法が施行されていた1920年代のアメリカ。その時代、美容室や法律事務所などを装って裏でお酒を密売する文化「スピークイージー」が生まれ人気を博しました。"
      }
    }
  }
}
```

## Error Handling

### Missing Translation Handling

1. **Development Mode**
   - Console warnings for missing translation keys
   - Visual indicators in UI for untranslated content
   - Translation key display as fallback

2. **Production Mode**
   - Graceful fallback to default language (Japanese)
   - Silent logging of missing translations
   - Maintain user experience without breaking

### Locale Detection Errors

1. **Invalid Locale Handling**
   - Automatic fallback to default locale
   - User preference reset to valid locale
   - Error logging for debugging

2. **Storage Failures**
   - Session-based fallback when localStorage unavailable
   - Cookie-based persistence as secondary option
   - In-memory state management as final fallback

## Testing Strategy

### Unit Testing

1. **LanguageSwitcher Component**
   - Language toggle functionality
   - Accessibility compliance (ARIA labels, keyboard navigation)
   - Visual state changes and animations
   - Event emission verification

2. **Translation Functions**
   - Key resolution accuracy
   - Parameter interpolation
   - Fallback behavior testing
   - Namespace handling

### Integration Testing

1. **Cross-Component Translation**
   - Header/Footer language consistency
   - Page content translation synchronization
   - Route localization verification

2. **Persistence Testing**
   - Browser storage functionality
   - Session persistence across page reloads
   - Cross-tab synchronization

### E2E Testing

1. **User Workflow Testing**
   - Complete language switching flow
   - Content verification in both languages
   - Mobile device compatibility
   - Performance impact assessment

2. **SEO Testing**
   - Meta tag localization
   - URL structure validation
   - Search engine indexing compatibility

## Implementation Approach

### Phase 1: Core Infrastructure
- Install and configure @nuxtjs/i18n module
- Set up translation file structure
- Create base LanguageSwitcher component
- Implement locale persistence

### Phase 2: Content Translation
- Extract all hardcoded text to translation keys
- Create comprehensive Japanese translation file
- Develop English translations
- Update all Vue components with $t() calls

### Phase 3: UI Integration
- Integrate LanguageSwitcher into TheHeader component
- Add responsive design considerations
- Implement smooth transition animations
- Ensure accessibility compliance

### Phase 4: Testing & Optimization
- Comprehensive testing across all components
- Performance optimization
- SEO metadata localization
- Cross-browser compatibility verification

## Design Considerations

### Visual Design
- Minimal, clean toggle button design
- Consistent with existing site aesthetic
- Clear visual indication of current language
- Smooth hover and active states

### User Experience
- Instant language switching without page reload
- Maintained scroll position during language change
- Consistent navigation state preservation
- Mobile-first responsive design

### Performance
- Lazy loading of translation files
- Efficient caching strategy
- Minimal bundle size impact
- Fast language switching response