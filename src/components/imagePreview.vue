<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  variant: { type: String, default: '' },
})
const emit = defineEmits(['close'])

const closeButton = ref(null)

const closePreview = () => {
  emit('close')
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') closePreview()
}

onMounted(async () => {
  document.addEventListener('keydown', handleKeydown)
  await nextTick()
  closeButton.value?.focus()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="image-preview-overlay"
      role="presentation"
      @click.self="closePreview"
    >
      <div
        class="image-preview-dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="props.alt"
        @click.self="closePreview"
      >
        <button
          ref="closeButton"
          class="image-preview-close"
          type="button"
          :aria-label="$t('controls.closeImagePreview')"
          @click="closePreview"
        >
          <img src="./icons/close-line.svg" alt="">
        </button>
        <img
          class="image-preview-full"
          :class="props.variant && `image-preview-full--${props.variant}`"
          :src="props.src"
          :alt="props.alt"
        >
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.image-preview-overlay{
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(36 48 38 / 75%);
}

.image-preview-dialog{
  position: relative;
  display: grid;
  place-items: center;
  width: min(100%, 1200px);
  height: min(100%, 900px);
}

.image-preview-full{
  display: block;
  max-width: 1000px;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.image-preview-full--molly-banner-square{
  width: min(80vw, 80vh);
  height: min(80vw, 80vh);
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.image-preview-close{
  position: absolute;
  top: -16px;
  right: -16px;
  z-index: 1;
  width: 40px;
  height: 40px;
  border: 2px solid #243026;
  background: #fff;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
}

.image-preview-close img{
  width: 24px;
  height: 24px;
}

@media screen and (max-width: 1100px){
  .image-preview-overlay{
    padding: 16px;
  }

  .image-preview-close{
    top: -12px;
    right: -8px;
  }
}

@media screen and (min-width: 1101px){
  .image-preview-full--molly-collage{
    max-width: 50vw;
    max-height: 65vh;
  }
}
</style>
