<template>
  <div class="side_nav">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el_menu"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <el-icon><Compass /></el-icon>
            <span>Explore</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><CirclePlus /></el-icon>
            <span>Post</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Bell /></el-icon>
            <span>Message</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><User /></el-icon>
            <span>Me</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><More /></el-icon>
            <span>More</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Bell, CirclePlus, Compass, User } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style></style>
