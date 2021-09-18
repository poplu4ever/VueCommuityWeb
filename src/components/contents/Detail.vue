<template>
   <div class="layui-container">
    <panel-temp></panel-temp>
    <div class="layui-row layui-col-space15">
        <div class="layui-col-md8 content detail">
            <div class="fly-panel detail-box">
        <h1>{{page.title}}</h1>
        <div class="fly-detail-info">
          <!-- <span class="layui-badge">审核中</span> -->
          <span class="layui-badge layui-bg-green fly-detail-column" v-if="page.catalog === 'logs' ">动态</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'ask' ">提问</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'advise' ">建议</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'share' ">分享</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'discuss' ">交流</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'notice' ">公告</span>

          <span class="layui-badge" style="background-color: #999;" v-if="page.isEnd === '0'">未结</span>
          <span class="layui-badge" style="background-color: #5FB878;" v-else>已结</span>

          <span class="layui-badge layui-bg-black" v-show="page.isTop === '1'">置顶</span>
          <span class="layui-badge layui-bg-red" v-for="(tag, index) in page.tags" :key="'tags' + index">{{tag.name}}</span>

          <div v-hasRole="'super_admin'">
            <div class="fly-admin-box" data-id="123">
            <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>

            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
           </div>
          </div>

          <span class="fly-list-nums">
            <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i>{{page.answer}}</a>
            <i class="iconfont" title="人气">&#xe60b;</i>{{page.reads}}
          </span>
        </div>

        <!-- My Favs 收藏 -->
        <div class="detail-about">
          <a class="fly-avatar" href="../user/home.html">
            <img :src="page.uid ? page.uid.pic: 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'">
            <!-- <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心"> -->
          </a>
          <div class="fly-detail-user">
            <a href="../user/home.html" class="fly-link">
              <cite>{{page.uid ? page.uid.name : '克劳德'}}</cite>
              <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
              <i class="layui-badge fly-badge-vip" v-if="page.uid ? page.uid.isVip : false">VIP{{page.uid.isVip}}</i>
            </a>
            <span>{{page.created}}</span>
          </div>
          <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
            <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}</span>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
              <router-link href="" v-show="page.isEnd === '0'" class="layui-btn layui-btn-sm jie-admin" :to="{name:'edit', params: {tid: tid, page: page}}">编辑</router-link>
              <a href="" @click.prevent="setCollect()" :class="{'layui-btn-primary': page.isFav }" class="layui-btn layui-btn-sm jie-admin jie-admin-collect">{{page.isFav ? '取消收藏' : '收藏'}}</a>
          </div>
        </div>

        <div class="detail-body photos" v-html="content">
        </div>
      </div>

        <!-- Comment Section-->
      <div class="fly-panel detail-box" id="flyReply">
        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
          <legend>回帖</legend>
        </fieldset>

        <ul class="jieda" id="jieda">
          <li class="jieda-daan" v-for="(item, index) in comments" :key="'comments' + index">
            <div class="detail-about detail-about-reply">
              <a class="fly-avatar" href="">
                <img :src=" item.cuid ? item.cuid.pic : '/img/Neolu.png' " alt=" ">
              </a>
              <div class="fly-detail-user">
                <router-link :to="{name:'home', params:{uid: item.cuid._id}}" class="fly-link">
                  <cite>{{item.cuid && item.cuid.isVip !== '0' ? item.cuid.name : '克劳德'}}</cite>
                  <!-- <i class="iconfont icon-renzheng" title="认证信息：XXX"></i> -->
                  <i v-if="item.cuid ? item.cuid.isVip : false" class="layui-badge fly-badge-vip">VIP{{item.cuid.isVip}}</i>
                </router-link>

                <span v-if="index === 0 ">(楼主)</span>
                <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                -->
              </div>

              <div class="detail-hits">
                <span>{{item.created | moment}}</span>
              </div>

              <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
            </div>
            <div class="detail-body jieda-body photos" v-richtext="item.content" v-html="item.content">
              <!-- <p>香菇那个蓝瘦，这是一条被采纳的回帖</p > -->
            </div>
            <div class="jieda-reply">
              <span class="jieda-zan" :class="{'zanok': item.handed === '1'}" type="zan" @click="hands(item)">
                <i class="iconfont icon-zan"></i>
                <em>{{item.hands}}</em>
              </span>
              <span type="reply" @click="reply(item)">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
              <div class="jieda-admin">
                <span type="edit" v-show="page.isEnd === '0' && item.cuid._id === user._id" @click="editComment(item)">编辑</span>
                <!-- <span type="del">删除</span> -->
                <span class="jieda-accept"
                      v-show="page.isEnd === '0' && item.cuid._id === user._id"
                      type="accept"
                      @click="setBest(item,index)"
                >采纳</span>
              </div>
            </div>
          </li>

          <!-- <li data-id="111">
            <a name="item-1111111111"></a>
            <div class="detail-about detail-about-reply">
              <a class="fly-avatar" href="">
                <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">
              </a>
              <div class="fly-detail-user">
                <a href="" class="fly-link">
                  <cite>贤心</cite>
                </a>
              </div>
              <div class="detail-hits">
                <span>2017-11-30</span>
              </div>
            </div>
            <div class="detail-body jieda-body photos">
              <p>蓝瘦那个香菇，这是一条没被采纳的回帖</p>
            </div>
            <div class="jieda-reply">
              <span class="jieda-zan" type="zan">
                <i class="iconfont icon-zan"></i>
                <em>0</em>
              </span>
              <span type="reply">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
              <div class="jieda-admin">
                <span type="edit">编辑</span>
                <span type="del">删除</span>
                <span class="jieda-accept" type="accept">采纳</span>
              </div>
            </div>
          </li> -->

          <!-- 无数据时 -->
          <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
        </ul>
        <page-temp
          v-show="comments.length > 0"
          :showType="'icon'"
          @changeCurrent="handleChange"
          @changeLimit="handleLimit"
          :hasSelect="false"
          :hasTotal="false"
          :total="total"
          :size="size"
          :current="current"></page-temp>
        <div class="layui-form layui-form-pane">
          <form>
            <validation-observer ref="observer" v-slot="{ validate }">
                <editor-temp @changeContent="addContent" :initContent="editInfo.content"></editor-temp>
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
                    <input type="hidden" name="jid" value="123">
                    <button class="layui-btn" @click="validate().then(submit)">提交回复</button>
                </div>
            </validation-observer>
          </form>
        </div>
      </div>
    </div>
    <div class="layui-col-md4">
      <hotlist-temp></hotlist-temp>

      <ads-temp></ads-temp>

      <links-temp></links-temp>
    </div>
   </div>
  </div>
