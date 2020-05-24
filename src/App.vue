<template>
  <div id="app">
    <new-header></new-header>
    <router-view></router-view>
    <new-footer></new-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    'new-header': Header,
    'new-footer': Footer
  }
}
</script>
<style lang="scss" scoped>
  @import "assets/layui/css/layui.css";
  @import "assets/css/global.css";
  @import "assets/layui/css/modules/layer/default/layer.css";

  .svg {
    position: relative;
    top: -4px;
  }
  .gray {
    color: #999;
  }
</style>
