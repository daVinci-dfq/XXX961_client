//UserStore.ts
import { defineStore } from 'pinia'

import {
  getToken,
  setToken,
  removeToken,
  getStoreId,
  setStoreId,
  getUserInfo,
  removeUserInfo
} from '~/utils/cookies'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import { Message } from '@element-plus/icons-vue'
import { Register, login, queryUserFocus } from '@/utils/api'
// import { appStore } from './appStore';
// import router from '~/router';
// const aStore = appStore()

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const userFocus = ref([])
  const userCollect = ref([])
  const userFavorite = ref([])
  const headersObj = ref({})
  const userRegister = async ({
    email,
    username,
    password
  }: {
    email: string
    username: string
    password: string
  }) => {
    await Register({ email, username, password })
  }
  const getUserInfo = async ({
    username,
    email,
    password
  }: {
    username: string
    email: string
    password: string
  }) => {
    userInfo.value = await login({ email, password, username })
    const focusResult = await queryUserFocus()
    userFocus.value = focusResult.info.follow
    userCollect.value = focusResult.info.collected
    userFavorite.value = focusResult.info.favorites
    headersObj.value = { Authorization: `Bearer ${userInfo.value.token}` }
  }
  const userLogout = async () => {
    userInfo.value = {}
    return { info: '成功退出登录' }
  }

  const changeInfo = ({
    username,
    signature,
    avatar
  }: {
    username: string
    signature: string
    avatar: File
  }) => {
    userInfo.value.username = username
    userInfo.value.signature = signature
    userInfo.value.avatar = avatar
  }
  return {
    userInfo,
    getUserInfo,
    userLogout,
    userRegister,
    // extendUserInfo,
    userFocus,
    // removeFocus,
    changeInfo,
    userCollect,
    userFavorite,
    headersObj
  }
})
