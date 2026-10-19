<template>
  <main>
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

    <router-link class="nav" to="/cdesktop">C:/desktop</router-link>
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
</style>