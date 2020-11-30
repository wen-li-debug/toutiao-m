/**
 * 用户相关的模块
 */
import request from './request'

/**
 * 登录注册
 */
export function login (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送验证码
 */
export function sendMs (mobile) {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 *  获取用户信息
 */
export function getUsers () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
