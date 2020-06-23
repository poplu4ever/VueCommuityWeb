<template>
    <div class="layui-container fly-marginTop fly-user-main">
      <ul class="layui-nav layui-nav-tree" lay-filter="test">
<!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
        <li class="layui-nav-item" v-for="(item,index) in lists" :key="'centre'+index">
            <router-link :to="{name: item.link}" :active-class="item.activeClass">
                <i class="iconNeo" :class="item.icon"></i>
                {{item.name}}
            </router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'centre',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'icon-home',
          link: 'home'
        },
        {
          name: '用户中心',
          icon: 'icon-home',
          link: 'centre'
        },
        {
          name: '基本设置',
          icon: 'icon-settings',
          link: 'info',
          activeClass: 'layui-this'

        },
        {
          name: '我的帖子',
          icon: 'icon-document',
          link: 'mypost',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'icon-message',
          link: 'message'
        },
        {
          name: '其他设置',
          icon: 'icon-product_s',
          link: 'other'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/custom/iconfont.css";
.iconNeo {
  margin-right: 10px;
}
</style>
