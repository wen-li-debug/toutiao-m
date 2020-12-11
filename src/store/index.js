import Vue from 'vue'
import Vuex from 'vuex'

import { getUsers, setUser } from '@/utils/storeage'

Vue.use(Vuex)

// 设置一个常量来保存本来存储的key
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 保存token 值 ,使用vuex来保存token，可以方便与响应式绑定
    users: getUsers(USER_KEY),
    cachePages: [] // 用于来控制组件缓存
  },
  mutations: {
    setUsers (state, data) {
      state.users = data
      // 还是需要放到本地存储中去
      setUser(USER_KEY, state.users)
    },
    // 添加缓存的组件
    addCachePages (state, pageName) {
      // 先判断缓存中是否有需要添加的值
      if (state.cachePages.indexOf(pageName === -1)) {
        state.cachePages.push(pageName)
      }
    },
    // 删除缓存的组件
    delCachePages (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
