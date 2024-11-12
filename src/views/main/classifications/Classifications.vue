<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane class="ellipse" label="recommend" name="first"></el-tab-pane>
    <el-tab-pane class="ellipse" label="dressing" name="second"></el-tab-pane>
    <el-tab-pane class="ellipse" label="delicacy" name="third"></el-tab-pane>
    <el-tab-pane class="ellipse" label="cosmetics" name="fourth"></el-tab-pane>
    <el-tab-pane class="ellipse" label="household" name="fifth"></el-tab-pane>
    <el-tab-pane class="ellipse" label="game" name="sixth"></el-tab-pane>
    <el-tab-pane class="ellipse" label="sports" name="seventh"></el-tab-pane>
    <el-tab-pane class="ellipse" label="trip" name="eighth"></el-tab-pane>
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
::v-deep(.ellipse .el-tab-pane__label) {
  font-size: 70px;
}
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
