import axios, { type AxiosInstance } from 'axios'
import type { RequestConfig, RequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { DEFAULT_LOADING } from './config'

/**
 * @author: daVinci
 * @description: 封装axios请求类。
 */
export default class Request<T = any> {
  // 请求实例
  instance: AxiosInstance
  interceptors?: RequestInterceptors<T> // 指定拦截器类型

  showLoading?: boolean // 是否显示loading
  loading?: any // loading组件实例

  constructor(config: RequestConfig<T>) {
    this.instance = axios.create(config) // 创建axios实例

    // 是否显示加载进度
    this.showLoading =
      config.showLoading === undefined ? DEFAULT_LOADING : config.showLoading

    // 从config中取出拦截器
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          // 以服务方式调用，由于创建的loading是单例，因此调用多次也不会创建多个。
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.5)',
            fullscreen: true
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<T, T>(config)
        // then这里获取的res类型是T，而不是AxiosResponse<T>，因为在拦截器中已经对res进行了处理。
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
        .finally(() => {
          this.showLoading = DEFAULT_LOADING // 重置showLoading，避免影响下一次请求。
        })
    })
  }

  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}
