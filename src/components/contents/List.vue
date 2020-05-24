<template>
   <div class="fly-panel" style="margin-bottom: 0;">
          <div class="fly-panel-title fly-filter">
            <a :class="{'layui-this': status=== '' && tag=== ''}"
            @click.prevent="search()">综合</a>
            <span class="fly-mid"></span>
            <a :class="{'layui-this': status === '0'}"
            @click.prevent="search(0)">未结</a>
            <span class="fly-mid"></span>
            <a :class="{'layui-this': status === '1'}"
             @click.prevent="search(1)">已结</a>
            <span class="fly-mid"></span>
            <a :class="{'layui-this': status === '' && tag === '精华'}"
             @click.prevent="search(2)">精华</a>
            <span class="fly-filter-right layui-hide-xs">
              <a :class="{'layui-this': sort === 'created'}"
              @click.prevent="search(3)">按最新</a>
              <span class="fly-mid"></span>
              <a :class="{'layui-this': sort === 'answer'}"
               @click.prevent="search(4)">按热议</a>
            </span>
          </div>
          <list-item :lists='lists' :isEnd='isEnd' @nextPage="nextPage()"></list-item>
        </div>
</template>

<script>
import { getList } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      isRepeat: false,
      isEnd: false,
      status: '',
      tag: '',
      sort: '',
      page: 0,
      limit: 20,
      catalog: '',
      current: '',
      lists: []
    }
  },
  components: {
    'list-item': ListItem
  },
  mounted () {
    this._getLists()
  },
  watch: {
    current (newval, oldval) {
      this.init()
      this._getLists()
    },
    '$route' (newval, oldval) {
      const catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
      this._getLists()
    }
  },
  methods: {
    init () {
      this.page = 0
      this.lists = []
      this.isEnd = false
    },
    nextPage () {
      this.page++
      this._getLists()
    },
    search (val) {
      if (typeof val === 'undefined' && this.current === '') return
      console.log(val)
      this.current = val
      switch (val) {
        case 0:
          this.status = '0'
          this.tag = ''
          break
        case 1:
          this.status = '1'
          this.tag = ''
          break
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    },
    _getLists () {
      // Check whether the request is still under processing
      // if (this.isRepeat) return
      // check whether the data has been fetched compeletely
      if (this.isEnd) return
      this.isRepeat = true
      const options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then(res => {
        // this.isRepeat = false
        console.log(res)
        this.lists = []
        if (res.code === 200) {
          // if post data from server is fetched completely, stop fetch more
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch(err => {
        // this.isRepeat = false
        if (err) {
          this.$alert(err.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
