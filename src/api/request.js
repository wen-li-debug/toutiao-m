import axios from 'axios'
import store from '@/store/'

import jsonBigint from 'json-bigint'

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
}, err => {
  return Promise.reject(err)
})

export default request
