<template>
    <div>
      <transition name="fade">
          <div class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
            <div class="layui-layer-title">请帖入代码或任意文本</div>
             <div class="layui-layer-content">
              <textarea class="layui-layer-input" v-model="code" id="inputItem" :style="inputObj"></textarea>
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
  name: 'codeInput',
  props: ['isShow', 'width', 'height'],
  data () {
    return {
      code: '',
      inputObj: {
        cols: `${this.width}px`,
        rows: `${this.height - 50}px`
      }
    }
  },
  methods: {
    submit () {
      if (this.code === '') {
        document.getElementById('inputItem').focus()
        this.$pop('shake', '请输入代码内容')
        return
      }
      this.$emit('addEvent', this.code)
      setTimeout(() => {
        this.code = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel () {
      this.$emit('closeEvent')
      this.code = ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
