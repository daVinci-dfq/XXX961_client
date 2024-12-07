import httpService from '@/service/HttpService'
/**
 * 获取树形分类数据
 * @returns 分类数据
 */
export const getCategoryTreeData = () => {
  return httpService.http<any>({
    url: '/platform/category/getCategoryTreeData',
    method: 'get'
  })
}
