<template>
  <main>
    <section class="header">
        <nav>
            <router-link to="/" aria-label="Retour à la page d’accueil">
              <img class="icon" src="../components/icons/arrow-left-s-line.svg" alt="">
            </router-link>
        </nav>
        <h1>{{ $t('otherWorks.title') }}</h1>
    </section>

    <h2>{{ $t('otherWorks.txt[0]') }}</h2>
    
    <img src="../components/img/cleaningdesktop.webp" alt="">
    <img src="../components/img/haircutfolder.webp" alt="">
    
    <p>{{ $t('otherWorks.txt[1]') }}</p>
    <p>{{ $t('otherWorks.txt[2]') }}</p>
    
    <img src="../components/img/dancing.webp" alt="">
    <img src="../components/img/tomatolive.webp" alt="">

    <router-link class="link--txt" to="/dda" aria-label="Vers la page Desktop Dump Archive">{{ $t('landing.nav[0]') }}</router-link>

  </main>
</template>