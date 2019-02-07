import { setToken, resetState } from '@/plugins'

const types = {
  SAVE_TOKEN: 'SAVE_TOKEN',
  SAVE_USER_INFO: 'SAVE_USER_INFO',
  USER_LOGOUT: 'USER_LOGOUT'
}

const initState = {}

export default {
  state: {
    ...initState,
    initState
  },
  getters: {
    userInfo: state => state.userInfo
  },
  mutations: {
    [types.SAVE_TOKEN] (state, payload) {
      state.token = payload
      setToken(payload)
    },
    [types.SAVE_USER_INFO] (state, payload) {
      state.userInfo = payload
    },
    [types.USER_LOGOUT] (state) {
      resetState(state)
      window.localStorage.clear()
    }
  },
  actions: {
    saveToken ({commit}, payload) {
      commit(types.SAVE_TOKEN, payload)
    },
    saveUserInfo ({commit}, payload) {
      commit(types.SAVE_USER_INFO, payload)
    },
    userLogout ({commit}, payload) {
      commit(types.USER_LOGOUT, payload)
    }
  }
}