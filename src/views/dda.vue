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
    variant: previewTrigger.dataset.previewSize ?? '',
  }
}

const closePreview = () => {
  preview.value = null
  previewTrigger?.focus()
}
</script>

<template>
  <main class="dda-page">
    <header>
      <router-link to="/" aria-label="Retour à la page d’accueil">
        <img class="back" src="../components/icons/arrow-left-s-line.svg" alt="">
      </router-link>
      <h1>{{ $t('work.title') }}</h1>
    </header>

    <h2>{{ $t('work.txt[0]') }}</h2>

    <section>
      <p class="right-txt">{{ $t('work.txt[1]') }}</p>
      <img
        class="small-img"
        data-preview-size="molly-banner-square"
        :class="{ 'image-preview-trigger': true }"
        src="../components/img/MollySoda_banner.webp"
        :alt="$t('imageAlt.mollyBanner')"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-label="$t('imageAlt.mollyBanner')"
        @click="openPreview"
        @keydown.enter.prevent="openPreview"
        @keydown.space.prevent="openPreview"
      >
      <p class="small-txt">{{ $t('work.txt[2]') }}</p>
      <img
        class="big-img"
        :class="{ 'image-preview-trigger': true }"
        src="../components/img/desktop.webp"
        :alt="$t('imageAlt.desktopArchive')"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-label="$t('imageAlt.desktopArchive')"
        @click="openPreview"
        @keydown.enter.prevent="openPreview"
        @keydown.space.prevent="openPreview"
      >
      <p class="left-txt">{{ $t('work.txt[3]') }}</p>
    </section>

    <footer class="dda-controls">
      <trad :inline="true" @change-lang="changeLang" />
      <router-link class="nav" to="/mollysoda">Molly Soda</router-link>
    </footer>
    <ImagePreviewDialog
      v-if="preview"
      :src="preview.src"
      :alt="preview.alt"
      :variant="preview.variant"
      @close="closePreview"
    />
  </main>
</template>

<style lang="scss" scoped>
@use '../app.scss' as *;

section{
  grid-template-columns: auto auto 194px auto;
  grid-template-rows: auto auto;
  justify-content: center;
  gap: 20px;
}

.small-img{
  width: 194px;
  height: 194px;
  object-fit: cover;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  align-self: end;
}

.big-img{
  width: 430px;
  height: auto;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  justify-self: end;
}

.right-txt{
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  text-align: right;
  justify-self: end;
  max-width: 550px;
  align-self: end;
}

.small-txt {
  grid-column: 4 / 5;
  grid-row: 1 / 2;
  justify-self: start;
  max-width: 280px;
  align-self: end;
  margin-bottom: 28px;
}

.left-txt{
  grid-column: 3 / 5;
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

  .right-txt{
    font-size: $mobile-txt;
    text-align: left;
    line-height: 1.6;
    max-width: none;
  }

  .left-txt{
    font-size: $mobile-txt;
    line-height: 1.6;
  }

  .small-txt{
    font-size: $mobile-small-txt;
    line-height: 1.8;
    max-width: none;
    margin: 0;
  }

  .small-img{
    width: 194px;
    height: 194px;
    max-width: 100%;
    align-self: flex-start;
  }

  .big-img{
    width: 100%;
    height: auto;
  }

  .dda-controls{
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