<script setup >
  import trad from './components/trad.vue'

  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  const changeLang = (param)=>{
    locale.value = param;
  }


</script>
<style lang="scss">
$primary-color: #42b983;

body {
  background-color:$primary-color;
  h1 {
    color: $primary-color;
  }
}
</style>

<template>
  <router-view />
  <trad @change-lang="changeLang" />
</template>
