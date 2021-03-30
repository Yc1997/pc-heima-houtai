import request from '../request'

//请求用户信息
export function getUser() {
  return request({
    url: '/mp/v1_0/user/profile'
  })
}