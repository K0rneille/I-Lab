<template>
  <button class="changeLang" @click="$emit('changeLang', 'fr')">francais</button>
  <button class="changeLang" @click="$emit('changeLang', 'en')">english</button>
  <button class="changeLang" @click="$emit('changeLang', 'nl')">neerlandais</button>
  <button class="changeLang" @click="$emit('changeLang', 'ge')">allemand</button>
</template>

<script setup >


defineEmits(['changeLang']);


</script>