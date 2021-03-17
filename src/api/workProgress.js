import request from "./axios";

/**
 * 风险底册进度
 */
export function riskProgress() {
  return request({
    url: '/progress/riskProgress',
    method: 'post'
  })
}
/**
 * 治疗方案进度
 */
export function therapyProgress() {
  return request({
    url: '/progress/therapyProgress',
    method: 'post'
  })
}
/**
 * 随访计划进度
 */
export function followupProgress() {
  return request({
    url: '/progress/followupProgress',
    method: 'post'
  })
}

