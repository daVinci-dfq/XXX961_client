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
<script setup lang="ts">
import { CSSProperties, computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import {debounce,rafThrottle} from "./tool";
import { IVirtualWaterFallProps, ICardItem, IBookColumnQueue, IBookRenderItem, IBookItemRect } from "./type";
const props=defineProps<IVirtualWaterFallProps>();
defineSlots<{
  item(props:{item:ICardItem;imageHeight:number}):any;
}>();
const containerRef = ref<HTMLDivElement|null>(null);

const resizeObserver = new ResizeObserver(()=>{
  handleResize();
});

const dataState = reactive({
  loading:false,
  isFinish:false,
  currentPage:1,
  list:[] as ICardItem[],
});

const scrollState = reactive({
  viewWidth:0,
  viewHeight:0,
  start:0,
});

const queueState = reactive({
  queue:new Array(props.column).fill(0).map<IBookColumnQueue>(()=>({list:[],height:0})),
  len:0,
})

const hasMoreData = computed(()=> queueState.len<dataState.list.length);

const temporaryList = ref<IBookRenderItem[]>([]);

const isShow = ref(false);

const itemSizeInfo = ref(new Map<ICardItem["id"],IBookItemRect>());

const end = computed(()=>scrollState.viewHeight+scrollState.start);

const cardList = computed(()=>queueState.queue.reduce<IBookRenderItem[]>((pre,{list})=>pre.concat(list),[]));
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