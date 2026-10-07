import App from './App.vue'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import en from './components/language/en.json'
import fr from './components/language/fr.json'
import nl from './components/language/nl.json'
import de from './components/language/de.json'


const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    nl,
    de
  }
})  

const app = createApp(App)

app.use(i18n)
app.mount('#app')

