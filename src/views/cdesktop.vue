<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import initialCompositions from '../data/data.json'

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
const stickersList = ref(null)
const scrollbarTrack = ref(null)
const scrollMetrics = ref({ top: 0, height: 0, scrollHeight: 0, trackHeight: 0 })
const draggingScrollbar = ref(false)
const scrollbarDragStart = ref(0)
const scrollTopAtDragStart = ref(0)
const savedCompositions = ref(
  Array.isArray(initialCompositions) ? initialCompositions : [],
)
const localCompositions = ref([])
const saveError = ref('')
const compositionsStorageKey = 'cdesktop-compositions'

const popupTitle = computed(() => (emailSubmitted.value ? 'Composition enregistrée' : 'Enregistrer la composition'))
const scrollbarThumbHeight = computed(() => {
  const { height, scrollHeight, trackHeight } = scrollMetrics.value
  if (!trackHeight || scrollHeight <= height) return trackHeight
  return Math.min(trackHeight, Math.max(28, (trackHeight * height) / scrollHeight))
})
const scrollbarThumbTop = computed(() => {
  const { top, height, scrollHeight, trackHeight } = scrollMetrics.value
  const availableHeight = trackHeight - scrollbarThumbHeight.value
  const maxScroll = scrollHeight - height
  return maxScroll > 0 ? (top / maxScroll) * availableHeight : 0
})

const updateScrollbar = () => {
  if (!stickersList.value) return
  scrollMetrics.value = {
    top: stickersList.value.scrollTop,
    height: stickersList.value.clientHeight,
    scrollHeight: stickersList.value.scrollHeight,
    trackHeight: scrollbarTrack.value?.clientHeight ?? 0,
  }
}

const scrollStickers = (amount) => {
  stickersList.value?.scrollBy({ top: amount, behavior: 'smooth' })
}

const startScrollbarDrag = (event) => {
  event.preventDefault()
  draggingScrollbar.value = true
  scrollbarDragStart.value = event.clientY
  scrollTopAtDragStart.value = stickersList.value?.scrollTop ?? 0
  window.addEventListener('pointermove', moveScrollbar)
  window.addEventListener('pointerup', stopScrollbarDrag)
  window.addEventListener('pointercancel', stopScrollbarDrag)
}

const moveScrollbar = (event) => {
  if (!draggingScrollbar.value || !stickersList.value || !scrollbarTrack.value) return
  const trackHeight = scrollbarTrack.value.clientHeight
  const availableHeight = trackHeight - scrollbarThumbHeight.value
  const maxScroll = stickersList.value.scrollHeight - stickersList.value.clientHeight
  if (availableHeight <= 0 || maxScroll <= 0) return

  const distance = event.clientY - scrollbarDragStart.value
  stickersList.value.scrollTop =
    scrollTopAtDragStart.value + (distance / availableHeight) * maxScroll
}

const stopScrollbarDrag = () => {
  draggingScrollbar.value = false
  window.removeEventListener('pointermove', moveScrollbar)
  window.removeEventListener('pointerup', stopScrollbarDrag)
  window.removeEventListener('pointercancel', stopScrollbarDrag)
}

onMounted(() => {
  updateScrollbar()
  try {
    const storedCompositions = localStorage.getItem(compositionsStorageKey)
    if (storedCompositions) {
      const storedLocalCompositions = JSON.parse(storedCompositions)
      if (Array.isArray(storedLocalCompositions)) {
        localCompositions.value = storedLocalCompositions
        savedCompositions.value = [...savedCompositions.value, ...storedLocalCompositions]
      }
    }
  } catch (error) {
    console.error('Impossible de lire les compositions enregistrées.', error)
  }
  window.addEventListener('resize', updateScrollbar)
})

