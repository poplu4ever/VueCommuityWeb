<template>
  <div class="layui-container fly-marginTop">
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title">
        <li class="layui-this">登入</li>
        <li>
          <router-link :to="{name: 'reg'}">注册</router-link>
        </li>
      </ul>
      <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
        <validation-observer ref="observer" v-slot="{ validate }">
          <div class="layui-tab-item layui-show">
          <div class="layui-form layui-form-pane">
            <form method="post">
              <div class="layui-form-item">
                <label for="L_email" class="layui-form-label">用户名</label>
                <validation-provider rules="required|email" v-slot="{errors}">
                  <div class="layui-input-inline">
                  <input
                    type="text"
                    name="email"
                    v-model="username"
                    placeholder='请输入用户名'
                    autocomplete="off"
                    class="layui-input"/>
                 </div>
                 <div class="layui-form-mid">
                  <span style="color: #c00;">{{errors[0]}}</span>
                </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <label for="L_pass" class="layui-form-label">密码</label>
                <validation-provider rules="required|min:6" v-slot="{errors}">
                  <div class="layui-input-inline">
                  <input
                    type="password"
                    name="密码"
                    v-model="password"
                    placeholder="请输入密码"
                    autocomplete="off"
                    class="layui-input"/>
                </div>
                 <div class="layui-form-mid">
                  <span style="color: #c00;">{{errors[0]}}</span>
                </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider ref="codefield" rules="required|length:4" v-slot="{errors}">
                <div class="layui-row">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                    <input
                      type="text"
                      name="验证码"
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
                </div>
                <div class="layui-form-mid">
                  <span
                    class='svg' style="color: #c00;"
                    >{{errors[0]}}
                  </span>
                </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <button class="layui-btn" type="button" lay-filter="*" lay-submit @click="validate().then(submit)">立即登录</button>
                <span style="padding-left:20px;">
                  <router-link :to="{name: 'forget'}">忘记密码</router-link>
                </span>
              </div>
              <div class="layui-form-item fly-form-app">
                <span>或者使用社交账号登入</span>
                <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
              </div>
            </form>
          </div>
        </div>
        </validation-observer>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, login } from '@/api/login'
import uuid from 'uuid/v4'
export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    // window.vue = this
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    console.log(sid)
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
      console.log('Test submit')
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          res.data.username = this.username
          this.$store.commit('setUserInfo', res.data)
          this.$store.commit('setIsLogin', true)
          this.$store.commit('setToken', res.token)
          this.username = ''
          this.password = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          this.$router.push({ name: 'index' })
          // console.log(res)
        } else if (res.code === 401) {
          this.$refs.codefield.setErrors([res.msg])
        }
      }).catch((err) => {
        console.log('err', err)
        if (err.code === 404) {
          this.$alert('用户名密码校验失败')
        } else {
          this.$alert('服务器错误')
        }
      })
    }
  }
}
</script>

<style scoped>
  .svg {
    position:relative;
    top: -10px;
  }
</style>
