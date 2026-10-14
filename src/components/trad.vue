<template>
  <label class="language-picker">
    <span class="language-picker__icon" aria-hidden="true">文A</span>
    <select aria-label="Choisir la langue" :value="locale" @change="changeLanguage">
      <option value="fr">Français</option>
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
      <option value="de">Deutsch</option>
    </select>
  </label>
</template>

<script setup >
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['changeLang'])
const { locale } = useI18n()

const changeLanguage = (event) => {
  emit('changeLang', event.target.value)
}
</script>