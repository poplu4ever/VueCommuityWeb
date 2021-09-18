<template>
    <div>
      <transition name="fade">
        <div class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
          <div class="layui-layer-title">请输入引用内容</div>
             <div class="layui-layer-content">
               <textarea type="text" class="layui-layer-input" v-model="quote" id="inputItem"></textarea>
             </div>
             <div class="layui-layer-btn">
              <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
              <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
            </div>
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'quote',
  props: ['isShow'],
  data () {
    return {
      quote: ''
    }
  },
  methdos: {
    submit () {
      if (this.quote === '') {
        document.getElementById('inputItem').focus()
        this.$pop('shake', '请输入合法引用')
        return
      }
      this.$emit('addEvent', this.quote)
      setTimeout(() => {
        this.quote = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel () {
      this.$emit('closeEvent')
      this.quote = ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
