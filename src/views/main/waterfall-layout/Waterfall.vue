<template>
  <div class="fs-virtual-waterfall-container" ref="containerRef" @scroll="handleScroll">
    <div class="fs-virtual-waterfall-list" :style="liststyle">
      <div
       v-if="isShow"
       class="fs-virtual-waterfall-item"
       v-for="{item,style,imageHeight} in renderList"
       :key="item.id"
       :style="style"
       >
         <slot name="item" :item="item" :imageHeight="imageHeight"></slot>
      </div>
      <div id="temporary-list" v-else>
        <div v-for="{item,imageHeight,style} in temporaryList" :style="style">
          <slot name="item" :item="item" :imageHeight="imageHeight"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CSSProperties, computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import {debounce,refThrottle} from"src/service/tool";
import
</script>

<style scoped lang="scss">
.fs-virtual-waterfall{
   &-container{
    width:100%;
    height:100%;
    overflow-y:scroll;
    overflow-x:hidden;
   }
   &-item{
    position:absolute;
    top:0;
    left:0;
    box-sizing:border-box;
   }
   &-list{
    position:relative;
    width:100%;
   }
}
</style>