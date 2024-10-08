import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
    meta: {
      info: 'Welcome!'
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginDialog.vue'), // 懒加载页面。
    meta: {
      info: 'Login!'
    }
  },

  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue'),
    meta: {
      info: 'Main!'
    },
    children: [
      {
        path: 'explore',
        component: () => import('../views/main/cpns/Explore.vue')
      }
    ]
  },

  {
    path: '/pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/NotFound.vue'),
    meta: {
      info: 'Page not found!'
    }
  }
]

const router = createRouter({
  history: createWebHistory(), // 使用history路由。
  routes
})

export default router
