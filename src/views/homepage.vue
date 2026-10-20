<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import sponsors from '../components/sponsors.vue'
import trad from '../components/trad.vue'

const { locale } = useI18n()
const isQrPopupOpen = ref(false)

const changeLang = (code) => {
  locale.value = code
}
</script>

<template>
  <main class="homepage">
    <h1>
        <span>Desktop</span>
        <span>Dump</span>
        <span>Archive</span>
    </h1>
    <h2>{{ $t("landing.subtitle") }}</h2>
    <h3>{{ $t("landing.txt") }}</h3>

    <sponsors class="landing-sponsors" />

    <nav class="landing-nav" aria-label="Pages">
        <ul>
            <li><router-link class="nav" to="/dda">{{ $t('landing.nav[0]') }}</router-link></li>
            <li><router-link class="nav mollyPage" to="/mollysoda">{{ $t('landing.nav[1]') }}</router-link></li>
            <li><router-link class="nav" to="/netart">{{ $t('landing.nav[2]') }}</router-link></li>
            <li><router-link class="nav" to="/cdesktop">{{ $t('landing.nav[3]') }}</router-link></li>
            <li><router-link class="nav" to="/oeuvres">{{ $t('landing.nav[4]') }}</router-link></li>
        </ul>
    </nav>

    <button class="qr-button" type="button" @click="isQrPopupOpen = true">
        {{ $t('landing.qr') }}
    </button>

    <footer class="landing-controls">
        <trad :inline="true" @change-lang="changeLang" />
    </footer>

    <div
        v-if="isQrPopupOpen"
        class="qr-overlay"
        role="presentation"
        @click.self="isQrPopupOpen = false"
    >
        <div
            class="qr-popup"
            role="dialog"
            aria-modal="true"
            aria-label="QR code"
        >
            <button
                class="qr-popup__close"
                type="button"
                aria-label="Fermer"
                @click="isQrPopupOpen = false"
            >
                <img src="../components/icons/close-line.svg" alt="">
            </button>
            <img src="../components/img/qrcode.svg" :alt="$t('imageAlt.mobileQrCode')">
        </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../app.scss' as *;

.homepage{
    position: relative;
    display: block;
    height: 100vh;
    height: 100dvh;
    margin: 0;
    overflow: hidden;
}

h1{
    margin: 20px;
    display: flex;
    flex-direction: column;
    font-size: $big-title;
    line-height: 0.8;
}

h2{
    color: $primary-color;
    font-size: $nav;
    margin: 48px 0 0 20px;
}

h3{
    font-family: $secondary-font;
    color: $alt-color;
    font-size: $subtitle;
    margin: 20px;
}

.landing-nav ul{
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 48px;
    align-items: flex-end;
}

.landing-controls{
    display: contents;
}

.qr-button{
    position: absolute;
    width: 285px;
    bottom: 120px;
    left: 27px;
    background-color: $bg-color;
    color: $primary-color;
    font-family: $primary-font;
    font-size: $txt;
    font-weight: bold;
    border: solid 3px $primary-color;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &:before{
        content: url(../components/icons/qr-code-line.svg);
        display: inline-block;
        height: 54px;
        width: 54px;
    }
}

.qr-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    background: rgb(36 48 38 / 25%);
}

.qr-popup {
    width: 360px;
    height: 360px;
    padding: 32px;
    position: relative;
    box-sizing: border-box;
    background: $bg-color;
}

.qr-popup img {
    width: 100%;
    height: 100%;
}

.qr-popup__close {
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    border: 0;
    color: $primary-color;
    background: transparent;
    cursor: pointer;
}

.qr-popup__close img {
    width: 100%;
    height: 100%;
}

@media screen and (max-width: 1100px){
    .homepage{
        box-sizing: border-box;
        width: 100%;
        height: 100vh;
        height: 100dvh;
        min-height: 0;
        margin: 0;
        padding: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    h1{
        margin: 10px 0 16px;
        font-size: 75px;
        line-height: .9;
    }

    h2{
        margin: 0;
        font-size: 24px;
        line-height: 1.4;
    }

    h3{
        margin: 12px 0 0;
        font-size: 50px;
        line-height: 1.5;
    }

    .landing-nav{
        display: flex;
        flex: 1 0 auto;
        flex-direction: column;
        justify-content: center;
    }

    .landing-nav ul{
        position: static;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 48px;
        margin: 12px 0;
        padding: 0;
    }

    .landing-nav .nav{
        font-size: 24px;
        line-height: 1.2;
    }

    .landing-sponsors,
    .qr-button{
        display: none;
    }

    .landing-controls{
        display: flex;
        justify-content: flex-start;
        padding-top: 8px;
    }
}
</style>