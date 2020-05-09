import axios from '../utils/request'
import qs from 'qs'

/**
 * Fetch list data from server
 * @param {Object} options
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

/**
 *
 *
 */
const getTips = () => {
  return axios.get('/public/tips')
}

const getTop = () => {
  return axios.get('/public/top')
}

const getLinks = () => {
  return axios.get('/public/links')
}

export {
  getList,
  getTips,
  getTop,
  getLinks
}
