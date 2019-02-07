import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      name: 'login',
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "login" */ '../pages/common/Login.vue')
    },
    {
      name: 'index',
      path: '/index',
      meta: {
        title: '主页'
      },
      component: () =>
        import(/* webpackChunkName: "index" */ '../pages/index.vue'),
      children: [
        {
          name: 'userManage',
          path: '/userManage',
          meta: {
            title: '用户管理'
          },
          component: () =>
            import(/* webpackChunkName: "system" */ '../pages/system/UserManage.vue')
        },
        {
          name: 'roleManage',
          path: '/roleManage',
          meta: {
            title: '角色管理'
          },
          component: () =>
            import(/* webpackChunkName: "system" */ '../pages/system/RoleManage.vue')
        },
        {
          name: 'readMe',
          path: '/readMe',
          meta: {
            title: '项目说明'
          },
          component: () =>
            import(/* webpackChunkName: "readMe" */ '../pages/common/ReadMe.vue')
        }
      ]
    }
  ]
})