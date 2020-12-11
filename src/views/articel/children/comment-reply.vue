<template>
  <div class="comment-reply">
    <van-nav-bar
     :title="`${reply.reply_count}评论回复`"
    >
      <van-icon
       slot="left"
       name="cross"
       @click="$emit('close')"
      />
    </van-nav-bar>
    <comment-item :comment="reply" />
    <van-cell>所有回复</van-cell>
    <comment-list :articelId="reply.com_id" type="c" ref="commentList" />
    <div class="footer">
      <van-button
        type="default"
        class="comment-btn"
        round
        @click="isReplyShow = true"
      >
        写评论
      </van-button>
    </div>

    <!-- 评论弹框 -->
    <van-popup
     v-model="isReplyShow"
     position="bottom"
    >
      <comment-post :articelId="reply.com_id" :art_id="art_id" @close="replyClick" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-items'
import CommentList from './comment-list'
import CommentPost from './comment-post'

export default {
  name: 'comment-reply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    reply: {
      type: Object,
      required: true
    },
    art_id: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isReplyShow: false
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 关闭评论框，添加评论数据
    replyClick (value) {
      // 修改评论数据
      this.$refs.commentList.addComment(value)
      // 回复数量加1
      this.reply.reply_count++
      // 关闭评论框
      this.isReplyShow = false
    }
  }
}
</script>
<style lang="less" scoped>
 .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 100%;

    .comment-btn{
      width: 240px;
      height: 30px;
      margin-left: 5px;
      margin-right: 20px;
      color: #777;
    }
 }
</style>
