<template>
  <page />
  <trad  @change-lang="changeLang" />
</template>

<script setup >
  import { ref } from 'vue'

  import page from './components/page.vue'
  import trad from './components/trad.vue'

  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  const changeLang = (param)=>{
    console.log(param);
    locale.value = param;
  }


</script>