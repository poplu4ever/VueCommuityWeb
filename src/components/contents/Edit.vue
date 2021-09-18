<template>
    <div>
        <div class="layui-container fly-marginTop">
            <div class="fly-panel" pad20 style="padding-top: 5px;">
                <!--<div class="fly-none">没有权限</div>-->
                <div class="layui-form layui-form-pane">
                  <div class="layui-tab layui-tab-brief" lay-filter="user">
                      <ul class="layui-tab-title">
                        <li class="layui-this">编辑帖子<!-- 编辑帖子 --></li>
                      </ul>
                      <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
                        <div class="layui-tab-item layui-show">
                            <form>
                                <validation-observer ref="observer" v-slot="{ validate }">
                                    <div class="layui-row layui-col-space15 layui-form-item">
                                        <div class="layui-col-md3">
                                              <div class="layui-row">
                                                  <label class="layui-form-label">所在专栏</label>
                                                  <div class="layui-input-block">
                                                      <div class="layui-unselect layui-form-select">
                                                          <div class="layui-select-title">
                                                              <input type="text"
                                                                     placeholder="请选择"
                                                                     readonly
                                                                     v-model="catalogs[cataIndex].text"
                                                                     class="layui-input layui-unselect layui-disabled">
                                                              <i class="layui-edge"></i>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                        </div>
                                        <div class="layui-col-md9">
                                            <div class="layui-row">
                                                <label for="L_title" class="layui-form-label">标题</label>
                                                <div class="layui-input-block">
                                                    <input v-model="title" type="text" name="title" class="layui-input">
                                                    <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <editor @changeContent="add" :initContent="content"></editor>
                                    <div class="layui-form-item">
                                        <div class="layui-inline">
                                        <label class="layui-form-label">悬赏飞吻</label>
                                        <div class="layui-input-inline" style="width: 190px;">
                                          <div class="layui-unselect layui-form-select">
                                                  <div class="layui-select-title">
                                                      <input type="text" placeholder="请选择" readonly v-model="favList[favIndex]"
                                                          class="layui-input layui-unselect layui-disabled">
                                                      <i class="layui-edge"></i>
                                                  </div>
                                          </div>
                                        </div>
                                        <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                                        </div>
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
                                        <button type="button" class="layui-btn" @click="validate().then(submit)">立即发布</button>
                                    </div>
                                </validation-observer>
                            </form>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { updatePost } from '@/api/content'
import Editor from '../modules/editor/index'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import uuid from 'uuid/v4'
import { getCode } from '@/api/login'
export default {
  name: 'edit',
  props: ['tid', 'page'],
  components: {
    Editor,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '建议',
          value: 'advise'
        },
        {
          text: '交流',
          value: 'discuss'
        },
        {
          text: '公告',
          value: 'notice'
        }
      ],
      favList: [20, 30, 50, 60, 80],
      code: '',
      svg: '',
      content: '',
      title: ''
    }
  },
  mounted () {
    console.log(this.page)
    if (this.page) {
      this.content = this.page.content
      this.title = this.page.title
      this.favIndex = this.favList.indexOf(parseInt(this.page.fav))
      this.cataIndex = this.catalogs.indexOf(this.catalogs.filter((item) => item.value === this.page.catalog)[0])
      localStorage.setItem('editData', JSON.stringify(this.page))
    } else {
      // No page data, user might refresh page
      const saveData = localStorage.getItem('editData')
      if (saveData && saveData !== '') {
        this.$confirm('是否加载未编辑完的内容？', () => {
          const obj = JSON.parse(saveData)
          this.content = obj.content
          this.title = obj.title
          this.cataIndex = obj.cataIndex
          this.favIndex = obj.favIndex
        }, () => {
          localStorage.setItem('editData', '')
        })
      }
    }
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
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    chooseFav (item, index) {
      this.favIndex = index
    },
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    add (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        // const editData = localStorage.getItem('editData')
        // let newObj = {}
        // if (editData && editData !== '') {
        //   newObj = { ...saveData, ...JSON.parse(editData) }
        // }
        localStorage.setItem('editData', JSON.stringify(saveData))
      }
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空')
        return
      }
      // add new post
      updatePost({
        tid: this.tid,
        title: this.title,
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('editData', '')
          this.$alert('更新帖子成功, 2秒后跳转')
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: this.tid } })
          }, 2000)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
