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
/**
 * 获取指定文章
 */
export const getAssignArticle = articleId => {
  return request({
    method: 'GET',
    // 接口文档中的写的路径参数需要在 url 中传递
    // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
    url: `/mp/v1_0/articles/${articleId}`
  })
}
/**
 * 发布文章
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    // 接口文档中的写的路径参数需要在 url 中传递
    // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
    url: '/mp/v1_0/articles',
    data,
    params: {
      draft
    }
  })
}
/**
 * 编辑文章
 */
export const editArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    // 接口文档中的写的路径参数需要在 url 中传递
    // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
    url: `/mp/v1_0/articles/${articleId}`,
    data,
    params: {
      draft
    }
  })
}
/**
 * 修改文章评论状态
 */
export const changeArticleStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    // 接口文档中的写的路径参数需要在 url 中传递
    // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}