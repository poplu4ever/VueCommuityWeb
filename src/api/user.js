import axios from '@/utils/request'
import qs from 'qs'

/**
 * User Sign
 */
const userSign = () => {
  // const headers = {
  //   Authorization: 'Bearer ' + store.state.token,
  //   'Content-Type': 'application/json'
  // }
  return axios.get('/user/fav')
}

/**
 * Update Userinfo
 * @param {object} data
 */
const updateUserInfo = (data) => {
  return axios.post('/user/basic', data)
}

/**
 * Update Password
 * @param {object} data
 */
const changePassword = (data) => {
  return axios.post('/user/change-password', data)
}

/**
 * Add Collection
 * @param {object} data
 */
const addCollect = (data) => {
  return axios.get('/user/set-collect?' + qs.stringify(data))
}

/**
 * Get Collection List
 */
const getCollect = (data) => {
  return axios.get('/user/collect?' + qs.stringify(data))
}

const getPostListByUid = (data) => {
  return axios.get('/user/post?' + qs.stringify(data))
}

const deletePostByUid = (data) => {
  return axios.get('/user/delete-post?' + qs.stringify(data))
}

const getInfo = (data) => {
  return axios.get('/public/info?' + qs.stringify(data))
}

const getCommentList = (data) => {
  return axios.get('/public/latest-comment?' + qs.stringify(data))
}

// Fetch user unread message
const getMsg = (data) => {
  return axios.get('/user/getmsg?' + qs.stringify(data))
}

const setMsg = (data) => {
  return axios.get('/user/setmsg?' + qs.stringify(data))
}

export {
  userSign,
  updateUserInfo,
  changePassword,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid,
  getInfo,
  getCommentList,
  getMsg,
  setMsg
}
