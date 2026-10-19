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
  <main class="mollysoda-page">
    <header>
      <router-link to="/" aria-label="Retour à la page d’accueil">
        <img class="back" src="../components/icons/arrow-left-s-line.svg" alt="">
      </router-link>
      <h1>{{ $t('Author.title') }}</h1>
    </header>

    <h2>{{ $t('Author.txt[0]') }}</h2>

    <section>
      <p class="small-txt">{{ $t('Author.txt[1]') }}</p>
      <img
        class="small-img"
        data-preview-size="molly-collage"
        :class="{ 'image-preview-trigger': true }"
        src="../components/img/mollysoda.webp"
        :alt="$t('imageAlt.mollyCollage')"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-label="$t('imageAlt.mollyCollage')"
        @click="openPreview"
        @keydown.enter.prevent="openPreview"
        @keydown.space.prevent="openPreview"
      >
      <p class="left-txt">{{ $t('Author.txt[2]') }}</p>
      <img
        class="big-img"
        :class="{ 'image-preview-trigger': true }"
        src="../components/img/mollysoda1.webp"
        :alt="$t('imageAlt.mollyPortrait')"
        role="button"
        tabindex="0"
        aria-haspopup="dialog"
        :aria-label="$t('imageAlt.mollyPortrait')"
        @click="openPreview"
        @keydown.enter.prevent="openPreview"
        @keydown.space.prevent="openPreview"
      >
    </section>

    <footer class="mollysoda-controls">
      <trad :inline="true" @change-lang="changeLang" />
      <router-link class="nav" to="/netart">Net.art</router-link>
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

.small-img {
  width: 170px;
  height: auto;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  align-self: end;
}

.big-img {
  width: 637px;
  height: 280px;
  object-fit: cover;
  object-position: center 16%;
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  justify-self: end;
}

section {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  justify-content: center;
  gap: 20px;
}

.small-txt {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  text-align: right;
  justify-self: end;
  align-self: end;
  margin-bottom: 0;
  max-width: 340px;
  font-size: $small-txt;
}

.left-txt {
  grid-column: 3 / 5;
  grid-row: 2 / 3;
  margin-top: 0;
  max-width: 480px;
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

  .small-txt{
    font-size: $mobile-small-txt;
    line-height: 1.8;
    max-width: none;
    text-align: left;
  }

  .small-img{
    width: 194px;
    max-width: 100%;
    height: auto;
    align-self: flex-start;
  }

  .left-txt{
    font-size: $mobile-txt;
    line-height: 1.4;
    max-width: none;
  }

  .big-img{
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  .mollysoda-controls{
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