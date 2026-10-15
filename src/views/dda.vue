<template>
  <main class="work-page">
    <header class="work-header">
      <router-link class="work-back" to="/" aria-label="Retour à la page d’accueil">
        <img class="work-back__arrow" src="../components/icons/arrow-left-s-line.svg" alt="">
        <span class="work-back__menu" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </router-link>
      <h1>{{ $t('work.title') }}</h1>
    </header>

    <h2 class="work-subtitle">{{ $t('work.txt[0]') }}</h2>

    <section class="work-content" aria-label="Présentation de l’œuvre">
      <p class="work-copy__intro">{{ $t('work.txt[1]') }}</p>
      <img
        class="work-image work-image--heart"
        src="../components/img/desktopheart.webp"
        alt="Composition en forme de cœur composée de fichiers et d’images d’un bureau numérique"
      >
      <p class="work-copy__archive">{{ $t('work.txt[2]') }}</p>
      <img
        class="work-image work-image--desktop"
        src="../components/img/desktop.webp"
        alt="Capture d’un bureau d’ordinateur rempli de fichiers, d’images et de fenêtres"
      >
      <p class="work-copy__practice">{{ $t('work.txt[3]') }}</p>
    </section>

    <router-link class="work-author" to="/mollysoda">Molly Soda</router-link>
  </main>
</template>

<style lang="scss" scoped>
.work-page {
  min-height: 100svh;
  padding: 18px 20px 78px;
  color: #26352b;
}

.work-header {
  display: flex;
  align-items: center;
  gap: 16px;

  h1 {
    margin: 0;
    font-family: "Courier New", monospace;
    font-size: clamp(64px, 8.46vw, 101px);
    font-weight: 400;
    letter-spacing: -0.1em;
    line-height: 1;
    white-space: nowrap;
  }
}

.work-back {
  display: grid;
  flex: 0 0 68px;
  width: 68px;
  height: 68px;
  place-items: center;
  background: #26352b;

  &__arrow {
    width: 48px;
    height: 48px;
    filter: invert(1);
  }

  &__menu {
    display: none;
  }
}

.work-subtitle {
  margin: 8px 0 30px;
  color: #078c2d;
  font-family: "Courier New", monospace;
  font-size: clamp(42px, 5.57vw, 57px);
  font-weight: 400;
  letter-spacing: -0.08em;
  line-height: 1.05;
}

.work-content {
  display: grid;
  width: min(100%, 1080px);
  margin: 0 auto;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 24px 22px;
  align-items: start;

  p {
    margin: 0;
  }
}

.work-copy__intro {
  grid-column: 1 / 5;
  text-align: right;
  font-size: clamp(20px, 2.734vw, 28px);
  line-height: 1.12;
}

.work-image {
  display: block;
  height: auto;

  &--heart {
    width: 100%;
    max-width: 200px;
    grid-column: 5 / 8;
    justify-self: center;
  }

  &--desktop {
    width: 100%;
    max-width: 520px;
    grid-column: 1 / 7;
    justify-self: end;
  }
}

.work-copy__archive {
  grid-column: 8 / 13;
  font-size: 20px;
  line-height: 1.2;
}

.work-copy__practice {
  grid-column: 7 / 13;
  font-size: clamp(20px, 2.734vw, 28px);
  line-height: 1.12;
}

.work-author {
  position: fixed;
  right: 18px;
  bottom: 15px;
  color: #00e;
  font-size: 40px;
  font-weight: 700;
}

@media (min-width: 640px) and (max-width: 900px) {
  .work-page {
    padding-right: 16px;
    padding-left: 16px;
  }

  .work-header {
    gap: 12px;

    h1 {
      font-size: clamp(48px, 7vw, 64px);
    }
  }

  .work-back {
    flex-basis: 58px;
    width: 58px;
    height: 58px;
  }

  .work-subtitle {
    margin-bottom: 24px;
    font-size: clamp(36px, 5vw, 46px);
  }

  .work-content {
    gap: 20px 14px;
  }

  .work-image--heart {
    max-width: 180px;
  }

  .work-image--desktop {
    max-width: 420px;
  }
}

@media (max-width: 639px) {
  .work-page {
    padding: 10px 10px 76px;
  }

  .work-header {
    gap: 11px;

    h1 {
      font-size: clamp(1.45rem, 7.5vw, 2rem);
      letter-spacing: -0.08em;
    }
  }

  .work-back {
    flex-basis: 48px;
    width: 48px;
    height: 48px;

    &__arrow {
      display: none;
    }

    &__menu {
      display: flex;
      width: 28px;
      flex-direction: column;
      gap: 6px;

      span {
        width: 100%;
        height: 2px;
        background: #fff;
      }
    }
  }

  .work-subtitle {
    margin: 5px 0 26px;
    font-size: clamp(1.75rem, 7.8vw, 2rem);
    letter-spacing: -0.15em;
  }

  .work-content {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .work-copy__intro,
  .work-copy__practice {
    font-size: clamp(1.3rem, 5.7vw, 1.5rem);
    line-height: 1.34;
    text-align: left;
  }

  .work-image--heart {
    width: min(195px, 55vw);
    max-width: none;
    align-self: flex-start;
  }

  .work-copy__archive {
    font-size: 1rem;
    line-height: 1.8;
  }

  .work-image--desktop {
    width: 100%;
    max-width: none;
  }

  .work-author {
    right: 10px;
    bottom: 12px;
    font-size: 1.5rem;
    font-weight: 400;
  }
}
</style>