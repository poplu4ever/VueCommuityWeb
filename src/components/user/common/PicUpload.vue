<template>
    <div>
         <!-- Upload Avatar -->
          <div class="layui-form layui-form-pane layui-tab-item layui-show">
            <div class="layui-form-item">
              <div class="avatar-add">
                <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
                <label for="pic" class="layui-btn upload-img">
                  <i class="layui-icon">&#xe67c;</i>上传头像
                </label>
                <input id="pic"
                       type="file"
                       name="file"
                       accept="image/png, image/gif, image/jpg"
                       @change="upload($event)">
                <img :src="pic">
                <span class="loading"></span>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import config from '@/config'
import { uploadImg } from '@/api/content'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'pic-upload',
  data () {
    return {
      // check whether userinfo & pic exist
      pic: (this.$store.state.userInfo && this.$store.state.userInfo.pic) ? this.$store.state.userInfo.pic : '/img/Neolu.png',
      formData: ''
    }
  },
  methods: {
    upload (e) {
      console.log('Check Click', e)
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // upload image
      uploadImg(this.formData).then(res => {
        console.log('check RES', res)
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production'
            ? config.baseUrl.pro
            : config.baseUrl.dev
          this.pic = baseUrl + res.data
        }
        // update user info
        updateUserInfo({ pic: this.pic }).then(res => {
          if (res.code === 200) {
            // update userinfo in store
            const user = this.$store.state.userInfo
            user.pic = this.pic
            this.$store.commit('setUserInfo', user)
            this.$alert('Image Upload Successfully')
          }
        })
      })
      document.getElementById('pic').value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
#pic{
 display: none;
}
</style>
