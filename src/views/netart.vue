<script setup>
import { useI18n } from 'vue-i18n'
import trad from '../components/trad.vue'

const { locale } = useI18n()

const changeLang = (code) => {
  locale.value = code
}
</script>

<template>
  <main class="netart-page">
    <header>
      <router-link to="/" aria-label="Retour à la page d’accueil">
        <img class="back" src="../components/icons/arrow-left-s-line.svg" alt="">
      </router-link>
      <h1>{{ $t('artisticMovement.title') }}</h1>
    </header>

    <h2>{{ $t('artisticMovement.txt[0]') }}</h2>

    <section>
      <img
        class="ascii-img"
        src="../components/img/netart2.webp"
        alt=""
      >
      <span class="ascii-caption">Vuk Ćosić, “Deep ASCII”, 1998</span>
      <p class="small-txt">{{ $t('artisticMovement.txt[1]') }}</p>
      <p class="bottom-txt">{{ $t('artisticMovement.txt[2]') }}</p>
      <img
        class="browser-img"
        src="../components/img/netart1.webp"
        alt=""
      >
      <span class="browser-caption">Olia Lialina, “My Boyfriend Came Back from the War”, 1996</span>
    </section>

    <footer class="netart-controls">
      <trad :inline="true" @change-lang="changeLang" />
      <router-link class="nav" to="/cdesktop">C:/desktop</router-link>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
@use '../app.scss' as *;

.ascii-img {
  width: 370px;
  height: auto;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  justify-self: end;
  align-self: end;
  margin-right: 16px;
}

.ascii-caption {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  justify-self: end;
  align-self: end;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 12px;
}

.browser-img {
  width: 443px;
  height: auto;
  grid-column: 3 / 5;
  grid-row: 2 / 3;
  justify-self: start;
  align-self: start;
}

.browser-caption {
  grid-column: 3 / 5;
  grid-row: 2 / 3;
  justify-self: start;
  align-self: start;
  margin-top: -18px;
  font-size: $caption;
}

section {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
}

.small-txt {
  grid-column: 3 / 5;
  grid-row: 1 / 2;
  justify-self: start;
  align-self: center;
  margin: 0;
  max-width: 500px;
  font-size: $small-txt;
}

.bottom-txt {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  text-align: right;
  justify-self: end;
  align-self: start;
  margin-top: 0;
  margin-bottom: 0;
  max-width: 800px;
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

  .ascii-img,
  .browser-img{
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0;
  }

  .ascii-caption,
  .browser-caption{
    writing-mode: horizontal-tb;
    transform: none;
    justify-self: auto;
    align-self: auto;
    margin: -12px 0 0;
    font-size: $mobile-small-txt;
  }

  .small-txt,
  .bottom-txt{
    max-width: none;
    font-size: $mobile-txt;
    line-height: 1.4;
    text-align: left;
  }

  .netart-controls{
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