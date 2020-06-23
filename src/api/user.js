import axios from '@/utils/request'

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

export {
  userSign,
  updateUserInfo
}
