<template>
    <div class="edit-wrap">
        <div class="layui-form-item layui-form-text">
            <div class="layui-input-block">
                <div class="layui-unselect fly-edit" ref="icons">
                    <span @click="choose(0)">
                        <i class="iconfont icon-yxj-expression"></i>
                    </span>
                    <span @click="choose(1)">
                        <i class="iconfont icon-tupian"></i>
                    </span>
                     <span @click="choose(2)">
                        <i class="iconfont icon-lianjie"></i>
                    </span>
                    <span @click="choose(3)">
                        "
                    </span>
                    <span @click="addHr()">hr</span>
                    <span @click="choose(4)">
                        <i class="iconfont icon-emwdaima"></i>
                    </span>
                    <span @click="choose(5)">
                        <i class="iconfont icon-yulan1"></i>
                    </span>
                </div>
                <textarea v-model="content" id="edit" class="layui-textarea fly-editor" name="content" ref="textEdit"
                  @focus="focusEvent()" @blur="blurEvent()"></textarea>
            </div>
        </div>
        <div ref="modal">
          <face :isShow="current === 0"
                @closeEvent="closeModal()"
                @addEvent="addFace">
          </face>
          <img-upload :isShow="current === 1"
                      @closeEvent="closeModal()"
                      @addEvent="addPic">
          </img-upload>
          <link-add :isShow="current === 2"
                    @closeEvent="closeModal()"
                    @addEvent="addLink">
          </link-add>
          <Quote :isShow="current === 3"
                 @closeEvent="closeModal()"
                 @addEvent="addQuote">
          </Quote>
          <code-input :isShow="current === 4"
                :width="codeWidth"
                :height="codeHeight"
                @closeEvent="closeModal()"
                @addEvent="addCode">
          </code-input>
          <preview
                :isShow="current === 5"
                :content="content"
                @closeEvent="closeModal()"
                >
          </preview>
        </div>
    </div>
</template>

<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
import CodeInput from './Code'
import Quote from './Quote'
import Preview from './Preview'
export default {
  name: 'editor',
  props: ['initContent'],
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    CodeInput,
    Quote,
    Preview
  },
  data () {
    return {
      current: '',
      codeWidth: '',
      codeHeight: '',
      content: '',
      pos: ''
    }
  },
  watch: {
    initContent (newval, oldval) {
      this.content = newval
    }
  },
  updated () {
    this.$emit('changeContent', this.content)
  },
  methods: {
    closeModal () {
      this.current = ''
    },
    addFace (item) {
      const insertContent = ` face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addPic (item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addLink (item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addHr () {
      this.insert('\n[hr]')
      this.pos += 5
    },
    focusEvent () {
      this.getPos()
    },
    blurEvent () {
      this.getPos()
    },
    getPos () {
      let cursorPos = 0
      const elem = document.getElementById('edit')
      if (document.selection) {
        // IE
        const selectRange = document.selection.createRange()
        selectRange.moveStart('character', -elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
    },
    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    handleBodyClick (e) {
      e.stopPropagation()
      // activate module close event, change the status of isShow
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
        this.closeModal()
      }
    },
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      const tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
    this.codeWidth = this.$refs.textEdit.offsetWidth - 60
    this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss">
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

.fly-editor {
  height: 260px;
}
.quote {
  font-size:22px;
  vertical-align: middle;
  position: relative;
  top: 4px
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.icon-emwdaima{
  position: relative;
  top: 2px;
}
.layui-layer-prompt{
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2)
}
</style>
