<template>
  <div class="d-flex" :class="{ 'flex-center': align === 'center', 'flex-left': align === 'left', 'flex-end': align === 'right'}">
    <div class="layui-box layui-laypage layui-laypage-default">
        <a href="javascript:;"
           class="layui-laypage-prev"
           :class="{'layui-disabled': current === 0}"
           @click.prevent="home()"
           v-show="showEnd">
          <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
          <template v-else>首页</template>
        </a>
        <a href="javascript:;" :class="{'layui-disabled': current === 0}" @click.prevent="prev()">
          <i class="layui-icon layui-icon-left" v-if=" showType=== 'icon'"></i>
          <template v-else>上一页</template>
        </a>
        <!-- current + 2 < pages -->
        <a v-if="pages.length > 5 && current+1-2 > 1 "
              href="javascript:;"
              class="layui-disabled"
        >...</a>
        <template v-for="(item, index) in pages">
          <a @click="changeIndex(index)"
             v-if="item >= (current+1-2) && item <= (current+1+2) "
             href="javascript:;"
             :key="'page' + index"
             :class="[current === index ? 'active' : '', current === index ? theme : '']"
          >{{item}}
          </a>
        </template>
        <a v-if="pages.length > 5 && (current+1+2) < pages.length "
              href="javascript:;"
              class="layui-disabled"
          >...</a>
        <a href="javascript:;" :class="{'layui-disabled': current === pages.length - 1 }" @click.prevent="next()">
          <i class="layui-icon layui-icon-right" v-if=" showType=== 'icon'"></i>
          <template v-else>下一页</template>
        </a>
        <a href="javascript:;"
           class="layui-laypage-next"
           :class="{'layui-disabled': current === pages.length - 1 }"
           @click.prevent="end()"
           data-page="2" v-show="showEnd">
          <i class="layui-icon layui-icon-next" v-if=" showType === 'icon'"></i>
          <template v-else>尾页</template>
        </a>
    </div>
    <div class="total" v-if="hasTotal">到第<input type="text" class="total-input">
      页 共 {{total}} 页
    </div>
    <div v-if="hasSelect">
      <div class="layui-unselect layui-form-select" :class="{'layui-form-selected': isSelect_fav}"
            @click="() => { isSelect_fav = !isSelect_fav}">
              <div class="layui-select-title">
                  <input type="text" placeholder="请选择" readonly v-model="options[optIndex]"
                      class="layui-input layui-unselect">
                  <i class="layui-edge"></i>
              </div>
              <dl class="layui-anim layui-anim-upbit">
                  <dd v-for="(item,index) in options" :key="'catalog'+ index"
                      @click="chooseFav(item, index)"
                      :class="{'layui-this': index === optIndex}" >
                      {{item}}
                  </dd>
              </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'page',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'icon'
    },
    showEnd: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    total: { // 数据库返回的数据总数
      type: Number,
      default: 0
    },
    current: { // 当前选择的页码位于页数序列中的下标
      type: Number,
      default: 0
    },
    size: { // 当前选择的每页显示条数
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      isSelect_fav: false,
      optIndex: 0,
      options: [20, 30, 50, 60, 80],
      pages: [],
      limit: 10
    }
  },
  watch: {
    total (newval, oldval) {
      this.initPages()
    }
  },
  mounted () {
    // 初始化分页的长度
    // 设置select的内容
    this.limit = this.size
    this.initPages()
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },
  methods: {
    initPages () {
      const len = Math.ceil(this.total / this.limit) // 获得页数长度
      this.pages = _.range(1, len + 1) // 获得代表页数的数组
    },
    chooseFav (item, index) {
      // limit变化后，current的数值也要相应调整
      if (this.optIndex !== index) {
        this.$emit('changeCurrent', Math.floor(this.limit * this.current / this.options[index]))
        this.$emit('changeLimit', this.options[index])
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    home () {
      this.$emit('changeCurrent', 0)
    },
    end () {
      this.$emit('changeCurrent', this.pages.length - 1)
    },
    prev () {
      let cur = 0
      if (this.current - 1 < 0) {
        cur = 0
      } else {
        cur = this.current - 1
      }
      this.$emit('changeCurrent', cur)
    },
    next () {
      let cur = 0
      if (this.current + 1 > this.pages.length) {
        cur = this.pages.length - 1
      } else {
        cur = this.current + 1
      }
      this.$emit('changeCurrent', cur)
    },
    changeIndex (item) {
      if (item !== this.current) {
        this.$emit('changeCurrent', item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px !important;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
}
.layui-bg-green {
  border-color: #009688;
}
.total {
  color: rgba(51,51,51,1);
  margin-left: 20px;
  position: relative;
  top: -2px;
}
.total-input {
  width: 30px ;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
}
.layui-input {
  height: 30px;
  line-height: 30px;
}
.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
