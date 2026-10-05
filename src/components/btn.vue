<template>
  <button class="changeLang" @click="$emit('changeLang', 'fr')">japan</button>
  <button class="changeLang" @click="$emit('changeLang', 'en')">english</button>

</template>

<script setup >


defineEmits(['changeLang']);


</script>