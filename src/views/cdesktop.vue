<script setup>
import { computed, ref } from 'vue'

const stickerFiles = import.meta.glob(
  '../components/img/interaction/*.{gif,webp,png,jpg,jpeg}',
  { eager: true, query: '?url', import: 'default' },
)

const stickers = Object.entries(stickerFiles)
  .sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true }))
  .map(([path, url], index) => ({
    id: `sticker-${index}`,
    name: path.split('/').pop(),
    url,
  }))

const composition = ref([])
const canvas = ref(null)
const isEmailPopupOpen = ref(false)
const email = ref('')
const emailSubmitted = ref(false)
const draggedSticker = ref(null)
const nextZIndex = ref(1)

const popupTitle = computed(() => (emailSubmitted.value ? 'Composition enregistrée' : 'Enregistrer la composition'))

const addSticker = (sticker, clientX, clientY) => {
  const bounds = canvas.value.getBoundingClientRect()
  const size = 90
  const x = Math.max(0, Math.min(bounds.width - size, clientX - bounds.left - size / 2))
  const y = Math.max(0, Math.min(bounds.height - size, clientY - bounds.top - size / 2))

  composition.value.push({
    ...sticker,
    instanceId: `${sticker.id}-${Date.now()}-${composition.value.length}`,
    x,
    y,
    size,
    zIndex: nextZIndex.value++,
  })
}

const handlePaletteDragStart = (event, sticker) => {
  draggedSticker.value = sticker
  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData('text/plain', sticker.id)
}

const handleDrop = (event) => {
  event.preventDefault()
  if (draggedSticker.value) addSticker(draggedSticker.value, event.clientX, event.clientY)
  draggedSticker.value = null
}

const handlePalettePointerDown = (event, sticker) => {
  if (event.pointerType !== 'touch') return

  event.preventDefault()
  draggedSticker.value = sticker

  const stopDragging = (stopEvent) => {
    const bounds = canvas.value.getBoundingClientRect()
    const isInsideCanvas =
      stopEvent.clientX >= bounds.left &&
      stopEvent.clientX <= bounds.right &&
      stopEvent.clientY >= bounds.top &&
      stopEvent.clientY <= bounds.bottom

    if (isInsideCanvas) addSticker(sticker, stopEvent.clientX, stopEvent.clientY)

    draggedSticker.value = null
    window.removeEventListener('pointerup', stopDragging)
    window.removeEventListener('pointercancel', stopDragging)
  }

  window.addEventListener('pointerup', stopDragging)
  window.addEventListener('pointercancel', stopDragging)
}

const moveSticker = (event, sticker) => {
  event.preventDefault()
  sticker.zIndex = nextZIndex.value++
  const bounds = canvas.value.getBoundingClientRect()
  const startX = event.clientX
  const startY = event.clientY
  const originalX = sticker.x
  const originalY = sticker.y
  let lastX = startX
  let lastY = startY

  const move = (moveEvent) => {
    lastX = moveEvent.clientX
    lastY = moveEvent.clientY
    sticker.x = originalX + moveEvent.clientX - startX
    sticker.y = originalY + moveEvent.clientY - startY
  }
  const stop = (stopEvent) => {
    lastX = stopEvent.clientX
    lastY = stopEvent.clientY
    const pointerIsOutside =
      lastX < bounds.left ||
      lastX > bounds.right ||
      lastY < bounds.top ||
      lastY > bounds.bottom

    if (pointerIsOutside) {
      composition.value = composition.value.filter(
        ({ instanceId }) => instanceId !== sticker.instanceId,
      )
    } else {
      sticker.x = Math.max(0, Math.min(bounds.width - sticker.size, sticker.x))
      sticker.y = Math.max(0, Math.min(bounds.height - sticker.size, sticker.y))
    }

    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', stop)
  }

  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', stop)
}

const resizeSticker = (event, sticker) => {
  event.preventDefault()
  event.stopPropagation()
  sticker.zIndex = nextZIndex.value++

  const bounds = canvas.value.getBoundingClientRect()
  const startX = event.clientX
  const startY = event.clientY
  const originalSize = sticker.size
  const minimumSize = 35
  const maximumSize = Math.min(bounds.width - sticker.x, bounds.height - sticker.y)

  const resize = (resizeEvent) => {
    const size = originalSize + Math.max(
      resizeEvent.clientX - startX,
      resizeEvent.clientY - startY,
    )
    sticker.size = Math.max(minimumSize, Math.min(maximumSize, size))
  }
  const stop = () => {
    window.removeEventListener('pointermove', resize)
    window.removeEventListener('pointerup', stop)
    window.removeEventListener('pointercancel', stop)
  }

  window.addEventListener('pointermove', resize)
  window.addEventListener('pointerup', stop)
  window.addEventListener('pointercancel', stop)
}

const openEmailPopup = () => {
  emailSubmitted.value = false
  isEmailPopupOpen.value = true
}

const closeEmailPopup = () => {
  isEmailPopupOpen.value = false
  emailSubmitted.value = false
}

const submitEmail = () => {
  emailSubmitted.value = true
}
</script>