onBeforeUnmount(() => {
  stopScrollbarDrag()
  window.removeEventListener('resize', updateScrollbar)
})

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

  const move = (moveEvent) => {
    sticker.x = originalX + moveEvent.clientX - startX
    sticker.y = originalY + moveEvent.clientY - startY
  }
  const stop = () => {
    const visibleWidth = Math.max(
      0,
      Math.min(sticker.x + sticker.size, bounds.width) - Math.max(sticker.x, 0),
    )
    const visibleHeight = Math.max(
      0,
      Math.min(sticker.y + sticker.size, bounds.height) - Math.max(sticker.y, 0),
    )
    const hasMinimumVisibleArea = visibleWidth >= 10 && visibleHeight >= 10

    if (!hasMinimumVisibleArea) {
      composition.value = composition.value.filter(
        ({ instanceId }) => instanceId !== sticker.instanceId,
      )
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
  saveError.value = ''
  isEmailPopupOpen.value = true
}

const closeEmailPopup = () => {
  isEmailPopupOpen.value = false
  emailSubmitted.value = false
  saveError.value = ''
}

const submitEmail = () => {
  const emailNumber = savedCompositions.value.length + 1
  const compositionRecord = {
    id: `email-${emailNumber}`,
    email: email.value,
    images: composition.value.map((sticker, index) => ({
      id: `image-${index + 1}`,
      stickerId: sticker.id,
      name: sticker.name,
      url: sticker.url,
      x: sticker.x,
      y: sticker.y,
      size: sticker.size,
      zIndex: sticker.zIndex,
    })),
  }
  const updatedCompositions = [...localCompositions.value, compositionRecord]

  try {
    localStorage.setItem(compositionsStorageKey, JSON.stringify(updatedCompositions))
    localCompositions.value = updatedCompositions
    savedCompositions.value = [...savedCompositions.value, compositionRecord]
  } catch (error) {
    saveError.value = 'La composition n’a pas pu être enregistrée.'
    console.error('Impossible d’enregistrer la composition.', error)
    return
  }

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
        <div ref="stickersList" class="stickers-window__list" @scroll="updateScrollbar">
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
        <div ref="scrollbarTrack" class="stickers-scrollbar" aria-label="Défilement des stickers">
          <button class="scrollbar-arrow" type="button" aria-label="Monter" @click="scrollStickers(-180)">
            <img src="../components/icons/arrow-up-s-fill.svg" alt="">
          </button>
          <div class="scrollbar-track">
            <button
              class="scrollbar-thumb"
              type="button"
              aria-label="Faire défiler les stickers"
              :style="{ height: `${scrollbarThumbHeight}px`, transform: `translateY(${scrollbarThumbTop}px)` }"
              @pointerdown="startScrollbarDrag"
            />
          </div>
          <button class="scrollbar-arrow" type="button" aria-label="Descendre" @click="scrollStickers(180)">
            <img src="../components/icons/arrow-down-s-fill.svg" alt="">
          </button>
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
          <p v-if="saveError" class="email-popup__error">{{ saveError }}</p>
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
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: start;
  gap: 12px;
  padding: 14px 20px 14px 14px;
  box-sizing: border-box;
  scrollbar-width: none;
}

.stickers-window__list::-webkit-scrollbar {
  display: none;
}

.sticker-item {
  height: 92px;
  cursor: grab;
  touch-action: none;
}

.stickers-scrollbar {
  width: 24px;
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 0;
  background: #EBEBEB;
  box-shadow: inset -2px 0 0 #828282, inset 0 -2px 0 #828282;
}

.scrollbar-arrow {
  width: 24px;
  height: 24px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 0;
  background: #ADADAD;
  box-shadow: inset -2px 0 0 #828282, inset 0 -2px 0 #828282;
  cursor: pointer;
}

.scrollbar-arrow img {
  width: 24px;
  height: 24px;
}

.scrollbar-track {
  height: calc(100% - 48px);
  position: relative;
  background: #EBEBEB;
  overflow: hidden;
}

.scrollbar-thumb {
  width: 24px;
  min-height: 28px;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  background: #ADADAD;
  box-shadow: inset -2px 0 0 #828282, inset 0 -2px 0 #828282;
  cursor: grab;
  touch-action: none;
}

.scrollbar-thumb:active {
  cursor: grabbing;
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

.email-popup__error {
  color: #f00;
}
</style>
