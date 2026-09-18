<script setup>
    defineProps({
    txt: {
        type : String,
        required:true
        }
    })
console.log(txt)
</script>

<template>

    <div>{{ txt }}</div>
    
</template>

<style scoped></style>
