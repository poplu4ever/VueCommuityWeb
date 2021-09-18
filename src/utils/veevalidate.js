import { extend, localize } from 'vee-validate'
// eslint-disable-next-line
import { required, email, min, length, confirmed, max, is_not} from 'vee-validate/dist/rules'

import zh from 'vee-validate/dist/locale/zh_CN'

extend('email', email)
extend('required', required)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)
extend('max', max)
extend('is_not', is_not)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '用户名',
    username: '用户名',
    password: '密码',
    code: '验证码',
    oldpassword: '旧密码',
    title: '标题',
    catalog: '分类'
  },
  // 针对不同的name，定义不同的message
  fields: {
    catalog: {
      is_not: '请选择{_field_}'
    },
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}'
    },
    password: {
      confirmed: (field) => {
        return `两次输入的${field}不一致`
      }
    }
  }
})
