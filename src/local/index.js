import { Validator } from 'vee-validate'

const dictionary = {
    'zh-CN': {
      messages: {
        required: field => '请输入' + field,
        email: () => '请输入正确的邮箱格式'
      }
    }
}