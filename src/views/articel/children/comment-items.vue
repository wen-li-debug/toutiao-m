<template>
  <div class="comment-items">
    <van-cell>
      <van-image
        class="avater"
        slot="icon"
        round
        :src="comment.aut_photo"
        fit="cover"
      />
      <div class="comment-warp">
        <div class="comment-like">
          <div class="name">{{comment.aut_name}}</div>
          <div class="like" @click="zanClick">
            <van-icon
             :name="comment.is_liking ? 'good-job' : 'good-job-o'"
             :color="comment.is_liking ? 'hotpink': ''"
             />
            <span>{{comment.like_count}}</span>
          </div>
        </div>
        <div class="comment-content">
          {{comment.content}}
        </div>
        <div class="comment-date">
          <span class="date">{{comment.pubdate | dataTime('MM-DD HH:mm')}}</span>
          <van-button
            size="mini"
            @click="$emit('comment-reply-click', comment)"
          >回复 {{comment.reply_count}}</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, delCommentLike } from '@/api/comment'

export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 点赞
    async zanClick () {
      try {
        if (this.comment.is_liking) {
        // 取消点赞
          await delCommentLike(this.comment.com_id)
          this.comment.like_count--
        } else {
          // 点赞
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (error) {
        this.$toast.fail('登陆之后才能操作')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.avater{
  width: 35px;
  height: 35px;
  margin-right: 12px;
}
.comment-warp{
  .comment-like{
    display: flex;
    justify-content: space-between;
    .like{
      display: flex;
      align-items: center;
    }
    .name{
      font-size: 14px;
      color: #466B9D;
    }
  }
  .comment-content{
    font-size: 16px;
    color: #363636;
  }
  .comment-date{
    .date{
      font-size: 11px;
      margin-right: 12px;
    }
  }
}
</style>
