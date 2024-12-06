import httpService from '@/service/HttpService'
import axios from 'axios'

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

// 访问用户主页
export const queryUserIndex = ({ id }: { id: string }) => {
  return httpService.http({
    url: '/info/', //###################################
    method: 'POST',
    data: {
      id
    }
  })
}

// 上传帖子
export const uploadPost = (data: any) => {
  return httpService.http({
    url: '/upload/info/',
    method: 'POST',
    data: data
  })
}

// 帖子详情
export const postDetail = ({ id }: { id: number }) => {
  return httpService.http({
    url: '/post/detail/',
    method: 'POST',
    data: {
      id
    }
  })
}

// 主页帖子
export const queryPost = ({
  offset,
  query
}: {
  offset: number
  query: string | string[]
}) => {
  return httpService.http({
    url: '/post/',
    method: 'POST',
    data: { offset, query }
  })
}

// 评论帖子
export const doComment = ({ data }: { data: any }) => {
  return httpService.http({
    url: '/comment/',
    method: 'POST',
    data: data
  })
}

// 用户关注
export const doFocus = ({ id }: { id: number }) => {
  return httpService.http({
    url: '/focus/',
    method: 'POST',
    data: { id }
  })
}

// 获取用户关注
export const queryUserFocus = () => {
  return httpService.http({
    url: '/user/focus/'
  })
}

export const unFollow = ({ id }: { id: number }) => {
  return httpService.http({
    url: '/user/unfollow/',
    method: 'POST',
    data: { id }
  })
}

export const updateUserInfo = ({
  username,
  signature
}: {
  username: string
  signature: string
}) => {
  return httpService.http({
    url: '/user/update/',
    method: 'POST',
    data: {
      username,
      signature
    }
  })
}

export const queryUserPost = ({
  user_id,
  types,
  offset
}: {
  user_id: number
  types: string
  offset: number
}) => {
  return httpService.http({
    url: '/user/post/',
    method: 'POST',
    data: {
      user_id,
      types,
      offset
    }
  })
}

export const controlUserCollectOrLike = ({
  post_id,
  operator,
  type
}: {
  post_id: number
  operator: any
  type: string
}) => {
  return httpService.http({
    url: '/post/control/',
    method: 'POST',
    data: {
      post_id,
      type,
      operator
    }
  })
}

export const getComment = ({ id, offset }: { id: number; offset: number }) => {
  return httpService.http({
    url: '/comment/main/',
    method: 'POST',
    data: {
      id,
      offset
    }
  })
}

export const queryUserPostControl = ({
  offset,
  types
}: {
  offset: number
  types: string
}) => {
  return httpService.http({
    url: '/user/post/control/',
    method: 'POST',
    data: {
      offset,
      types
    }
  })
}

export const postDelete = ({ id }: { id: number }) => {
  return httpService.http({
    url: '/post/delete/',
    method: 'POST',
    data: {
      id
    }
  })
}

export const removeFan = ({ id }: { id: number }) => {
  return httpService.http({
    url: '/user/remove/fan/',
    method: 'POST',
    data: {
      id
    }
  })
}

export const loadReplies = ({ id, offset }: { id: number; offset: number }) => {
  return httpService.http({
    url: '/comment/reply/',
    method: 'POST',
    data: {
      id,
      offset
    }
  })
}
