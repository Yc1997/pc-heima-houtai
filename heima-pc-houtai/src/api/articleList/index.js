import request from '../request'

//获取文章列表
export function getArticle(params) {
  // let { page, per_page, status, channel_id, begin_pubdate, end_pubdate } = params
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

//获取文章频道
export function getChannels(params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels',
    // params: { page: params.page, per_page: params.per_page, status: params.status }
  })
}

/**
 * 删除文章
 */
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    // 接口文档中的写的路径参数需要在 url 中传递
    // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
    url: `/mp/v1_0/articles/${articleId}`
  })
}