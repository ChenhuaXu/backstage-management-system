import * as types from './mutation-type'
import { setToken, resetState } from '@/utils'

export default {
  mutations: {
    [types.SAVE_TOKEN] (state, payload) {
      state.token = payload
      setToken(payload)
    },
    [types.SAVE_USER_INFO] (state, payload) {
      state.userInfo = payload
    },
    [types.USER_LOGOUT] (state, payload) {
      resetState(state)
      window.localStorage.clear()
    }
  }
}