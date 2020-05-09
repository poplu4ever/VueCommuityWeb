<template>
    <div>
      <panel-temp></panel-temp>
      <router-view></router-view>
    </div>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  name: 'home',
  components: {
    'panel-temp': Panel
  }
}
</script>

<style lang="scss" scoped>

</style>
