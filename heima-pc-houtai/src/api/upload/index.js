import request from '../request'

//上传用户图片素材
export const uploadImage = (data) => {
  return request({
    url: '/mp/v1_0/user/images',
    method: 'POST',
    data
  })
}

// 获取用户图片素材
export const getUserImage = (params) => {
  return request({
    url: '/mp/v1_0/user/images',
    method: 'GET',
    params
  })
}

// 用户收藏素材
export const userCollectImage = (imageId, collect = false) => {
  return request({
    url: `/mp/v1_0/user/images/${imageId}`,
    method: 'PUT',
    data: {
      collect
    }
  })
}

// 用户删除素材
export const userDeleteImage = (imageId) => {
  return request({
    url: `/mp/v1_0/user/images/${imageId}`,
    method: 'DELETE'
  })
}
