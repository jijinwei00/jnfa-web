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
    data: listQuery
  })
}
/**
 * 查找家庭医生列表
 * @param page
 * @returns {AxiosPromise}
 */
export function familyDoctorList() {
  return request({
    url: '/user/doctor/list',
    method: 'post'
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
/**
 * 查找权限节点
 * @returns
 */
export function getPermissionTree() {
  return request({
    url: '/user/permissionTree',
    method: 'post',
    dataType: 'json'
  })
}
/**
 * 查找权限ID
 * @returns
 */
export function getPermissionIds(userId) {
  return request({
    url: `/user/permissionIds/${userId}`,
    method: 'post',
    dataType: 'json'
  })
}
/**
 * 保存权限列表
 * @returns
 */
export function confirmPermission(userId,permissionIds) {
  return request({
    url: `/user/confirmPermission`,
    method: 'post',
    dataType: 'json',
    data: {permissionIds:permissionIds,userId:userId}
  })
}
