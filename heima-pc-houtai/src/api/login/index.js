import request from '../request'

//用户登录
export function LoginData(data) {
  return request({
    url: '/mp/v1_0/authorizations',
    method: 'POST',
    data
  })
}