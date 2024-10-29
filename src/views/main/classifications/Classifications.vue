<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane class="ellipse" label="推荐" name="first"></el-tab-pane>
    <el-tab-pane class="ellipse" label="穿搭" name="second"></el-tab-pane>
    <el-tab-pane class="ellipse" label="美食" name="third"></el-tab-pane>
    <el-tab-pane class="ellipse" label="彩妆" name="fourth"></el-tab-pane>
    <el-tab-pane class="ellipse" label="家居" name="fifth"></el-tab-pane>
    <el-tab-pane class="ellipse" label="游戏" name="sixth"></el-tab-pane>
    <el-tab-pane class="ellipse" label="运动" name="seventh"></el-tab-pane>
    <el-tab-pane class="ellipse" label="旅行" name="eighth"></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped>
.ellipse-tab-pane {
  border-radius: 20px; /* 设置椭圆的圆角 */
  overflow: hidden; /* 隐藏超出椭圆部分的内容 */
}

/* 如果你需要覆盖 Element UI 的默认样式，可以更具体地选择元素 */
.el-tabs__pane.ellipse-tab-pane {
  border-radius: 20px;
  overflow: hidden;
}
</style>
