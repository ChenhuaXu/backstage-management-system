import axios from 'axios'
import appRouter from '../router'
import { getToken } from '@/plugins'
import Vue from 'vue'

/**
 * @description 创建axios实例&配置基本属性
 */
const http = axios.create({
  baseURL: '/api',
  timeout: 1000 * 30,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

/**
 * @description 防止重复提交相同请求&基本设置
 */
const Cancel = axios.CancelToken
let pending = [] // 声明一个array用于存储每个ajax请求的取消函数和ajax标识
let removePending = config => {
  for (let i in pending) {
    // 判断当前请求是否已经存在于数组中
    if (pending[i].u === config.url + '&' + config.method) {
      // 执行取消请求
      pending[i].f()
      // 从数组中移除这条记录
      pending.splice(i, 1)
    }
  }
}

/**
 * @description 请求拦截
 */
http.interceptors.request.use(
  config => {
    // 判断当前网络状态
    if (!navigator.onLine) {
      Vue.prototype.$toast('连接服务器失败，请检查当前网络环境')
      return false
    }
    // 防止重复提交，在发送ajax请求前执行取消操作
    removePending(config)
    config.cancelToken = new Cancel(c => {
      // 用请求地址+请求方式拼接出ajax标识字符串
      pending.push({
        u: config.url + '&' + config.method,
        f: c
      })
    })

    if (getToken()) {
      config.headers.token = getToken()
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * @description 响应拦截
 */
http.interceptors.response.use(
  response => {
    // 在ajax请求响应后执行取消操作，从pending中移除已完成的请求
    removePending(response.config)

    // 状态码拦截
    if (response && response.status === 200) {
      if (response.data && response.data.resultCode === '000000') {
        return response.data
      } else if (response.data && response.data.msg) {
        Vue.prototype.$toast(response.data.msg)
        return
      } else {
        return
      }
    }
    Vue.prototype.$toast('请求失败，请稍后再试。')
  },
  error => {
    // 特殊状态码处理
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      // 鉴定登录状态
      Vue.prototype.$toast('用户登录信息已过期，请重新登录。')
      window.localStorage.clear()
      setTimeout(() => {
        appRouter.replace({ path: '/login' })
      }, 2500)
      return
    } else if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 403
    ) {
      // 鉴定授权状态
      appRouter.replace({ path: '/notFound' })
      return
    } else if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 504
    ) {
      Vue.prototype.$toast('连接服务器超时，请稍后再试。')
      return
    }
    // return Promise.reject(error)
    // 返回空对象防止控制台报错
    return { data: {} }
  }
)

/**
 * @description 导出请求
 * @param {请求方式} methods
 * @param {请求路由} url
 * @param {传参} params
 * @param {额外配置} config
 */
export default function server (
  methods = 'get',
  url = '/',
  params = {}
) {
  // 添加时间戳防止因请求完全相同导致缓存拦截
  params.timeStamp = new Date().getTime()
  let m = methods.toLowerCase()
  switch (m) {
    case 'get':
      return http.get(url, { params })
    case 'post':
      return http.post(url, params)
    case 'put':
      return http.put(url, params)
    case 'delete':
      return http.delete(url, { params })
  }
}