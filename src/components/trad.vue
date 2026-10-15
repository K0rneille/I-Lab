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
  </div>
</template>

<style scoped lang="scss">


*{
  box-sizing: border-box;
}
.form{
  margin: 1.2rem 0;
  position: relative;


    &__select{
      position: absolute;
      left: 0;
      right: 0;
      opacity: 0;
      transform: scale(1,0);
      transform-origin: top left;
      transition: all .3s ease-in;
      pointer-events: none;
      z-index: 2;
      top: 64px ;
      list-style: none;
      padding: 0;



      font-weight: 700;
      background-color: transparent;
      border: none;
      font-size: 28px;  
      display: block;

      width: 60%;
      margin: 0 auto;
      text-align: left;
      background: white;
      border: 0;

      &--active {
        opacity: 1;
        transform: scale(1, 1);
        pointer-events: auto;

      }


    }

    &__btn{
      z-index: 10;
      position: relative;
      display: block;
      width: 60%;
      padding: 8px 16px;
      font-size: 28px;
      font-weight: 700;
      margin: 0 auto;
      text-align: left;
      background: white;
      border: 0;

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
      text-align: right;
      padding: 2px 16px;
      cursor: pointer;
      display:inline-block;


      font-weight: 700;
      border-radius: 0;
      left: 0;
      width: 100%;
      background: white;
      border: 1px solid #ccc;


      

        opacity: 0;
        transform: translateY(-8px);
        transition: opacity .2s ease, transform .2s ease; // pas de délai à la fermeture

        // état ouvert : chaque option arrive avec un retard croissant
        .form__select--active & {
          opacity: 1;
          transform: translateY(0);
          transition-delay: calc(var(--i) * 60ms);
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


