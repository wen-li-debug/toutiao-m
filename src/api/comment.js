/**
 *  评论数据
 */
import request from './request'
/**
 *  获取评论和评论回复
 */
export function getComment (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

/**
 *  对评论或者评论回复点赞
 */
export function addCommentLike (target) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

/**
 *  对评论或者评论回复取消点赞
 */
export function delCommentLike (commentId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
/**
 * 添加评论和评论回复
 */
export function addComment (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
