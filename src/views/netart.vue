<template>
  <main>
    <section class="header">
        <nav>
            <router-link to="/" aria-label="Retour à la page d’accueil">
              <img class="icon" src="../components/icons/arrow-left-s-line.svg" alt="">
            </router-link>
        </nav>
        <h1>{{ $t('artisticMovement.title') }}</h1>
    </section>  

    <h2>{{ $t('artisticMovement.txt[0]') }}</h2>
    
    <img src="../components/img/netart2.webp" alt="">
    <span>Vuk Ćosić, “Deep ASCII”, 1998</span>
    
    <p>{{ $t('artisticMovement.txt[1]') }}</p>
    <p>{{ $t('artisticMovement.txt[2]') }}</p>
    
    <img src="../components/img/netart1.webp" alt="">
    <span>Olia Lialina, “My Boyfriend Came Back from the War”, 1996</span>

    <router-link class="link--txt" to="/cdesktop" aria-label="Vers la page C:/desktop">{{ $t('landing.nav[3]') }}</router-link>

  </main>
</template>