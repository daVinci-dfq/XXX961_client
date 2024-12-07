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
import { Register, login } from '@/api/login'
import { storage } from '@/utils/storage'
import { refreshToken } from '@/api/user'
import type { User } from '@/type/user'
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
  const getUserInfo = (): User => {
    return storage.get('userInfo') as User
  }

  const userLogout = async () => {
    userInfo.value = {}
    return { info: '成功退出登录' }
  }
  const isLogin = () => {
    const user = storage.get('userInfo') as User
    return user != null && user != undefined
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

  const getToken = () => {
    return storage.get('accessToken')
  }
  const getNewToken = (token: string) => {
    return new Promise<any>((resolve, reject) => {
      refreshToken(token)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
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
    headersObj,
    getNewToken,
    getToken,
    isLogin
  }
})
