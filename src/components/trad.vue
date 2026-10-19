<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  current: { type: String, default: 'fr' },
});
const emit = defineEmits(['changeLang']);

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'de', label: 'Deutsch' },
];

const isOpen = ref(false);
const selected = ref(props.current);
const root = ref(null);
const button = ref(null);

// Texte du bouton = label de la langue sélectionnée
const buttonLabel = computed(
  () => languages.find((l) => l.code === selected.value)?.label ?? 'Select'
);

// Reste synchronisé si le parent change la langue
watch(() => props.current, (code) => (selected.value = code));

const toggleDropdown = () => (isOpen.value = !isOpen.value);

const closeDropdown = () => {
  isOpen.value = false;
};

const select = (code) => {
  selected.value = code;
  emit('changeLang', code);
  closeDropdown();
  button.value?.focus();
  console.log(code)
};




// Clic en dehors = fermer
const handleDocumentClick = (event) => {
  if (isOpen.value && root.value && !root.value.contains(event.target)) {
    closeDropdown();
  }

};

const changeActive = (event)=> {
  
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<template>
  <div ref="root" class="form">


    <ul
      id="listbox"
      role="listbox"
      class="form__select"
      :class="{ 'form__select--active': isOpen }"
    >
      <li
          v-for="(lang, i) in languages"
          :key="lang.code"
          role="option"
          :style="{ '--i': i }"
          class="form__option"
          :class="{ 'form__option--active': lang.code === selected }"
          :aria-selected="lang.code === selected"
          :tabindex="isOpen ? 0 : -1"
          @click="select(lang.code)"
          @keydown.enter="select(lang.code)"
          @keydown.space.prevent="select(lang.code)"

      >
        {{ lang.label }}
      </li>
    </ul>

    <button
      ref="button"
      type="button"
      class="form__btn"
      role="combobox"
      aria-controls="listbox"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '../app.scss' as *;

*{
  box-sizing: border-box;
}
.form{
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 10;
  


    &__select{
      overflow: hidden;
      position: absolute;
      left: 0;
      right: 0;
      opacity: 0;
      height: fit-content;
      transform-origin: bottom left;
      transition: all .3s ease-in;
      pointer-events: none;
      z-index: 2;
      bottom: 76px ;
      list-style: none;
      padding: 0;



      font-weight: 700;
      background-color: transparent;
      border: none;
      font-size: 28px;  
      display: block;

      width: 100%;
      margin: 0 auto;
      text-align: left;
      background: $bg-color;
      border: 0;

      &--active {
        opacity: 1;
        height: fit-content;
        pointer-events: auto;

      }


    }

    &__btn{
      z-index: 10;
      position: relative;
      display: block;
      width: 285px;
      padding: 8px 16px;
      font-size: 28px;
      font-weight: 700;
      color: $primary-color;
      margin: 0 auto;
      text-align: left;
      background: $bg-color;
      border: 3px solid $primary-color;

      display: flex;
      justify-content: space-between;
      align-items: center;


        &:before{
          content: url(./img/language-icon.svg );

          height: 54px;
          width: 54px;

      }
    }

    &__option{
    font-family: $primary-font;
    list-style: none;
    font-size: 28px;

      text-align: right;
      padding: 0 16px 0 0;
      cursor: pointer;
      display:block;


      font-weight: 700;
      border-radius: 0;
      left: 0;
      width: 100%;
      background: $bg-color;
      border: 1px solid $primary-color;

        opacity: 0;
        transform: translateY(calc(100% * (var(--i) + 1)));
        transition:
        transform 0.3s ease-out,
        opacity 0.3s ease-out;
        transition-delay: calc( var(--i) * 80ms);
            // état ouvert : chaque option arrive avec un retard croissant
        .form__select--active & {
      opacity: 1;
      transform: translateY(0);
      transition-delay: calc(var(--i) * 80ms);

        }
        &--active {
          background: #222;
          color: white;
        }

    }

    &__label{
      position: absolute;
      display: block;
      height : 54px ;
      aspect-ratio: 1 / 1;
      text-align: left;
      font-size: .75rem;

    }
}




</style>
