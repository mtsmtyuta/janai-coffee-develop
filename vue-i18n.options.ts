import ja from './locales/ja.json'
import en from './locales/en.json'

export default {
  legacy: false,
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: {
    ja,
    en
  },
  modifiers: {
    snakeCase: (str: string) => str.split(' ').join('-')
  }
}
