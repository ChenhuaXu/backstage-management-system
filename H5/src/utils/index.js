import Vue from 'vue'

const APP_TOKEN = 'TOKEN'

// 判断生产环境
export const isProd = () => process.env.NODE_ENV === 'production'

// localStorage读写
export const ls = {
  set (key, value) {
    if (!key || !value) return
    window.localStorage[key] = JSON.stringify(value)
  },
  get (key) {
    if (!key) return null
    const _key = window.localStorage[key]
    if (!_key) return null
    return JSON.parse(_key)
  }
}

// 读取token
export const getToken = () => ls.get(APP_TOKEN)

// 存储token
export const setToken = token => ls.set(APP_TOKEN, token)

// 判断登录态
export const checkLogin = () => !!getToken()

// 重置默认的vuex
export function resetState (state) {
  if (state['initState']) {
    for (let key in state) {
      if (key !== 'initState') {
        Vue.delete(state, key)
      }
    }
    let { keys } = Object
    for (let key of keys(state['initState'])) {
      Vue.set(state, key, state['initState'][key])
    }
  } else {
    return false
  }
}
