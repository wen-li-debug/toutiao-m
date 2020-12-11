<template>
  <div class="updata-photo">
    <img
     :src="newImg"
     alt=""
     ref="image"
     />
    <van-nav-bar
      class="navBar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { UpdateUserPhoto } from '@/api/user'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'UpdataPhoto',
  components: {},
  props: {
    privewImg: {
      required: true
    }
  },
  data () {
    return {
      // 获取文件对象中url 路径 window.URL.createObjectURL(this.privewImg)
      newImg: window.URL.createObjectURL(this.privewImg),
      cropper: null // 裁切图片cropper对象
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    // 使用cropperjs 第三方插件来实现图片裁切
    // 1.获取图片对象(因为需要操作DOM，所以需要在mouted中操作，不能在created中操作)
    const image = this.$refs.image
    console.log(image)
    // 创建cropper 对象
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    // 3.封装getCroppedCanvas 函数 为promise
    getCroppedCanvas () {
      // 封装一个promise 函数
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(file => {
          resolve(file)
        })
      })
    },

    // 点击确认图片
    async onConfirm () {
      this.$toast({
        message: '保存中...',
        forbidClick: true
      })
      // 调用getCroppedCanvas 函数获取图片对象
      const file = await this.getCroppedCanvas()
      // 因为header 中要求content-Type 是 multipart/form-data ，所以图片提交需要使用FormData
      const fd = new FormData()
      // 添加图片，参数1 图片对象名，图片对象
      fd.append('photo', file)
      // 发送请求
      await UpdateUserPhoto(fd)
      // 数据持久化
      this.$emit('close')
      this.$emit('updata-photo', window.URL.createObjectURL(file))
      this.$toast.success('保存成功')
    }
  }
}
</script>
<style lang="less" scoped>
.navBar{
  position:fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
