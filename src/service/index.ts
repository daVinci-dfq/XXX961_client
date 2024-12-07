import Request from './Request' // 导入Request类
import { BASE_URL, TIME_OUT } from './Request/config' // 导入配置常量

/**
 * @author daVinci
 * @description 封装后的请求类。
 */
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    requestInterceptor: (config) => {
      const token = ''
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      console.log('Request intercepte success')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('Request intercepte fail')
      return err
    },
    responseInterceptor: (res) => {
      console.log('Response intercepte success')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('Response intercepte fail')
      return err
    }
  }
})

export default request
