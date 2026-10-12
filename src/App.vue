<script setup >
  import trad from './components/trad.vue'

  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  const changeLang = (param)=>{
    locale.value = param;
  }


</script>

<template>
  <router-view />
  <trad @change-lang="changeLang" />
</template>