<template>
    <div class="layui-container fly-marginTop">
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title">
        <li>
          <router-link :to="{name: 'login'}">登陆</router-link>
        </li>
        <li class="layui-this">注册</li>
      </ul>
      <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
        <div class="layui-tab-item layui-show">
          <validation-observer name="username" ref="observer" v-slot="{ validate }">
            <div class="layui-form layui-form-pane">
            <form method="post">
              <validation-provider rules="required|email" v-slot="{errors}">
              <div class="layui-form-item">
                <label for="L_email" class="layui-form-label">用户名</label>
                    <div class="layui-input-inline">
                    <input
                      type="text"
                      name="username"
                      v-model="username"
                      placeholder="请输入用户名"
                      autocomplete="off"
                      class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">
                    将会成为你唯一的登录名
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
              </div>
              </validation-provider>
              <div class="layui-form-item">
              <label for="L_username" class="layui-form-label">昵称</label>
              <validation-provider name="name" rules="required|min:4" v-slot="{errors}">
                <div class="layui-input-inline">
                  <input
                    type="text"
                    name="name"
                    placeholder="请输入昵称"
                    v-model="name"
                    autocomplete="off"
                    class="layui-input">
                </div>
                <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                </div>
              </validation-provider>
            </div>
              <div class="layui-form-item">
                <validation-provider name="password" rules="required|min:6|max:16|confirmed:confirmation" v-slot="{errors}">
                   <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                  <input
                    type="password"
                    placeholder="请输入密码"
                    name="password"
                    v-model="password"
                    autocomplete="off"
                    class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider vid="confirmation" v-slot="{ errors }">
                   <label for="L_repass" class="layui-form-label">确认密码</label>
                   <div class="layui-input-inline">
                     <input
                        type="password"
                        name="repassword"
                        v-model="repassword"
                        autocomplete="off"
                        class="layui-input">
                   </div>
                   <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider rules="required|length:4" v-slot="{ errors }">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <input
                      type="text"
                      name="code"
                      v-model="code"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      class="layui-input">
                  </div>
                  <div class="layui-form-mid">
                    <span
                      class='svg'
                      style="color: #c00;"
                      v-html="svg"
                      @click="_getCode()">
                    </span>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <button class="layui-btn" type="button" @click="validate().then(submit)">立即注册</button>
              </div>
              <div class="layui-form-item fly-form-app">
                <span>或者直接使用社交账号快捷注册</span>
                <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
              </div>
            </form>
          </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, reg } from '@/api/login'
export default {
  name: 'reg',
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      reg({
        username: this.username,
        name: this.name,
        password: this.password,
        repassword: this.repassword,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.name = ''
          this.password = ''
          this.repassword = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // router to login page
          this.$router.push('/login')
          console.log(res)
        } else {
          this.$refs.observer.setErrors([res.msg])
        }
      })
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  }
}
</script>

<style scoped>
  .svg {
    position:relative;
    top: -10px;
  }
</style>
