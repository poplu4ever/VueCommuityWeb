<template>
    <div class="layui-container">
        <div class="layui-row layui-col-space15">
          <div class="layui-col-md8">
            <top-temp></top-temp>
            <list-temp></list-temp>
          </div>
          <div class="layui-col-md4">
            <tips-temp></tips-temp>
            <sign-temp></sign-temp>
            <hotlist-temp></hotlist-temp>
            <ads-temp></ads-temp>
            <links-temp></links-temp>
          </div>
        </div>
      </div>
</template>

<script>
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'
import Top from '@/components/contents/Top'

export default {
  name: 'index',
  components: {
    'tips-temp': Tips,
    'sign-temp': Sign,
    'hotlist-temp': HotList,
    'ads-temp': Ads,
    'links-temp': Links,
    'list-temp': List,
    'top-temp': Top
  }
}

</script>

<style lang="scss" scoped>

</style>
