import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import { useUserStore } from '@/stores/modules/userStore'
import router from '@/router'
import { ElMessage } from 'element-plus'

class HttpService {
  public http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:6539',
      timeout: 5000,
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    })

    // axios请求拦截器
    this.http.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const userStore = useUserStore()
        if (userStore.getToken()) {
          config.headers.accessToken = userStore.getToken()
          config.headers.userId = userStore.getUserInfo().id
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    // axios响应拦截器
    this.http.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        if (error.response && error.response.status === 401) {
          ElMessage({
            type: 'warning',
            message: error.response.data.error
          })
          const userStore = useUserStore()
          userStore.userLogout()
          router.replace('/')
        }
        if (error.response && error.response.status === 404) {
          router.replace('/NotFound')
        }
        if (error.response && error.response.status === 403) {
          ElMessage({
            type: 'warning',
            message: error.response.data.error
          })
          router.replace('/login')
        }
        return Promise.reject(error)
      }
    )
  }

  getAxiosInstance(): AxiosInstance {
    return this.http
  }
}

const httpService = new HttpService()
export default httpService
