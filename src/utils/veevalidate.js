import { extend, localize } from 'vee-validate'
import { required, email, min, length, confirmed, max } from 'vee-validate/dist/rules'

import zh from 'vee-validate/dist/locale/zh_CN'

extend('email', email)
extend('required', required)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)
extend('max', max)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '用户名',
    username: '用户名',
    password: '密码',
    code: '验证码'
  }
})
