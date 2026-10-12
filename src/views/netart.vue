<template>
  <main>
    <section class="header">
        <nav>
            <router-link to="/" aria-label="Retour à la page d’accueil">
              <img class="icon" src="../components/icons/arrow-left-s-line.svg" alt="" aria-hidden="true">
            </router-link>
        </nav>
        <h1>{{ $t('artisticMovement.title') }}</h1>
    </section>  

    <h2>{{ $t('artisticMovement.txt[0]') }}</h2>
    <p>{{ $t('artisticMovement.txt[1]') }}</p>
    <p>{{ $t('artisticMovement.txt[2]') }}</p>
  </main>
</template>