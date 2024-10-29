//UserStore.ts
import {defineStore} from 'pinia';

import { getToken, setToken, removeToken, getStoreId, setStoreId, getUserInfo, removeUserInfo } from '~/utils/cookies';  
import Cookies from 'js-cookie';  
import { Message } from '@element-plus/icons-vue'
// import { appStore } from './appStore';
// import router from '~/router';
// const aStore = appStore()