<script setup>
import sponsors from '../components/sponsors.vue'
</script>

<template>
    <h1>
        <span>Desktop</span>
        <span>Dump</span>
        <span>Archive</span>
    </h1>
    <h2>{{ $t("landing.subtitle") }}</h2>
    <h3>{{ $t("landing.txt") }}</h3>

    <sponsors />
    
    <nav aria-label="Pages">
        <ul>
            <li><router-link class="nav" to="/dda">{{ $t('landing.nav[0]') }}</router-link></li>
            <li><router-link class="nav" to="/mollysoda">{{ $t('landing.nav[1]') }}</router-link></li>
            <li><router-link class="nav" to="/netart">{{ $t('landing.nav[2]') }}</router-link></li>
            <li><router-link class="nav" to="/cdesktop">{{ $t('landing.nav[3]') }}</router-link></li>
            <li><router-link class="nav" to="/oeuvres">{{ $t('landing.nav[4]') }}</router-link></li>
        </ul>
    </nav>

    <button>{{ $t('landing.qr') }}</button>
</template>

<style lang="scss" scoped>
@use '../app.scss' as *;

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

ul{
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 48px;
    align-items: flex-end;
}

.sponsor-img{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 111px;
    height: auto;
}

button{
    position: absolute;
    width: 285px;
    bottom: 120px;
    left: 20px;
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
        &:before{
          content: url(../components/icons/qr-code-line.svg);
          display: inline-block;
          height: 54px;
          width: 54px;

      }
}
</style>