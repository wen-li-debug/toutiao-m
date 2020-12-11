<template>
  <div class="comment-post">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      round
      size="small"
      class="btn"
      :disabled="!message"
      @click="commentClick"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

// import bus from '@/utils/bus'

export default {
  name: 'commentPost',
  components: {},
  props: {
    // 发布文章评论，需要文章ID
    // 发布回复评论，需要评论ID
    articelId: {
      type: [String, Number, Object],
      required: true
    },
    // 发布回复评论，需要文章id，发布文章评论不用传值
    art_id: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    async commentClick () {
      this.$toast({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const data = await addComment({
          target: this.articelId,
          content: this.message,
          art_id: this.art_id
        })
        this.$toast.success('评论成功')
        console.log(data)
        this.$emit('close', data.data.new_obj)
        // bus.$emit('add', data.data.new_obj)
        this.message = ''
      } catch (error) {
        this.$toast.fail('登陆之后才能操作')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.comment-post{
  display: flex;
  padding: 14px;
  align-items: center;
  .btn{
    width: 64px;
  }
}
</style>
