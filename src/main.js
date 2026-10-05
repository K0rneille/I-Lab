import Vue from 'vue'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import en from './components/languages/english.json';
import ja from './components/languages/japanese.json';



const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    en,

    ja
  }

})  

const app = createApp(Vue)

app.use(i18n)
app.mount('#app')

