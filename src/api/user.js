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

/**
 *  关注用户
 */
export function addFollow (userId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
/**
 *  取消关注
 */
export function delFollow (userId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 *  获取用户个人资料
 */
export function getUserProfile () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

/**
 *  修改用户个人资料
 */
export function UpdateUserProfile (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

/**
 *  修改用户头像资料
 */
export function UpdateUserPhoto (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
