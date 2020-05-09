import axios from '../utils/request'

/**
 * Get Verification Code
 * @param {string} sid
 */
const getCode = (sid) => {
  console.log('SID', sid)
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

/**
 *
 * @param {Object} loginInfo
 */
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

/**
 *
 * @param {Object} regInfo
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}

export { getCode, login, reg }