<template>
  <main class="cdesktop">
    <header>
      <router-link to="/" aria-label="Retour à la page d’accueil">
        <img class="back" src="../components/icons/arrow-left-s-line.svg" alt="">
      </router-link>
      <h1>C:/desktop</h1>
    </header>

    <h2>{{ $t('experience.txt[0]') }}</h2>

    <section class="editor">
      <div class="window desktop-window">
        <h3><img src="../components/icons/file-image-line.svg" alt=""> desktop @ 100% (RGB)</h3>
        <div
          ref="canvas"
          class="desktop-window__canvas"
          @dragover.prevent
          @drop="handleDrop"
        >
          <div
            v-for="sticker in composition"
            :key="sticker.instanceId"
            class="placed-sticker"
            :style="{
              left: `${sticker.x}px`,
              top: `${sticker.y}px`,
              width: `${sticker.size}px`,
              height: `${sticker.size}px`,
              zIndex: sticker.zIndex,
            }"
            @pointerdown="moveSticker($event, sticker)"
          >
            <img :src="sticker.url" :alt="sticker.name" draggable="false">
            <button
              class="resize-handle"
              type="button"
              aria-label="Redimensionner le sticker"
              @pointerdown="resizeSticker($event, sticker)"
            />
          </div>
        </div>
        <button class="save-button" type="button" aria-label="Enregistrer la composition" @click="openEmailPopup">
          <img src="../components/icons/save-3-fill.svg" alt="">
        </button>
      </div>

      <div class="window stickers-window">
        <h3>Stickers</h3>
        <div class="stickers-window__list">
          <div
            v-for="sticker in stickers"
            :key="sticker.id"
            class="sticker-item"
            draggable="true"
            @dragstart="handlePaletteDragStart($event, sticker)"
            @pointerdown="handlePalettePointerDown($event, sticker)"
          >
            <img :src="sticker.url" :alt="sticker.name" draggable="false">
          </div>
        </div>
      </div>
    </section>

    <router-link class="nav works-link" to="/oeuvres">+ D’œuvres</router-link>

    <div v-if="isEmailPopupOpen" class="email-overlay" @click.self="closeEmailPopup">
      <form class="email-popup" @submit.prevent="submitEmail">
        <button class="email-popup__close" type="button" aria-label="Fermer" @click="closeEmailPopup">×</button>
        <h4>{{ popupTitle }}</h4>
        <template v-if="!emailSubmitted">
          <label for="composition-email">Votre adresse mail</label>
          <input id="composition-email" v-model="email" type="email" required placeholder="nom@exemple.com">
          <button class="email-popup__submit" type="submit">Enregistrer</button>
        </template>
        <template v-else>
          <p>Merci ! Votre composition sera envoyée à {{ email }}.</p>
          <button class="email-popup__submit" type="button" @click="closeEmailPopup">Fermer</button>
        </template>
      </form>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../app.scss' as *;

.cdesktop {
  width: 1154px;
  height: 794px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

.editor {
  display: grid;
  grid-template-columns: 861px 250px;
  gap: 20px;
  height: 517px;
}

.window {
  width: 100%;
  height: 497px;
  border: 6px solid $link-color;
  box-sizing: border-box;
  position: relative;
  background: $bg-color;
}

.window h3 {
  height: 44px;
  margin: 0;
  padding: 4px 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  color: $bg-color;
  background: $link-color;
  font-family: $primary-font;
  font-size: $txt;
  line-height: 1;
}

.window h3 img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}

.desktop-window__canvas {
  height: calc(100% - 44px);
  position: relative;
  overflow: hidden;
  background: $bg-color;
}

.placed-sticker {
  position: absolute;
  cursor: grab;
  touch-action: none;
  user-select: none;
}

.placed-sticker:active {
  cursor: grabbing;
}

.placed-sticker img,
.sticker-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.resize-handle {
  width: 16px;
  height: 16px;
  padding: 0;
  position: absolute;
  right: -5px;
  bottom: -5px;
  border: 2px solid $primary-color;
  background: $bg-color;
  cursor: nwse-resize;
  touch-action: none;
}

.save-button {
  position: absolute;
  right: -2px;
  bottom: -78px;
  width: 52px;
  height: 52px;
  padding: 5px;
  border: 3px solid $primary-color;
  background: $bg-color;
  cursor: pointer;
}

.save-button img {
  width: 100%;
  height: 100%;
}

.stickers-window__list {
  height: calc(100% - 44px);
  overflow-y: scroll;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: start;
  gap: 12px;
  padding: 14px;
  box-sizing: border-box;
}

.sticker-item {
  height: 92px;
  cursor: grab;
  touch-action: none;
}

.works-link {
  position: absolute;
  right: 0;
  bottom: 0;
}

.email-overlay {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  background: rgb(36 48 38 / 25%);
}

.email-popup {
  width: min(420px, calc(100vw - 40px));
  padding: 24px;
  position: relative;
  box-sizing: border-box;
  border: 6px solid $link-color;
  background: $bg-color;
  font-family: $primary-font;
  font-size: $txt;
}

.email-popup h4 {
  margin: 0 0 22px;
  color: $link-color;
  font-size: $txt;
}

.email-popup label,
.email-popup input,
.email-popup__submit {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
}

.email-popup input {
  margin: 8px 0 18px;
  padding: 8px;
  border: 2px solid $primary-color;
}

.email-popup__submit {
  padding: 8px;
  border: 0;
  color: $bg-color;
  background: $link-color;
  cursor: pointer;
}

.email-popup__close {
  position: absolute;
  top: 3px;
  right: 7px;
  border: 0;
  background: transparent;
  font-size: 28px;
  cursor: pointer;
}

.email-popup p {
  margin: 0 0 18px;
  font-size: $small-txt;
}
</style>
