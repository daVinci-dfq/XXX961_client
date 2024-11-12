import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入Pinia。

import App from './App.vue' // 导入根组件（也称App组件）。
import router from './router' // 路由。
// import axios from './service' // 通信。
import 'normalize.css'
import './assets/css/index.less'

import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入Element图标库。

const app = createApp(App)

// 图标。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router) // 安装路由插件。
// app.use(axios)

app.mount('#app') // 将页面渲染到index.html文件中id="app"的元素上。
