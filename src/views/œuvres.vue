<script setup>
import { useI18n } from 'vue-i18n'
import trad from '../components/trad.vue'

const { locale } = useI18n()

const changeLang = (code) => {
  locale.value = code
}
</script>

<template>
  <main class="oeuvres-page">
    <header>
      <router-link to="/" aria-label="Retour à la page d’accueil">
        <img class="back" src="../components/icons/arrow-left-s-line.svg" alt="">
      </router-link>
      <h1>{{ $t('otherWorks.title') }}</h1>
    </header>

    <h2>{{ $t('otherWorks.txt[0]') }}</h2>

    <section>
      <img
        class="desktop-img"
        src="../components/img/cleaningdesktop.webp"
        alt=""
      >
      <img
        class="folder-img"
        src="../components/img/haircutfolder.webp"
        alt=""
      >
      <p class="top-txt">{{ $t('otherWorks.txt[1]') }}</p>
      <img
        class="dancing-img"
        src="../components/img/dancing.webp"
        alt=""
      >
      <img
        class="tomato-img"
        src="../components/img/tomatolive.webp"
        alt=""
      >
      <p class="left-txt">{{ $t('otherWorks.txt[2]') }}</p>
    </section>

    <footer class="oeuvres-controls">
      <trad :inline="true" @change-lang="changeLang" />
      <router-link class="nav" to="/dda">Desktop Dump Archive</router-link>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
@use '../app.scss' as *;

section{
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  justify-content: center;
  gap: 20px;
}

.desktop-img{
  width: 275px;
  height: auto;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  align-self: end;
  justify-self: end;
}

.folder-img{
  width: 400px;
  height: auto;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: end;
  justify-self: end;
}

.top-txt{
  grid-column: 3 / 5;
  grid-row: 1 / 2;
  align-self: end;
  justify-self: start;
  max-width: 275px;
  font-size: $small-txt;
}

.left-txt{
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  max-width: 490px;
  text-align: right;
  justify-self: end;
}

.dancing-img{
  width: 360px;
  height: auto;
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}

.tomato-img{
  width: 100%;
  height: auto;
  grid-column: 4 / 5;
  grid-row: 2 / 3;
}

.nav{
  position: absolute;
  bottom: 20px;
  right: 20px;
}

@media screen and (max-width: 1100px){
  main{
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: calc(100dvh - 20px);
  }

  section{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
    flex: 1 0 auto;
  }

  .desktop-img,
  .folder-img,
  .dancing-img,
  .tomato-img{
    width: 100%;
    max-width: 100%;
    height: auto;
    align-self: flex-start;
  }

  .top-txt,
  .left-txt{
    max-width: none;
    font-size: $mobile-txt;
    line-height: 1.4;
    text-align: left;
  }

  .oeuvres-controls{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    padding-top: 24px;
  }

  .nav{
    position: static;
    font-size: $mobile-txt;
  }
}
</style>
