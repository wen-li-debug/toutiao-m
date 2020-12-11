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

/**
 *  点击收藏文章
 */
export function addCollect (articelId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articelId
    }
  })
}

/**
 *  取消收藏文章
 */
export function delCollect (articelId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articelId}`
  })
}

/**
 *  点击点赞
 */
export function addLike (articelId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articelId
    }
  })
}

/**
 *  取消点赞
 */
export function delLike (articelId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articelId}`
  })
}
