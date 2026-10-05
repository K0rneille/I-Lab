<template>
  <page />
  <btn  @change-lang="changeLang" />
</template>

<script setup >
  import { ref } from 'vue'

  import page from './components/page.vue'
  import btn from './components/btn.vue'

  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  const changeLang = (param)=>{
    console.log(param);
    locale.value = param;
  }


</script>