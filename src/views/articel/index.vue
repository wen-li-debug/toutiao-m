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
    <!-- 文章用户信息 -->
    <div class="articel-warp">
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
        :loading="isFollowLoading"
        @click="isFollow"
      >{{ articel.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>

    <!-- 文章内容 -->
    <div ref="articel-content" class="markdown-body" v-html="articel.content"></div>

    <!-- 评论列表 -->
    <comment-list :articelId="articelId" @updata-comment-count="totalCommentCount = $event" ref="commentList" @reply-click="replyClick" />
    </div>

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        type="default"
        class="comment-btn"
        round
        @click="isCommentShow = true"
      >
        写评论
      </van-button>
      <van-icon
       name="comment-o"
       color="#777"
       :badge="totalCommentCount"
      />
      <van-icon
       :name="articel.is_collected ? 'star' : 'star-o'"
       :color="articel.is_collected ? 'orange ' : '#777'"
       @click="isStar"
       :loading="isCollectLoading"
      />
      <van-icon
       :name="articel.attitude === 1 ? 'good-job' : 'good-job-o'"
       :color="articel.attitude === 1 ? 'hotpink' : '#777'"
       @click="isAttitude"
      />
      <van-icon name="share-o" color="#777" />
    </div>
    <!-- 评论弹出框 -->
    <van-popup
     v-model="isCommentShow"
     position="bottom"
    >
    <comment-post :articelId="articelId" @close="close" />
    </van-popup>
    <!-- 回复评论的弹出框 -->
    <van-popup
      v-model="isCommentReply"
      position="bottom"
      v-if="isCommentReply"
    >
      <comment-reply :reply="reply" @close="isCommentReply = false" :art_id="articelId"/>
    </van-popup>
  </div>
</template>

<script>
import '@/styles/github-markdown.css'
import CommentList from './children/comment-list'
import CommentPost from './children/comment-post'
import CommentReply from './children/comment-reply'

import { addFollow, delFollow } from '@/api/user'
import { getArticelId, addCollect, delCollect, addLike, delLike } from '@/api/home'

// 图片预览，需要单独引入
import { ImagePreview } from 'vant'

export default {
  name: 'ArticelIndex',
  components: {
    CommentList,
    CommentPost,
    CommentReply
  },
  props: {
    articelId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      articel: [],
      isFollowLoading: false,
      isCollectLoading: false,
      isCommentShow: false, // 控制评论
      totalCommentCount: 0, // 评论总数量
      isCommentReply: false, // 控制回复评论
      reply: {}
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
    },
    // 点击 关注和取消关注
    async isFollow () {
      // 请求加载中
      try {
        this.isFollowLoading = true
        if (this.articel.is_followed) {
          // 取消关注
          await delFollow(this.articel.aut_id)
        } else {
          // 点击关注
          await addFollow(this.articel.aut_id)
        }
        // 改变is_followed 值
        this.articel.is_followed = !this.articel.is_followed
        // 关闭加载
        this.isFollowLoading = false
      } catch (error) {
        this.$toast.fail('登陆之后才能操作')
      }
    },

    // 收藏
    async isStar () {
      this.isCollectLoading = true
      try {
        if (this.articel.is_collected) {
          // 取消收藏
          await delCollect(this.articelId)
        } else {
          // 点击收藏
          await addCollect(this.articelId)
        }
        // 改变is_collected 值
        this.articel.is_collected = !this.articel.is_collected
        // 关闭加载状态
        this.isCollectLoading = false
        // 提示
        this.$toast.success(`${this.articel.is_collected ? '收藏成功' : '已取消收藏'}`)
      } catch (error) {
        this.$toast.fail('登陆之后才能操作')
      }
    },

    // 点赞
    async isAttitude () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        if (this.articel.attitude === 1) {
          // 取消点赞
          await delLike(this.articelId)
          this.articel.attitude = 0
        } else {
          await addLike(this.articelId)
          this.articel.attitude = 1
        }
        this.$toast.success(`${this.articel.attitude === 1 ? '点赞成功' : '已取消点赞'}`)
      } catch (error) {
        this.$toast.fail('登陆之后才能操作')
      }
    },
    // 关闭评论，修改数据
    close (newObj) {
      // 获取commentList组件 修改数据
      this.$refs.commentList.addComment(newObj)
      // 评论加1
      this.totalCommentCount++
      this.isCommentShow = false
    },
    // 获取点击回复的数据
    replyClick (value) {
      this.reply = value
      this.isCommentReply = true
    }
  }
}
</script>
<style lang="less" scoped>
.articel-container{
  .articel-warp{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 45px;
    overflow-y: auto;
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
      background-color: #fff;
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    width: 100%;

    .comment-btn{
      width: 180px;
      height: 25px;
      margin-left: 5px;
      margin-right: 20px;
      color: #777;
    }
    .van-icon{
      flex: 1;
      font-size: 25px;
    }
    /deep/.van-info{
      right: 15px;
    }
  }
}
</style>
