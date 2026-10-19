<script setup>
import { ref } from 'vue';
console.clear()

const sponsors = ref( [

     {
        "name" : "designmuseumbrussels",
        "img" : "src/components/img/sponsors/designmuseumbrussels.webp"
    },

     {
        "name" : "tumblr",
        "img" : "src/components/img/sponsors/tumblr.webp"
    },

     {
        "name" : "visitwallonia",
        "img" : "src/components/img/sponsors/visitwallonia.webp"
    }


])

</script>




<template>


<div class="wrapper sponsor">
    <div class="groupe">
        <div
        v-for="(item, i) in sponsors"
        :key="item.name"
        :item = item

        :imgsrc = item.img     
        >


        <img 
        class="sponsor-img"
        v-bind:src= "item.img"/>

        
        </div>

    </div>

        <div aria-hidden class="groupe">
        <div
        v-for="(item, i) in sponsors"
        :item = item
        :name = item.name
        :imgsrc = item.img     
        >


        <img 
        class="sponsor-img"
        v-bind:src= "item.img"/>

        
        </div>

    </div>
</div>

</template>


<style scoped lang="scss">

*{
    box-sizing: border-box;
}

.wrapper {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 111px;
    display: flex;
    overflow: hidden;      // plutôt que overflow-x: auto

}

.groupe {
    display: flex;
    align-items: center;
    flex-shrink: 0;        // ← essentiel : empêche la compression
    gap: 16px;
    padding-right: 16px;
    animation: spin 5s infinite linear;
}

.sponsor-img {            // à mettre uniquement sur l'img
    flex: 0 0 111px;
    width: 111px;
    height: auto;
}

@keyframes spin {
    from { transform: translateX(0); }
    to   { transform: translateX(-100%); }
}
</style>