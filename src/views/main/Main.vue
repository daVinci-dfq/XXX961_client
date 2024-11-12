<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <top-bar class="header">
          <template #left>
            <p>XXX961</p>
          </template>
          <template #center>
            <div class="vertical-flex">
              <div class="search-icon">
                <el-input
                  v-model="search_input"
                  class="input"
                  placeholder="Type here to search!"
                  :prefix-icon="Search"
                  clearable
                />
                <el-button style="height: 40px; margin-top: 16px"
                  >search</el-button
                >
              </div>
            </div>
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
        <el-main class="el-main">
          <RouterView />
          <classifications />
          <div class="container" ref="fContainerRef">
            <FsVirtualWaterfall
              :request="getData"
              :gap="15"
              :page-size="20"
              :column="column"
            >
              <template #item="{ item }">
                <div
                  class="test-item"
                  :style="{
                    background: item.bgColor
                  }"
                ></div>
              </template>
            </FsVirtualWaterfall>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <LoginDialog v-model="loginDialogVisible" @confirm="login" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import SideNav from './cpns/SideNav.vue'
import LoginDialog from '../login/LoginDialog.vue'
import Classifications from './classifications/Classifications.vue'
import FsVirtualWaterfall from './waterfall-layout/FsVirtualWaterfall.vue'
import type { ICardItem } from './waterfall-layout/type'
import list from './waterfall-layout/config/index'

const search_input = ref('')
const loginDialogVisible = ref(false)

const login = (loginData: { username: string; password: string }) => {
  console.log('Username:', loginData.username)
  console.log('Password:', loginData.password)
}
// 在这里处理登录逻辑

const fContainerRef = ref<HTMLDivElement | null>(null)
const column = ref(6)
const fContainerObserver = new ResizeObserver((entries) => {
  changeColumn(entries[0].target.clientWidth)
})

const changeColumn = (width: number) => {
  if (width > 960) {
    column.value = 5
  } else if (width >= 690 && width < 960) {
    column.value = 4
  } else if (width >= 500 && width < 690) {
    column.value = 3
  } else {
    column.value = 2
  }
}

onMounted(() => {
  fContainerRef.value && fContainerObserver.observe(fContainerRef.value)
})

onUnmounted(() => {
  fContainerRef.value && fContainerObserver.unobserve(fContainerRef.value)
})

const getData = (page: number, pageSize: number) => {
  return new Promise<ICardItem[]>((resolve) => {
    setTimeout(() => {
      resolve(
        list.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
      )
    }, 1000)
  })
}
</script>

<style scoped lang="scss">
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
  margin-top: 16px;
  width: 300px;
  height: 40px;
}

.search-icon {
  display: flex;
  place-items: center;
}
.el-main {
  overflow: hidden;
}
.el-container {
  height: calc(100vh - 72px);
}

.aside {
  padding: 20px;
  width: 300px;
}

.vertical-flex {
  display: flex;
  flex-direction: column;
}

// waterfall
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .test-item {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    animation: MoveAnimate 0.25s;
  }
  .test-item:hover {
    transform: scale(1.03);
    transition: transform 0.6s ease;
    // animation: RotationAnimate 0.3s;
    box-shadow: #ccc 0px 10px 10px;
  }
}
@keyframes MoveAnimate {
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes RotationAnimate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(3deg);
  }
}
</style>
