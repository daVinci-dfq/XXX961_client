<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <top-bar class="header">
          <template #left>
            <p>XXX961</p>
          </template>
          <template #center>
            <el-input
              v-model="search_input"
              class="input"
              placeholder="Type here to search!"
              :prefix-icon="Search"
              clearable
            />
            <el-button style="height: 40px">search</el-button>
          </template>
          <template #right>
            <el-button link @click="loginDialogVisible = true">Login</el-button>
            <el-button link>Exit</el-button>
          </template>
        </top-bar>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <side-nav></side-nav>
        </el-aside>
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>

    <LoginDialog v-model="loginDialogVisible" @confirm="login" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import SideNav from './cpns/SideNav.vue'
import LoginDialog from '../login/LoginDialog.vue'

const search_input = ref('')
const loginDialogVisible = ref(false)

const login = (loginData: { username: string; password: string }) => {
  console.log('Username:', loginData.username)
  console.log('Password:', loginData.password)
  // 在这里处理登录逻辑
}
</script>

<style scoped>
.common-layout {
  height: 100vh;
}

.header {
  margin: 0;
  height: 72px;
}

p {
  font-size: 21px;
  letter-spacing: 9px;
  color: transparent;
  text-shadow: 0 0px 1px #66bfff;
}

.input {
  width: 38%;
  height: 40px;
}

.el-container {
  height: calc(100vh - 72px);
}

.aside {
  padding: 20px;
  width: 300px;
}
</style>
