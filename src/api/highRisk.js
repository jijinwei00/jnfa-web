import request from "./axios";

/**
 * 查找高风险底册
 * @param page
 * @returns {AxiosPromise}
 */
export function pageList(listQuery) {
  return request({
    url: '/highRisk/pageList',
    method: 'post',
    data: listQuery
  })
}
/**
 *  导出高风险底册
 * @param page
 * @returns {AxiosPromise}
 */
export function exportToExcel(listQuery) {
  return request({
    url: '/highRisk/export',
    method: 'post',
    data: listQuery
  })
}

