import Cookies from 'js-cookie'

//App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus)

//User
const storeId = 'storeId'
export const getStoreId = () => Cookies.get(storeId)
export const setStoreId = (id: string) => Cookies.set(storeId, id)
export const removeStoreId = () => Cookies.remove(storeId)

//uerInfo

const userInfoKey = 'userInfo'
export const getUserInfo = () => Cookies.get(userInfoKey)
export const setUserInfo = (useInfor: Object) =>
  Cookies.set(userInfoKey, String(useInfor))
export const removeUserInfo = () => Cookies.remove(userInfoKey)
