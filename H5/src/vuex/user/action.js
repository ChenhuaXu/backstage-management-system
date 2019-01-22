import * as types from './mutation-type'

export default {
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