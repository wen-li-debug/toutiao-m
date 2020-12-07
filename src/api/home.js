import request from './request'

/**
 * 获取用户频道列表
 */
export function getUserChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 * 获取文章列表
 */
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 *  文章数据
 */
export function getArticelId (articelId) {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articelId}`
  })
}
