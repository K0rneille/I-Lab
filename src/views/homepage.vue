<script setup>
import page from '../components/page.vue'
</script>

<template>
    <h1>{{ $t("landing.title") }}</h1>
    <h2>{{ $t("landing.subtitle") }}</h2>
    <h3>{{ $t("landing.txt") }}</h3>
    
    <nav aria-label="Pages">
        <ul>
        <li><router-link to="/dda">{{ $t('landing.nav[0]') }}</router-link></li>
        <li><router-link to="/mollysoda">{{ $t('landing.nav[1]') }}</router-link></li>
        <li><router-link to="/netart">{{ $t('landing.nav[2]') }}</router-link></li>
        <li><router-link to="/cdesktop">{{ $t('landing.nav[3]') }}</router-link></li>
        <li><router-link to="/oeuvres">{{ $t('landing.nav[4]') }}</router-link></li>
        </ul>
    </nav>

    <button>{{ $t('landing.qr') }}</button>
    <page />
</template>
