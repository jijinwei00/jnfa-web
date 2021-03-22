import request from "./axios";

/**
 * 风险底册进度
 */
export function riskProgress(searchForm) {
  return request({
    url: '/progress/riskProgress',
    method: 'post',
    data: searchForm
  })
}
/**
 * 治疗方案进度
 */
export function therapyProgress(searchForm) {
  return request({
    url: '/progress/therapyProgress',
    method: 'post',
    data: searchForm
  })
}
/**
 * 随访计划进度
 */
export function followupProgress(searchForm) {
  return request({
    url: '/progress/followupProgress',
    method: 'post',
    data: searchForm
  })
}

