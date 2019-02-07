import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import App from './App.vue'

import * as filters from './plugins/filter'
import { isProd, getToken } from './plugins'
import router from './router'
import store from './store'

import './assets/style/base.css'
import './assets/style/common.css'
import './assets/style/global.less'

import './plugins/vuetify'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false

/**
 * @description 添加全局过滤器
 */
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

/**
 * @description vuex日志
 */
const appLogger = createLogger({
  collapsed: false,
  transformer (state) {
    return state.subTree
  },
  mutationTransformer (mutation) {
    return mutation.type
  },
  logger: console
})

/**
 * @description vuex持久化
 */
export const appStore = new Vuex.Store({
  ...store,
  strict: !isProd(),
  plugins: isProd() ? [createPersistedState()] : [appLogger, createPersistedState()]
})

/**
 * @description route前置守卫
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (getToken()) {
      next({ path: '/index' })
    } else {
      next()
    }
  } else {
    if (getToken()) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

new Vue({
  router,
  store: appStore,
  render: h => h(App),
}).$mount('#app')