</template>

<script>
import { addCollect } from '@/api/user'
import { getDetail } from '@/api/content'
import { getComments, addComment, updateComment, setCommentBest, setHands } from '@/api/comments'
import Panel from '@/components/Panel'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Editor from '../modules/editor/index'
import Pagenation from '@/components/modules/page/index'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { escapeHtml } from '@/utils/escapeHtml'
import { getCode } from '@/api/login'
import uuid from 'uuid/v4'
import { scrollToElem } from '@/utils/common'

export default {
  name: 'Detail',
  props: ['tid'],
  components: {
    'hotlist-temp': HotList,
    'ads-temp': Ads,
    'links-temp': Links,
    'panel-temp': Panel,
    'editor-temp': Editor,
    'page-temp': Pagenation,
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      svg: '',
      code: '',
      editInfo: {
        content: '',
        code: '',
        sid: ''
      }
    }
  },
  mounted () {
    this.getPostDetail()
    this.getCommentsList()

    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  },
  methods: {
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    handleLimit (val) {
      this.size = val
      this.getCommentsList()
    },
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    getPostDetail () {
      getDetail(this.tid).then((res) => {
        // console.log('DETAIL RES', res)
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentsList () {
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        // console.log('Comment RES', res)
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    addContent (val) {
      this.editInfo.content = val
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      // user is not login
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }

      const user = this.$store.state.userInfo
      if (user.status !== '0') {
        this.$pop('shake', '用户已经禁言，请联系管理员')
        return
      }

      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid

      // Get current userinfo
      const cuid = {
        _id: user._id,
        pic: user.pic,
        name: user.name,
        isVip: user.isVip
      }

      if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
        const obj = { ...this.editInfo }
        delete obj.item
        // check whether content is changed
        if (this.editInfo.content === this.editInfo.item.content) {
          this.$pop('shake', '请确定修改内容')
          return
        }
        updateComment(obj).then((res) => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.$pop('', '更新评论成功')
            this.code = ''
            this.editInfo.content = ''
            // update comment list
            res.data.cuid = cuid
            this.comments.splice(this.comments.indexOf(this.editInfo.item), 1, temp)
          }
        })
      }

      addComment(this.editInfo).then(res => {
        if (res.code === 200) {
          this.$pop('', '发表评论成功')
          this.code = ''
          this.editInfo.content = ''
          // Add new comment to comment list
          res.data.cuid = cuid
          this.comments.push(res.data)
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
        } else {
          this.$alert(res.msg)
        }
      })
    },
    editComment (item) {
      this.editInfo.content = item.content
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    setBest (item, index) {
      this.$confirm('确定采纳为最佳答案', () => {
        setCommentBest({
          cid: item._id,
          tid: this.tid
        }).then((res) => {
          if (res.code === 200) {
            this.$pop('', '采纳最佳答案成功')
            item.isBest = '1'
            this.page.isEnd = '1'
          }
        })
        console.log(item._id)
      }, () => {})
    },
    hands (item) {
      setHands({ cid: item._id }).then((res) => {
        console.log('test', res)
        if (res.code === 200) {
          this.$pop('', '点赞成功')
          item.handed = '1'
          item.hands += 1
        } else {
          this.$pop('shake', res.msg)
        }
      })
    },
    reply (item) {
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content.replace(reg, '@' + item.cuid.name + ' ')
        } else {
          if (this.editInfo.content !== '') {
            this.editInfo.content = `@${item.cuid.name}`
          }
        }
      } else {
        // There is no content in input field
        this.editInfo.content = '@' + item.cuid.name
      }
    },
    setCollect () {
      // setCollect or cancelCollect
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        }
        addCollect(collect).then((res) => {
          if (res.code === 200) {
            this.page.isFav = !this.page.isFav
            this.$pop('', this.page.isFav ? '设置收藏成功' : '取消收藏成功')
          }
        })
      } else {
        this.$pop('shake', '请先登录再进行收藏！')
      }
    }
  },
  computed: {
    content () {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    user () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
 }
 .fly-detail-info {
    span {
        margin-right: 5px;
    }
 }
 .jieda-body {
   margin: 25px 0 20px !important
 }
</style>
