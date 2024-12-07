import httpService from '@/service/HttpService'
// 登录
export const login = ({
  username,
  password
}: {
  username: string
  password: string
}) => {
  return httpService.http({
    url: '/login/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username,
      password
    }
  })
}

/**
 * 注册
 *
 */
export const getEmail = {
  async getEmailCode(data: {
    email: string
  }): Promise<{ code: number; message: string }> {
    try {
      const response = await httpService
        .getAxiosInstance()
        .get('/user/code', { params: data })
      return response.data
    } catch (error) {
      console.error('Error fetching email code:', error)
      throw error
    }
  }
}
export const Register = ({
  email,
  username,
  password
}: {
  email: string
  username: string
  password: string
}) => {
  return httpService.http({
    url: '/register/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username,
      password,
      email
    }
  })
}
