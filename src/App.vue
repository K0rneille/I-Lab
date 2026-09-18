<script setup>
  import {ref} from "vue"

import test from "./components/test.vue"

const language = "fr" ;
const texte = ref("")
fetch("src/components/assets/txt.json")
.then((reponse)=>{
    return reponse.json()
    
  })
  .then((data)=>{
    data.forEach((text)=>{

      if (text.language === language ){

        texte = text.txt
        

        
      }

    })
  })

</script>

<template>

  <test :texte ="texte"/>
  
</template>

<style scoped></style>
