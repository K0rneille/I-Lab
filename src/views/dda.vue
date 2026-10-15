<template>
  <main>
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
        src="../components/img/desktopheart.webp"
        alt=""
      >
      <p class="small-txt">{{ $t('work.txt[2]') }}</p>
      <img
        class="big-img"
        src="../components/img/desktop.webp"
        alt=""
      >
      <p class="left-txt">{{ $t('work.txt[3]') }}</p>
    </section>

    <router-link class="nav" to="/mollysoda">Molly Soda</router-link>
  </main>
</template>

<style lang="scss" scoped>
@import '../app.scss';

.small-img{
  width: 194px;
  height: auto;
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

section{
  display: grid;
  grid-template-columns: auto auto 194px auto;
  grid-template-rows: auto auto;
  justify-content: center;
  gap: 20px;
}

.right-txt{
  display: grid;
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
  margin-bottom: 10px;
}

.left-txt{
  grid-column: 3 / 5;
  grid-row: 2 / 3;
  top: 0;
}

</style>