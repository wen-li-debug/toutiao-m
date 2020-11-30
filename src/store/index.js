import Vue from 'vue'
import Vuex from 'vuex'

import { getUsers, setUser } from '@/utils/storeage'

Vue.use(Vuex)

// 设置一个常量来保存本来存储的key
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 保存token 值 ,使用vuex来保存token，可以方便与响应式绑定
    users: getUsers(USER_KEY)
  },
  mutations: {
    setUsers (state, data) {
      state.users = data
      // 还是需要放到本地存储中去
      setUser(USER_KEY, state.users)
    }
  },
  actions: {
  },
  modules: {
  }
})
