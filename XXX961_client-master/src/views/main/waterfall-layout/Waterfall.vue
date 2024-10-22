<template>
  <waterfall :line-gap="200" :watch="items">
  <waterfall-slot
    v-for="(item, index) in items"
    :width="item.width"
    :height="item.height"
    :order="index"
    :key="item.id">

  </waterfall-slot>
</waterfall>
</template>

<script setup>
import Waterfall from 'vue-waterfall';
import WaterfallSlot from 'vue-waterfall';
import {ref} from 'vue'
const items = ref([{id: 1, width: 100, height: 200, image: 'image1.jpg', text: 'Item 1'},

])
</script>

<style scoped>
.display{
    width:300px;
    height: 200px;
}
</style>