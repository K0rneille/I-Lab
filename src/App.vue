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


<style lang="scss">
@import './app.scss';

main{
  background-color: $bg-color;
  color: $primary-color;
  font-family: $primary-font;
  margin: 20px;
}

.back{
  background-color: $primary-color;
  height: 74px;
  width: 74px;
}

h1{
  font-family: $secondary-font;
  font-size: $title;
  font-weight: light;
  line-height: 0;
  letter-spacing: -3px;
  color: $primary-color;
}

h2{
  font-family: $secondary-font;
  color: $alt-color;
  font-size: $subtitle;
  line-height: 0;
}

.small-txt{
  font-size: $small-txt;
  line-height: 1.2;
}

p{
  font-size: $txt;
  margin: 0;
  line-height: 1.4;
}

.nav{
  display: flex;
  color: $link-color;
  font-size: $nav;
  text-decoration: underline;
  font-weight: bold;
  justify-content: flex-end;
  font-family: $primary-font;
}

header{
  display: flex;
  align-items: center;
  gap: 10px;
}

</style>