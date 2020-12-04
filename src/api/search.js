/**
 *  搜索操作
 */
import request from './request'

// 获取联系建议数据
export function getSearchSuggestion (q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索到的结果数据
export function getSearchResult (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
