<template>
  <main>
    <section class="header">
        <nav>
            <router-link to="/" aria-label="Retour à la page d’accueil">
              <img class="icon" src="../components/icons/arrow-left-s-line.svg" alt="" aria-hidden="true">
            </router-link>
        </nav>
        <h1>{{ $t('experience.title') }}</h1>
    </section>
    <h2>{{ $t('experience.txt[0]') }}</h2>
  </main>
</template>