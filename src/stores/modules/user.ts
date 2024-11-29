//UserStore.ts
import { defineStore } from 'pinia'

import {
  getStoreId,
  setStoreId,
  getUserInfo,
  removeUserInfo
} from '@/utils/cookies'
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
  const removeFocus = (type: number, id: number) => {
    if (type === 1) {
      const index = userFocus.value.indexOf(id)
      if (index !== -1) {
        userFocus.value.splice(index, 1)
      }
    } else if (type === 2) {
      const index = userFavorite.value.indexOf(id)
      if (index !== -1) {
        userFavorite.value.splice(index, 1)
      }
    } else if (type === 3) {
      const index = userCollect.value.indexOf(id)
      if (index !== -1) {
        userCollect.value.splice(index, 1)
      }
    }
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
