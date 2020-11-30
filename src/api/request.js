import axios from 'axios'
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器给请求加上token
request.interceptors.request.use(config => {
  const { users } = store.state
  // 判断users 是否有值
  if (users) {
    // 添加token
    config.headers.Authorization = `Bearer ${store.state.users.token}`
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
