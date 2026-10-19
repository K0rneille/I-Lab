<script setup>
import designMuseumBrussels from './img/sponsors/designmuseumbrussels.webp'
import tumblr from './img/sponsors/tumblr.webp'
import visitWallonia from './img/sponsors/visitwallonia.webp'

const sponsors = [
    { name: 'Design Museum Brussels', img: designMuseumBrussels },
    { name: 'tumblr', img: tumblr },
    { name: 'Visit Wallonia', img: visitWallonia },
]

</script>




<template>


<div class="wrapper sponsor">
    <div class="groupe">
        <div
        v-for="item in sponsors"
        :key="item.name"
        :item = item

        :imgsrc = item.img     
        >


        <img
        class="sponsor-img"
        v-bind:src= "item.img"
        :alt="item.name"
        />

        
        </div>

    </div>

        <div aria-hidden class="groupe">
        <div
        v-for="item in sponsors"
        :key="item.name"
        :item = item
        :name = item.name
        :imgsrc = item.img     
        >


        <img
        class="sponsor-img"
        v-bind:src= "item.img"
        alt=""
        />

        
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