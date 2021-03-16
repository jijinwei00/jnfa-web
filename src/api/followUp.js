import request from "./axios";

/**
 * 查找高风险底册
 * @param page
 * @returns {AxiosPromise}
 */
export function pageList(listQuery) {
  return request({
    url: '/followUp/plan/pageList',
    method: 'post',
    data: listQuery
  })
}
/**
 * 导出数据到EXCEL
 */
export function exportToExcel(searchForm){
  return request({
    url: '/followUp/plan/export',
    method: 'post',
    responseType: 'blob',
    data: searchForm
  })
}


