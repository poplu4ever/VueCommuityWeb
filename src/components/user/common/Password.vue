<template>
    <div>
        <!-- Change Password -->
          <div class="layui-form layui-form-pane layui-tab-item layui-show">
            <form >
              <validation-observer ref="observer" v-slot="{ validate }">
              <div class="layui-form-item">
                <validation-provider
                    name="oldpassword"
                    rules="required|min:6|max:16"
                    v-slot="{ errors }">
                <label for="L_nowpass" class="layui-form-label">当前密码</label>
                <div class="layui-input-inline">
                  <input
                     type="password"
                     name="nowpass"
                     v-model="oldpassword"
                     class="layui-input">
                </div>
                <div class="layui-row">
                    <span style="color: #c00;">{{errors[0]}}</span>
                </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider
                    name="password"
                    rules="required|min:6|max:16|confirmed:confirmation"
                    v-slot="{ errors }">
                <div class="layui-row">
                  <label for="L_pass" class="layui-form-label">新密码</label>
                <div class="layui-input-inline">
                  <input
                    type="password"
                    name="pass"
                    v-model="password"
                    class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                </div>
                <div class="layui-row">
                    <span style="color: #c00;">{{errors[0]}}</span>
                </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider
                   vid="confirmation"
                   v-slot="{ errors }">
                 <div class="layui-row">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="repass"
                        v-model="repassword"
                        class="layui-input">
                    </div>
                 </div>
                 <div class="layui-row">
                    <span style="color: #c00;">{{errors[0]}}</span>
                </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <button class="layui-btn" @click="validate().then(submit)" key="set-mine">确认修改</button>
              </div>
              </validation-observer>
            </form>
          </div>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changePassword } from '@/api/user'
export default {
  name: 'password',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      oldpassword: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.oldpassword === this.password) {
        this.$alert('The new password cannot be the same as the current one')
        return
      }
      debugger
      changePassword({
        oldpwd: this.oldpassword,
        newpwd: this.password
      }).then((res) => {
        if (res.code === 200) {
          this.$alert('Password Update Successfully')
          this.oldpassword = ''
          this.password = ''
          this.repassword = ''
          requestAnimationFrame(() => {
            this.$$refs.observer.reset()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
