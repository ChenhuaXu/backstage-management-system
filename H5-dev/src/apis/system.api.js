import server from '@/plugins/axios'

class SystemApi {
  // 用户登录获取token
  userLogin = params => server('get', '/token', params)

  // 获取登录用户信息（含菜单）
  userInfo = params => server('get', '/userInfo', params)

  // 用户更新密码
  updatePassord = params => server('get', '/common', params)

  // 获取可查阅的用户列表
  userList = params => server('get', '/userList', params)

  // 删除用户
  removeUser = params => server('get', '/common', params)

  // 新增用户
  createUser = params => server('get', '/common', params)

  // 修改用户
  updateUser = params => server('get', '/common', params)

  // 获取可绑定的角色列表
  userRoleList = params => server('get', '/userRoleList', params)

  // 获取全部角色列表
  roleList = params => server('get', '/roleList', params)

  // 删除角色
  removeRole = params => server('get', '/common', params)

  // 新增角色
  createRole = params => server('get', '/common', params)

  // 修改角色
  updateRole = params => server('get', '/common', params)

  // 获取可查阅的菜单列表
  menuList = params => server('get', '/menuList', params)
}

export default new SystemApi()