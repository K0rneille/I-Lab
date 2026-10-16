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
@use './app.scss' as *;
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
  margin: 20px 0 40px 0;
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

section{
  display: grid;
}

@media screen and (max-width: 1100px){
  h1{
    font-size: $mobile-title;
    line-height: 1;
  }

  h2{
    font-size: $mobile-subtitle;
    line-height: 1;
    margin: 0;
  }

  section{
    display: block;
  }
  
  main{
    margin: 10px;
  }

  .back{
    width: 48px;
    height: 48px;
  }
}

</style>