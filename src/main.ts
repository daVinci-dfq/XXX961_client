// import { useUserStore } from '@/stores/user'
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入Pinia。
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue' // 导入根组件（也称App组件）。
import router from './router/index' // 路由。
// import axios from './service' // 通信。
import 'normalize.css'
import './assets/css/index.less'

//创建应用实例对象
const app = createApp(App)
const pinia = createPinia()

//pinia使用:
//import useCounterStore from "///"
//import {storeToRef} from "pinia"
//const store = useCounterStore()
//const {name,doubleCount} = storeToRef(store) //对数据进行解构要用storeToRef()
//const {increment} = store//对方法进行解析不需要

app.use(pinia) //pinia安装以及持久化配置
app.use(router) // 安装路由插件。
// app.use(axios)

app.mount('#app') // 将页面渲染到index.html文件中id="app"的元素上。
// const userStore = useUserStore()
