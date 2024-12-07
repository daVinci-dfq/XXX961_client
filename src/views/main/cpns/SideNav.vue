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
            <span @click="explore">Explore</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><CirclePlus /></el-icon>
            <span @click="post">Post</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Bell /></el-icon>
            <span>Message</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><User /></el-icon>
            <span @click="information">Me</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><More /></el-icon>
            <span>More</span>
          </el-menu-item>
          <el-menu-item index="6">
            <el-icon><More /></el-icon>
            <span @click="test">test</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Bell, CirclePlus, Compass, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const information = () => {
  router.push({ name: 'info' })
}
const explore = () => {
  router.push({ name: 'explore' })
}
const test = () => {
  router.push({ name: 'test' })
}
const post = () => {
  router.push({ name: 'post' })
}
</script>

<style></style>
