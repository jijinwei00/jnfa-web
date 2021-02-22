import request from './axios'

/**
 * 查找用户列表
 * @param page
 * @returns {AxiosPromise}
 */
export function getUsers(page) {
  return request({
    url: '/user/pageList',
    method: 'post',
    data: {page: page.page, size: page.size}
  })
}
