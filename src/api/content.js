import axios from '../utils/request'
import qs from 'qs'
import store from '@/store'

/**
 * Fetch list data from server
 * @param {Object} options
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/**
 * Fetch tips data from server
 */
const getTips = () => {
  return axios.get('/public/tips')
}

const getTop = () => {
  return axios.get('/public/topWeek')
}

const getLinks = () => {
  return axios.get('/public/links')
}

const addPost = (data) => {
  return axios.post('/content/add', { ...data })
}

const getDetail = (tid) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail?tid=' + tid, headers)
}

const updatePost = (data) => {
  return axios.post('/content/update', { ...data })
}

/**
 * Upload user image
 * @param {Object} formData
 */
const uploadImg = (formData) => axios.post('/content/upload', formData)

export {
  getList,
  getTips,
  getTop,
  getLinks,
  uploadImg,
  addPost,
  updatePost,
  getDetail
}
