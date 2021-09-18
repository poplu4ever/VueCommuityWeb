
<template>
    <div>
      <table class="layui-table">
       <thead>
         <tr>
          <th class="title">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0">
              <span>收藏时间</span>
            </div>
          </th>
         </tr>
       </thead>
       <tbody v-for="(item, index) in list" :key="'myCollect' + index">
         <tr>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.created | moment}}</td>
         </tr>
       </tbody>
      </table>
       <page-temp
        v-show="total > 1"
        :total="total"
        :current="current"
        :align="'left'"
        :hasTotal="true"
        :hasSelect="true"
        @changeCurrent="handleChange"
      />
    </div>
</template>

<script>
import { getCollect } from '@/api/user'
import Pagination from '@/components/modules/page/index'

export default {
  name: 'myCollection',
  components: {
    'page-temp': Pagination
  },
  data () {
    return {
      list: [],
      total: 0,
      current: 0,
      page: 0,
      limit: 10
    }
  },
  mounted () {
    this.getCollectList()
  },
  methods: {
    getCollectList () {
      getCollect({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        console.log('CHECK DATA', res)
        this.list = res.data
        this.total = res.total
      })
    },
    handleChange (val) {
      this.current = val
      this.getCollectList()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 70%;
}
</style>
