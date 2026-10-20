<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ImagePreviewDialog from '../components/imagePreview.vue'
import trad from '../components/trad.vue'

const { locale } = useI18n()

const changeLang = (code) => {
  locale.value = code
}

const preview = ref(null)
let previewTrigger = null

const openPreview = (event) => {
  previewTrigger = event.currentTarget
  preview.value = {
    src: previewTrigger.currentSrc,
    alt: previewTrigger.alt,
  }
}

const closePreview = () => {
  preview.value = null
  previewTrigger?.focus()
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
        :class="{ 'image-preview-trigger': true }"
        src="../components/img/cleaningdesktop.webp"
        :alt="$t('imageAlt.cleaningDesktop')"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-label="$t('imageAlt.cleaningDesktop')"
        @click="openPreview"
        @keydown.enter.prevent="openPreview"
        @keydown.space.prevent="openPreview"
      >
      <img
        class="folder-img"
        :class="{ 'image-preview-trigger': true }"
        src="../components/img/haircutfolder.webp"
        :alt="$t('imageAlt.haircutFolder')"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-label="$t('imageAlt.haircutFolder')"
        @click="openPreview"
        @keydown.enter.prevent="openPreview"
        @keydown.space.prevent="openPreview"
      >
      <p class="top-txt">{{ $t('otherWorks.txt[1]') }}</p>
      <img
        class="dancing-img"
        :class="{ 'image-preview-trigger': true }"
        src="../components/img/dancing.webp"
        :alt="$t('imageAlt.dancingArtwork')"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-label="$t('imageAlt.dancingArtwork')"
        @click="openPreview"
        @keydown.enter.prevent="openPreview"
        @keydown.space.prevent="openPreview"
      >
      <img
        class="tomato-img"
        :class="{ 'image-preview-trigger': true }"
        src="../components/img/tomatolive.webp"
        :alt="$t('imageAlt.tomatoLive')"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-label="$t('imageAlt.tomatoLive')"
        @click="openPreview"
        @keydown.enter.prevent="openPreview"
        @keydown.space.prevent="openPreview"
      >
      <p class="left-txt">{{ $t('otherWorks.txt[2]') }}</p>
    </section>

    <footer class="oeuvres-controls">
      <trad :inline="true" @change-lang="changeLang" />
      <router-link class="nav" to="/dda">Desktop Dump Archive</router-link>
    </footer>
    <ImagePreviewDialog
      v-if="preview"
      :src="preview.src"
      :alt="preview.alt"
      @close="closePreview"
    />
  </main>
</template>

<style lang="scss" scoped>
@use '../app.scss' as *;

section{
  grid-template-columns: 275px 200px 360px 250px;
  grid-template-rows: 170px 280px;
  justify-content: space-between;
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
  width: 200px;
  height: auto;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: start;
  justify-self: end;
}

.top-txt{
  grid-column: 3 / 5;
  grid-row: 1 / 2;
  align-self: start;
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
  width: 250px;
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
