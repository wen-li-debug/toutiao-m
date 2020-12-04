/**
 *  频道操作
 */
import request from './request'

// 获取所以频道数据
export function getAllChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 添加频道数据
export function addChannels (data) {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

// 删除相应的频道数据
export function delhannels (id) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}
