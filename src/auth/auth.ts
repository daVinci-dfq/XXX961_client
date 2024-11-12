//用户权限管理文件

export function isUserLoggedIn() {
  const cookies = document.cookie.split(';')
  const userCookie = cookies.find((c) => c.trim().startsWith('user='))
  return userCookie !== undefined
}
