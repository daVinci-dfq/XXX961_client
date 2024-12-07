import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig // 新版本的request的最新类型为InternalAxiosRequestConfig
} from 'axios'

// 定义请求拦截器类型，T为响应数据类型
export interface RequestInterceptors<T = any> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (
    res: AxiosResponse<T>
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>>
  responseInterceptorCatch?: (error: any) => any
}

// 定义请求配置类型。
export interface RequestConfig<T = any> extends AxiosRequestConfig {
  showLoading?: boolean
  interceptors?: RequestInterceptors<T>
}
