import request from './axios'

/**
 * 查找用户列表
 * @param page
 * @returns {AxiosPromise}
 */
export function getUsers(listQuery) {
  return request({
    url: '/user/pageList',
    method: 'post',
    data: {page: listQuery.page, size: listQuery.size}
  })
}

/**
 * 查找机构列表
 */
export function getOrgs() {
  return request({
    url: '/org/listAll',
    method: 'post'
  })
}

/**
 * 查找角色列表
 */
export function getRoles() {
  return request({
    url: '/role/listAll',
    method: 'post'
  })
}

/**
 * 保存用户
 */
/**
 * 修改或保存权限信息
 * @param data
 * @returns {*}
 */
export function confirmUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data: data,
    dataType: 'json'
  })
}
/**
 * 删除用户信息
 * @param data
 * @returns {*}
 */
export function deleteUser(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'post',
    dataType: 'json'
  })
}
