import request from "./axios";

/**
 * 查找随访计划
 * @param page
 * @returns {AxiosPromise}
 */
export function planPageList(listQuery) {
  return request({
    url: '/followUp/plan/pageList',
    method: 'post',
    data: listQuery
  })
}
/**
 * 导出随访计划到EXCEL
 */
export function exportPlanToExcel(searchForm){
  return request({
    url: '/followUp/plan/export',
    method: 'post',
    responseType: 'blob',
    data: searchForm
  })
}
/**
 * 查找随访任务
 * @param page
 * @returns {AxiosPromise}
 */
export function taskPageList(listQuery) {
  return request({
    url: '/followUp/task/pageList',
    method: 'post',
    data: listQuery
  })
}
/**
 * 导出随访任务到EXCEL
 */
export function exportTaskToExcel(searchForm){
  return request({
    url: '/followUp/task/export',
    method: 'post',
    responseType: 'blob',
    data: searchForm
  })
}


