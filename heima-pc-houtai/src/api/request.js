import axios from 'axios'
import { getItem } from '@/utils/Storage'
import JSONbig from 'json-bigint'

//解决后端返回数据中的大数字问题
//超出安全整数范围的 id 无法精确表示，这个问题并不是 axios 的错。
/**
 * 解决思路：

Axios 会在内部使用 JSON.parse 把后端返回的数据转为 JavaScript 数据对象。

所以解决思路就是：不要让 axios 使用 JSON.parse 来转换这个数据，而是使用 json-biginit 来做转换处理。

axios 提供了一个 API：transformResponse

还有需要注意的是：不要使用 13911111111 这个账号来测试删除操作。
为什么？这是后端做了限制，防止你把数据删没了，别人没法测试了，所以使用自己的账户去完整版中添加一些数据然后来到开发版中进行测试。
 */

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  timeout: 5000,
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)

    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]

})

// Add a request interceptor
request.interceptors.request.use(config => {
  // Do something before request is sent
  let token = getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
export default request
