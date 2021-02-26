import request from './axios'

/**
 * 查找文章列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getArticles(data) {
  return request({
    url: '/article/pageList',
    method: 'POST',
    data: data
  })
}

/**
 * 修改或保存文章
 * @param data
 * @returns {*}
 */
export function confirmArticle(data) {
  return request({
    url: '/article/save',
    method: 'post',
    data: data,
    dataType: 'json'
  })
}

/**
 * 删除文章
 * @param data
 * @returns {*}
 */
export function deleteArticle(id) {
  return request({
    url: `/article/delete/${id}`,
    method: 'post',
    dataType: 'json'
  })
}

/**
 * 查找最近的两篇文章
 * @param data
 * @returns {*}
 */
export function top2() {
  return request({
    url: `/article/top2`,
    method: 'post',
    dataType: 'json'
  })
}

/**
 * 文章详情
 * @param data
 * @returns {*}
 */
export function detail(id) {
  return request({
    url: `/article/detail/${id}`,
    method: 'post',
    dataType: 'json'
  })
}
