<template>
  <main>
    <section class="header">
        <nav>
            <router-link to="/" aria-label="Retour à la page d’accueil">
              <img class="icon" src="../components/icons/arrow-left-s-line.svg" alt="" aria-hidden="true">
            </router-link>
        </nav>
        <h1>{{ $t('work.title') }}</h1>
    </section>
    <nav>
      <router-link to="/" aria-label="Retour à la page d’accueil">
        <img src="../components/icons/arrow-left-s-line.svg" alt="" aria-hidden="true">
      </router-link>
    </nav>
    <h2>{{ $t('work.txt[0]') }}</h2>
    <p>{{ $t('work.txt[1]') }}</p>
    <p>{{ $t('work.txt[2]') }}</p>
    <p>{{ $t('work.txt[3]') }}</p>
  </main>
</template>