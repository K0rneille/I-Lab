<template>
  <h1>{{ $t('page1') }}</h1>

</template>

<script setup >

defineProps({

})

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const changeLang = (param)=>{
  console.log(param);
  locale.value = param;
}
</script>