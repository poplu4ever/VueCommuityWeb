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
<style lang="scss">
  @import "assets/layui/css/layui.css";
  @import "assets/css/global.css";
  @import "assets/layui/css/modules/layer/default/layer.css";
  @import "assets/css/layui-layer/layer.css";

@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px
    !important;
  }
  .pt#{$i} {
    padding-top: $i * 10 + px
    !important;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px
    !important;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px
    !important;
  }
  .pb#{$i} {
    padding-bottom: $i * 10 + px
    !important;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px
    !important;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px
    !important;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px
    !important;
  }
  .mb#{$i} {
    margin-bottom: $i * 10 + px
    !important;
  }
}
// public css
.svg {
  position: relative;
  top: -4px;
  }
.gray {
  color: #999;
  }
.orange {
  color: #ff5722;
}
.text-centre {
  text-align: center;
}
.pl0 {
  padding-left: 0;
}
.pr0 {
  padding-right: 0;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.pull-right {
  float: right;
}
.d-hide {
  position: absolute;
  overflow: hidden;
  height: 0;
}
.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
  }
  &.flex-center {
    justify-content: center;
  }

  @keyframes bounceIn {
  0% {
      opacity: 0;
      transform: scale(0.5);
  }
  100% {
      opacity: 1;
      transform: scale(1);
  }
}

@keyframes bounceOut {
  0% {
      transform: scale(1);
  }
  30% {
      transform: scale(1.05)
  }
  100% {
      opacity: 0;
      transform: scale(0.7)
  }
}

.fade-leave-active {
 animation: bounceOut 0.3s
}

.fade-enter-active,
.fade-enter-into {
 animation: bounceIn 0.3s
}
}
</style>
