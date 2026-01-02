import { createI18n } from 'vue-i18n'

import en from '../locales/en.js'
import ar from '../locales/ar.js'
import de from '../locales/de.js'

const i18n = createI18n({
  locale: 'en', // اللغة الأساسية
  fallbackLocale: 'en',
  messages: {
    en,
    ar,
    de
  }
})

export default i18n
