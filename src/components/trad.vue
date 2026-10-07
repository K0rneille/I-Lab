<script setup >

defineEmits(['changeLang']);

</script>



<template>

  <form class="form">
    <select name="lang" id="lang" class="form__select">
      <option value="fr" class="form__option" @click="$emit('changeLang', 'fr')">français</option>
      <option value="en" class="form__option" @click="$emit('changeLang', 'en')">english</option>
      <option value="nl" class="form__option" @click="$emit('changeLang', 'nl')">nederlands</option>
      <option value="de" class="form__option" @click="$emit('changeLang', 'de')">deutsch</option>
    </select>



  </form>

</template> 



<style scoped lang="scss">

.form{
  &__select{


  }

    &__option{
      color : blue;
    }
}

</style>