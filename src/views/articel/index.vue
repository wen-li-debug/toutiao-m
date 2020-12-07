<template>
  <div class="articel-container">
    <!-- 标题栏 -->
    <van-nav-bar
      class="app-navBar"
      title="文章内容"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <h1 class="title">{{articel.title}}</h1>
    <van-cell class="user-info" center>
      <van-image
        class="avater"
        slot="icon"
        width="35"
        height="35"
        round
        fit="cover"
        :src="articel.aut_photo"
        />
      <div slot="title" class="name">{{articel.aut_name}}</div>
      <div slot="label" class="date">{{articel.pubdate | relativeTime}}</div>
      <van-button
        :type="articel.is_followed ? 'default': 'info'"
        round
        size="mini"
        class="follw-btn"
        :icon="articel.is_followed ? '': 'plus'"
      >{{ articel.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>

    <!-- 文章内容 -->
    <div ref="articel-content" class="markdown-body" v-html="articel.content"></div>
  </div>
</template>

<script>
import '@/styles/github-markdown.css'

import { getArticelId } from '@/api/home'

// 图片预览，需要单独引入
import { ImagePreview } from 'vant'

export default {
  name: 'ArticelIndex',
  components: {},
  props: {
    articelId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      articel: []
    }
  },
  watch: {},
  computed: {},
  created () {
    this.loadArticel()
  },
  mounted () {},
  methods: {
    // 获取文章内容
    async loadArticel () {
      const data = await getArticelId(this.articelId)
      this.articel = data.data
      // 使用this.$nextTick 来实现数据修改后立即来获取document元素
      // 因为数据修改后需要渲染，不能立即获取到document元素
      this.$nextTick(() => {
        this.handleImgs()
      })
    },
    // 给所有的图片注册点击事件
    handleImgs () {
      // 获取文章元素
      const articelContent = this.$refs['articel-content']
      // 获取所以的imgs元素
      const imgs = articelContent.querySelectorAll('img')
      const imgPath = []
      // 遍历图片注册点击事件
      imgs.forEach((img, index) => {
        // 获取所以图片的路径
        imgPath.push(img.src)
        // 注册点击事件，预览图片
        img.onclick = function () {
          ImagePreview({
            // 图片路径
            images: imgPath,
            // 点击图片的索引
            startPosition: index
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.articel-container{
  .title{
    font-size: 25px;
    padding: 12px;
    color: #333;
    margin: 0;
    background-color: #fff;
  }
  .user-info{
    .name{
      font-size: 13px;
      color: #333;
    }
    .avater{
      width: 33px;
      height: 33px;
      margin-right: 12px;
    }
    .date{
      font-size: 11px;
      color: #b4b4b4;
    }
    .follw-btn{
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body{
      text-indent: 2em;
  }
}
</style>
