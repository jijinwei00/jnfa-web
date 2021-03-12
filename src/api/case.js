import request from "./axios";

/**
 * 查找个案信息
 * @param page
 * @returns {AxiosPromise}
 */
export function pageList(listQuery) {
  return request({
    url: '/case/pageList',
    method: 'post',
    data: listQuery
  })
}

/**
 * 个案详情
 * @param listQuery
 * @returns {AxiosPromise}
 */
export function getCaseDetail(id) {
  return request({
    url: `/case/detail/${id}`,
    method: 'post'
  })
}

/**
 * 导出数据到EXCEL
 */
export function exportToExcel(searchForm){
  return request({
    url: '/case/export',
    method: 'post',
    responseType: 'blob',
    data: searchForm
  })
}
