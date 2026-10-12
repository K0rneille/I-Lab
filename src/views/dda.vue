<template>
  <main>
    <section class="header">
        <nav>
            <router-link to="/" aria-label="Retour à la page d’accueil">
              <img class="icon" src="../components/icons/arrow-left-s-line.svg" alt="">
            </router-link>
        </nav>
        <h1>{{ $t('work.title') }}</h1>
    </section>

    <h2>{{ $t('work.txt[0]') }}</h2>
    <p>{{ $t('work.txt[1]') }}</p>

    <img src="../components/img/desktopheart.webp" alt="">
    
    <p>{{ $t('work.txt[2]') }}</p>
    
    <img src="../components/img/desktop.webp" alt="">
    
    <p>{{ $t('work.txt[3]') }}</p>
  </main>
</template>