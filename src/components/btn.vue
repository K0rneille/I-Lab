<template>
  <button class="changeLang" @click="$emit('changeLang', 'ja')">japan</button>
  <button class="changeLang" @click="$emit('changeLang', 'en')">english</button>

</template>

<script setup >


defineEmits(['changeLang']);


</script>