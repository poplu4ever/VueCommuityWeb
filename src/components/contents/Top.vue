<template>
      <div class="fly-panel">
            <div class="fly-panel-title fly-filter">
              <a>置顶</a>
              <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
            </div>
             <list-item :lists="lists" :isShow="false"></list-item>
       </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'top',
  data () {
    return {
      page: 0,
      limit: 20,
      lists: [
        {
          uid: {
            name: 'neo',
            isVip: 1
          },
          title: '大前端课程',
          content: '',
          created: '2020-05-08 00:10:00',
          catalog: 'ask',
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          status: 0,
          isTop: 0,
          tags: [{
            name: '精华',
            class: 'layui-bg-red'
          },
          {
            name: '热门',
            class: 'layui-bg-blue'
          }]
        }
      ]
    }
  },
  components: {
    'list-item': ListItem
  }
}
</script>

<style lang="scss" scoped>

</style>
