<template>
       <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
          <button class="layui-btn layui-btn-danger" id="LAY_delallmsg" @click="clearAll()">清空全部消息</button>
            <div  id="LAY_minemsg" style="margin-top: 10px;">
              <!--<div class="fly-none">您暂时没有最新消息</div>-->
              <ul class="mine-msg">
                <li v-for="(item, index) in lists" :key="'comments' + index">
                  <blockquote class="layui-elem-quote">
                    <a href="/jump?username=Absolutely" target="_blank">
                      <cite>{{item.cuid.name}}</cite>
                    </a>回答了您的求解<a target="_blank" href="/jie/8153.html/page/0/#item-1489505778669">
                      <cite>{{item.title}}</cite></a>
                  </blockquote>
                  <div v-richtext="item.content"></div>
                  <p><span>{{item.created}}</span>
                    <a href="javascript:;"
                       class="layui-btn layui-btn-small layui-btn-danger fly-delete"
                       @click="clear(item)"
                       >删除</a></p>
                </li>
              </ul>
              <page-temp
                :total="total"
                v-show="total > 0"
                :current="page"
                :align="'left'"
                :hasTotal="true"
                :hasSelect="true"
                @changeCurrent="handleChange"
               />
            </div>
        </div>
      </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/modules/page/index'
import { getMsg, setMsg } from '@/api/user'
export default {
  name: 'user-message',
  components: {
    'page-temp': Pagination
  },
  data () {
    return {
      lists: [],
      page: 0,
      limit: 10,
      total: 0
    }
  },
  mounted () {
    this.getMsgAll()
  },
  computed: mapState({
    num: state => state.num.message ? state.num.message : 0
  }),
  methods: {
    clearAll () {
      setMsg().then((res) => {
        if (res.code === 200) {
          this.lists = []
        }
      })
    },
    clear (item) {
      setMsg({ id: item._id }).then((res) => {
        if (res.code === 200) {
          this.getMsgAll()
          this.$store.commit('setMessage', { message: this.num - 1 })
        }
      })
    },
    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        console.log('check msg res', res)
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.page = val
      this.getMsgAll()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
