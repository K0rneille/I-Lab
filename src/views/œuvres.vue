<template>
  <main>
    <h1>{{ $t('otherWorks.title') }}</h1>
    <nav>
      <router-link to="/" aria-label="Retour à la page d’accueil">
        <img src="../components/icons/arrow-left-s-line.svg" alt="" aria-hidden="true">
      </router-link>
    </nav>
    <h2>{{ $t('otherWorks.txt[0]') }}</h2>
    <p>{{ $t('otherWorks.txt[1]') }}</p>
    <p>{{ $t('otherWorks.txt[2]') }}</p>
  </main>
</template>