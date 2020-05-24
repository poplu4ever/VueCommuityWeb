
import axios from 'axios'
import errorHandle from './errorHandle'
const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
    this.pending = {} // global variable to store request log
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseURL,
      header: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  Interceptors (instance) {
    // Add a request interceptor
    instance.interceptors.request.use(config => {
      // Do something before request is sent
      const key = config.url + '&' + config.method
      console.log('KEYCHECK:' + key)
      this.removePending(key, true)
      config.cancelToken = new CancelToken((c) => {
        this.pending[key] = c
      })
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    // Add a response interceptor
    instance.interceptors.response.use(res => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      console.log('res is:' + res)
      const key = res.config.url + '&' + res.config.method
      this.removePending(key)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, err => {
      errorHandle(err)
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(err)
    })
  }

  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.Interceptors(instance)
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
