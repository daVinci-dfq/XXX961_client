<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <top-bar class="header">
          <template #center>
            <div class="input-box" id="sujContainer">
              <input
                type="text"
                v-model="keyword"
                class="search-input"
                placeholder="探索世界"
                @input="changeInput"
                @focus="focusInput"
                @keyup.enter="searchPage"
                ref="SearchInput"
              />
              <div class="input-button">
                <div class="close-icon" v-show="showClose" @click="clearInput">
                  <Close
                    style="
                      width: 1.2em;
                      height: 1.2em;
                      margin-right: 20px;
                      margin-top: 5px;
                    "
                  />
                </div>
                <div class="search-icon" @click="searchPage">
                  <a href="#">
                    <Search
                      style="
                        width: 1.2em;
                        height: 1.2em;
                        margin-right: 20px;
                        margin-top: 5px;
                      "
                    />
                  </a>
                </div>
              </div>
              <searchContainer
                v-show="showSearch"
                :recordList="recordList"
              ></searchContainer>
              <SujContainer
                v-show="showHistory"
                :closeHistoryRecord="showHistory"
              ></SujContainer>
            </div>
          </template>
          <template #right>
            <div v-if="!afterLogin">
              <el-button
                link
                @click="loginDialogVisible = true"
                @afterLogin="getLoginData"
                >Login</el-button
              >
            </div>
            <div v-else class="avatar">
              <img :src="avatarSrc" class="avatar" />
            </div>
            <el-button link>Exit</el-button>
          </template>
        </top-bar>
      </el-header>
      <el-container>
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

    <LoginDialog
      v-model:loginDialogVisible="loginDialogVisible"
      @confirm="login"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { Search } from '@element-plus/icons-vue'
import Classifications from '@/views/main/classifications/Classifications.vue'
import LoginDialog from '@/views/login/cpns/LoginDialog.vue'
import FsVirtualWaterfall from '../waterfall-layout/FsVirtualWaterfall.vue'
import type { ICardItem } from '../waterfall-layout/type'
import list from '../waterfall-layout/config/index'
import searchContianer from './searchContianer.vue'
import { getRandomString } from '@/utils/util'
import { SearchStore } from '@/stores/searchStore'
const keyword = ref('')
const searchStore = SearchStore()
const search_input = ref('')
const showHistory = ref(false)
const showSearch = ref(false)
const showClose = ref(false)
const SearchInput = ref()
const recordList = ref<Array<string>>([])
const clearInput = () => {
  keyword.value = ''
  showClose.value = false
  showHistory.value = true
  showSearch.value = false
  SearchInput.value.focus()
}
const focusInput = () => {
  showSearch.value = keyword.value.length == 0 ? false : true
  showHistory.value = keyword.value.length > 0 ? false : true
}
const changeInput = (e: any) => {
  const { value } = e.target
  keyword.value = value
  showClose.value = keyword.value == '' ? false : true
  showSearch.value = keyword.value.length == 0 ? false : true
  showHistory.value = keyword.value.length > 0 ? false : true
  if (keyword.value.length > 0) {
    getRecordByKeyWord(keyword.value).then((res) => {
      recordList.value = res.data
    })
  }
}
const searchPage = () => {
  // 1.storage中添加搜索记录
  searchStore.setKeyword(keyword.value)
  if (keyword.value.length > 0) {
    searchStore.pushRecord(keyword.value)
    searchStore.setSeed(getRandomString(12))
  }
  showSearch.value = false
}

const afterLogin = ref(false)
const loginDialogVisible = ref(false)
const avatarSrc = ref('public/image1.jpg') // 头像路径

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

const getLoginData = () => {
  afterLogin.value = false
  console.log(afterLogin.value)
}
const handleLoginDialogVisible = (newValue: boolean) => {
  loginDialogVisible.value = newValue
}
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

//avatar
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
}

.avatar {
  width: 10px; /* 调整头像大小 */
  height: 10px;
  border-radius: 50%; /* 使头像呈圆形 */
  object-fit: cover; /* 确保图片覆盖整个容器 */
}
.input-box {
  height: 40px;
  position: fixed;
  left: 50%;
  transform: translate(-50%);

  @media screen and (max-width: 695px) {
    display: none;
  }

  @media screen and (min-width: 960px) and (max-width: 1191px) {
    width: calc(-36px + 50vw);
  }

  @media screen and (min-width: 1192px) and (max-width: 1423px) {
    width: calc(-33.6px + 40vw);
  }

  @media screen and (min-width: 1424px) and (max-width: 1727px) {
    width: calc(-42.66667px + 33.33333vw);
  }

  @media screen and (min-width: 1728px) {
    width: 533.33333px;
  }

  .search-input {
    padding: 0 84px 0 16px;
    width: 100%;
    height: 100%;
    font-size: 16px;
    line-height: 120%;
    color: #333;
    caret-color: #ff2442;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 999px;
  }

  .input-button {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: rgba(51, 51, 51, 0.8);

    .close-icon .search-icon {
      width: 40px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: rgba(51, 51, 51, 0.8);
    }
  }
}
</style>
