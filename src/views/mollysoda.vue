<template>
  <main>
    <h1>{{ $t('Author.title') }}</h1>
    <nav>
      <router-link to="/" aria-label="Retour à la page d’accueil">
        <img src="../components/icons/arrow-left-s-line.svg" alt="" aria-hidden="true">
      </router-link>
    </nav>
    <h2>{{ $t('Author.txt[0]') }}</h2>
    <p>{{ $t('Author.txt[1]') }}</p>
    <p>{{ $t('Author.txt[2]') }}</p>
  </main>
</template>