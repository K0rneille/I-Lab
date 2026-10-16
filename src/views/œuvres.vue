<template>
  <main>
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
      <p class="left-txt">{{ $t('otherWorks.txt[2]') }}</p>
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
    </section>

    <router-link class="nav" to="/dda">Desktop Dump Archive</router-link>
  </main>
</template>

<style lang="scss" scoped>
@import '../app.scss';

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
}

.folder-img{
  width: 200px;
  height: auto;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

.top-txt{
  grid-column: 3 / 5;
  grid-row: 1 / 2;
  align-self: start;
  max-width: 550px;
}

.left-txt{
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  max-width: 430px;
  text-align: right;
  align-self: start;
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
</style>
