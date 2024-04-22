<script setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { store } from './../stores/store.js'
import Flickity from 'flickity'

let flkty

const data = reactive({ isReady: false })

onMounted(() => { // mounted
    setTimeout(() => {
        initFlickity()
    }, 1000);

})

const initFlickity = () => {
    var elem = document.querySelector('.main-carousel');
    flkty = new Flickity(elem, {
        // options
        cellAlign: 'center',
        contain: false
    });

    data.isReady = true
}

</script>

<template>
    <div class="main-carousel" :style="{ 'opacity': data.isReady == true ? 1 : 0 }">
        <div class="item">
            <p>Item</p>
        </div>
        <div class="item">
            <p>Item</p>
        </div>
        <div class="item">
            <p>Item</p>
        </div>
        <div class="item">
            <p>Item</p>
        </div>
        <div class="item">
            <p>Item</p>
        </div>
        <div class="item">
            <p>Item</p>
        </div>
        <div class="item">
            <p>Item</p>
        </div>
    </div>
</template>

<style lang="scss">
@import url('https://unpkg.com/flickity@2/dist/flickity.min.css');

.main-carousel {
    width: 100%;
    background-color: grey;
    position: relative;
    transition: opacity 0.3s ease-in;
    height: 300px;
    // opacity: 0;

    .item {
        width: 300px;
        height: 300px;
        border: 1px solid #dadada;
        display: flex;
        position: absolute;

        p {
            margin: auto;
        }
    }
}
</style>