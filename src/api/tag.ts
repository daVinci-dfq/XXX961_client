import httpService from '@/service/HttpService'
import request from '@/service/HttpService'

/**
 *
 * @param currentPage
 * @param pageSize
 * @param keyword
 * @returns
 */
export const getPageTagByKeyword = (
  currentPage: number,
  pageSize: number,
  keyword: string
) => {
  return httpService.http<any>({
    url: `/platform/tag/getPageTagByKeyword/${currentPage}/${pageSize}`, // mock接口
    method: 'get',
    params: {
      keyword
    }
  })
}
