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
      component: () => import(/* webpackChunkName: "login" */ '../views/common/Login.vue')
    },
    {
      name: 'index',
      path: '/index',
      component: () => import(/* webpackChunkName: "index" */ '../views/index.vue'),
      children: [
        {
          name: 'userManage',
          path: '/userManage',
          component: () => import(/* webpackChunkName: "systemManage" */ '../views/systemManage/UserManage.vue')
        },
        {
          name: 'roleManage',
          path: '/roleManage',
          component: () => import(/* webpackChunkName: "systemManage" */ '../views/systemManage/RoleManage.vue')
        }
      ]
    }
  ]
})
