import axios from 'axios'
import store from '@/store/'
import { Toast } from 'vant'
import router from '@/router'

import jsonBigint from 'json-bigint'

// 创建一个新的请求对象用于更新token
const refRequest = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return jsonBigint.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器给请求加上token
request.interceptors.request.use(config => {
  const { users } = store.state
  // 判断users 是否有值
  if (users) {
    // 添加token
    config.headers.Authorization = `Bearer ${users.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use(res => {
  return res.data
}, async err => {
  // 处理请求失败相应回来不通的状态进行不同处理
  if (err.response.status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端错误,请稍后尝试')
  } else if (err.response.status === 401) {
    // token 过期无效
    // 判断user 和 token是否有值
    const { users } = store.state
    if (!users || !users.token) {
      // 当用户没有登陆，跳转到登陆页面
      refTokenLogin()
      return Promise.reject(err)
    }

    // 已确认token过期，发起请求，获取新的token
    try {
      const { data } = await refRequest({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${users.refresh_token}`
        }
      })
      // 获取到新的token，更新token值
      users.token = data.data.token
      store.commit('setUsers', users)

      // 重新发送原先失败的请求获取数据
      return request(err.config)
    } catch (error) {
      return error
    }
  } else if (err.response.status === 403) {
    // 用户没有权限
    Toast.fail('你权限不够,请联系管理员')
  } else if (err.response.status === 404) {
    // 用户没有登陆，没有权限
    Toast.fail('你权限不够，需要登陆')
  } else if (err.response.status >= 500) {
    // 服务器错误
    Toast.fail('服务器错误,请稍后尝试')
  }

  return Promise.reject(err)
})

// 跳转到登陆界面
function refTokenLogin () {
  router.replace({
    name: 'login',
    // 设置登陆成功后跳转到原先的路径
    query: {
      // toUrl 记录跳转过来的url
      toUrl: router.currentRoute.fullPath
    }
  })
}

export default request
