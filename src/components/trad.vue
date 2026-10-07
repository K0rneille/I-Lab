<template>

  <form class="form">
    <select name="lang" id="lang" class="form__select">
      <option value="fr" class="form__option">français</option>
      <option value="en" class="form__option">english</option>
      <option value="nl" class="form__option">ne</option>
      <option value="de" class="form__option">deutsch</option>
    </select>



  </form>
  <button class="changeLang" @click="$emit('changeLang', 'fr')">français</button>
  <button class="changeLang" @click="$emit('changeLang', 'en')">english</button>
  <button class="changeLang" @click="$emit('changeLang', 'nl')">neerlandais</button>
  <button class="changeLang" @click="$emit('changeLang', 'de')">allemand</button>
</template>

<script setup >

defineEmits(['changeLang']);

</script>