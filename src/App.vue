<script setup >
  import trad from './components/trad.vue'
  import router from './router/index.js';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import {createtimer} from './timer.js';
  import { onMounted, onUnmounted } from 'vue';

  const { locale } = useI18n()

  const changeLang = (param)=>{
    locale.value = param;
  }

  function allerAlaccueil () {
    router.push('/');
  }

  const route = useRoute()

  const timerMain = (maxi = 90) => {

    const timer = createtimer((s) => {

      if (route.name === "cdesktop" ){
        maxi = 300 ;
      
    } else {
        maxi = 90 ;
    }

    if (s >= maxi) {
        reset()
        allerAlaccueil()
      }

    });

    window.addEventListener('pointerdown', (e)=> {
      reset()

    })

  onMounted(() => timer.start());
  onUnmounted(() => timer.stop());   // ← nettoie l'intervalle

  function reset () {

    timer.reset()
    timer.start()
  }

  }
  
  
timerMain()




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
  height: calc(100vh - 40px);
  height: calc(100dvh - 40px);
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
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

.nav:active{
  color: #FF0000;
}

header{
  display: flex;
  align-items: center;
  gap: 10px;
}

section{
  display: grid;
  min-height: 0;
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