/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light', // الوضع الافتراضي
    themes: {
      light: {
        dark: false,
        colors: {
          pink:'#eee3aaff',
         background: '#F1F1F1',     // خلفية عامة
          surface: '#F5F5F5',         // خلفية البطاقات
          primary: '#cf9115ff',         // برتقالي (orange-darken-2)
          secondary: '#545252ff',       // رمادي
          error: '#E53935',           // أحمر
          info: '#2196F3',            // أزرق
          success: '#4CAF50',         // أخضر
          warning: '#f5d474ff',         // أصفر
          text: '#212121',            // أسود للنصوص
        },
      },
      dark: {
        dark: true,
        colors: {
           pink:'#675a1bff',
          background: '#121212',      // خلفية عامة داكنة
          surface: '#1E1E1E',         // خلفية البطاقات داكنة
          primary: '#E3A72F',         // نفس البرتقالي accent
          secondary: '#BDBDBD',       // رمادي فاتح
          error: '#EF5350',           // أحمر فاتح
          info: '#64B5F6',            // أزرق فاتح
          success: '#81C784',         // أخضر فاتح
          warning: '#c59f20ff',         // أصفر فاتح
          text: '#FFFFFF',            // أبيض للنصوص
        },
      },
    },
  },
})

