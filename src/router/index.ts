import {
  createRouter,
  createWebHistory,
  RouterLink,
  type RouteRecordRaw
} from 'vue-router'
import { isUserLoggedIn } from '@/auth/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/explore',
    meta: {
      info: 'Welcome!'
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/cpns/LoginDialog.vue'), // 懒加载页面。
    meta: {
      info: 'Login!',
      requiresAuth: false
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
        path: '/explore',
        name: 'explore',
        component: () => import('@/views/main/cpns/Explore.vue')
      },
      {
        path: '/info',
        name: 'info',
        component: () => import('@/views/user/info.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/test.vue')
      },
      {
        path: '/post',
        name: 'post',
        component: () => import('@/views/main/post/post.vue')
      }
    ]
  },

  {
    path: '/:pathMatch(.*)',
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

//前置路由守卫
// router.beforeEach(
//   (
//     to: { matched: any[] },
//     from: any,
//     next: (arg0: string | undefined) => void
//   ) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       if (!isUserLoggedIn()) {
//         next('/login')
//       } else {
//         next()
//       }
//     } else {
//       next()
//     }
//   }
// )

//后置守卫
//reouter.afterEach((to,from)=>{})
//查询参数传参：
// <router-link to="/xxx?key=value&key=value">xxx<Router-link>
//组件内守卫：
//beforeRouteEnter(to,from,next){}在进入组件时被调用
//beforeRouteLeave(to,from,next){}在离开组件前被调用
//接收参数
//$router.query.key
//动态路由传参：
//routes:[{
//       path:'/search/:参数名',
//       component:Search
//       }
//]
//编程式导航(带参数）：
//this.$router.push({
//      path:/xxx
//      query:{
//            参数名：this.xxx
//            参数名：参数值
//            }
//
//
//})
