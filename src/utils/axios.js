
import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
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

  Interceptors (instance) {
    // Add a request interceptor
    instance.interceptors.request.use(config => {
      // Do something before request is sent
      console.log('config:' + config)
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
