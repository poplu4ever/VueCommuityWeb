<template>
    <div class="panel main pd20">
      <div class="msg">Hi Admin, 你已经是我们的正式会员！</div>
      <div class="layui-row layui-col-space20">
        <div class="layui-col-md6">
          <div class="panel border">
            <div class="title">会员信息</div>
            <div class="content">
                <p>你的积分有：{{userInfo.favs}}</p>
                <p>{{userInfo.isVip === '0' ? '非VIP' : 'VIP' + userInfo.isVip}}</p>
            </div>
          </div>
        </div>
        <div class="layui-col-md6">
            <sign class="border"></sign>
        </div>
        <div class="layui-col-md12 mt-20">
          <div class="panel border">
            <div class="title">快捷方式</div>
            <div class="content" style="height: auto;">
              <ul class="layui-row layui-col-space10">
                <li class="layui-col-sm3 layui-col-xs4">
                   <a href="">
                     <div class="layui-icon layui-icon-set shortcut" ></div>
                     <span>修改信息</span>
                   </a>
                </li>
                <li class="layui-col-sm3 layui-col-xs4">
                  <a href="">
                     <div class="layui-icon layui-icon-face-smile shortcut" ></div>
                     <span>修改头像</span>
                   </a>
                </li>
                <li class="layui-col-sm3 layui-col-xs4">
                  <a href="">
                     <div class="layui-icon layui-icon-key shortcut" ></div>
                     <span>修改密码</span>
                   </a>
                </li>
                <li class="layui-col-sm3 layui-col-xs4">
                  <a href="">
                     <div class="layui-icon layui-icon-app shortcut" ></div>
                     <span>账号绑定</span>
                   </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import { getInfo } from '@/api/user'
import Sign from '@/components/sidebar/Sign.vue'
export default {
  name: 'user-centre',
  components: {
    sign: Sign
  },
  data () {
    return {
      favs: 0
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  mounted () {
    // this.favs = this.$store.state.userInfo.favs
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      getInfo({ uid: this.userInfo._id }).then((res) => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', res.data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px){
  .panel {
    &.main {
      margin: 0 !important;
    }
  }
}
.panel {
  color: #333;
  border-radius:2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  transition: all 0.2s;
  &.main {
    margin: 0 0 10px 225px;
  }
}
.msg {
  background-color: #f8f8f8;
  color: #666;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.border {
  border: 1px solid #e6e6e6;
}
.pd20 {
  padding: 20px
}
.title {
  height: 50px;
  padding: 0 15px;
  color: #333;
  line-height: 50px;
  border-bottom: 1px dotted #e9e9e9;
  font-size: 14px;
}
li{
  text-align: center;
  padding: 5px;
}
.content {
  padding: 18px 15px;
  height: 50px;
  line-height: 26px;
  font-size: 14px;
  color: #666;
}
.mt-20 {
  margin-top: -20px;
}
.shortcut {
  background-color: #2f9688;
  width:100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 30px;
}
</style>
