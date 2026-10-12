<template>
  <main>
    <section class="header">
        <nav>
            <router-link to="/" aria-label="Retour à la page d’accueil">
              <img class="icon" src="../components/icons/arrow-left-s-line.svg" alt="">
            </router-link>
        </nav>
        <h1>{{ $t('Author.title') }}</h1>
    </section>  
    <h2>{{ $t('Author.txt[0]') }}</h2>
    <p>{{ $t('Author.txt[1]') }}</p>
    <img src="../components/img/mollysoda.webp" alt="">
    <p>{{ $t('Author.txt[2]') }}</p>
    <img src="../components/img/mollysoda1.webp" alt="">
  </main>
</template>