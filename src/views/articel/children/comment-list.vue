<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell>全部评论</van-cell>
      <comment-items
       v-for="(item, index) in list"
       :key="index"
       :comment="item"
       @comment-reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItems from './comment-items'

// import bus from '@/utils/bus'

export default {
  name: 'commentList',
  components: {
    CommentItems
  },
  props: {
    articelId: {
      type: [String, Number, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      comments: {
        type: this.type, // a 代表获取评论，c 代表获取评论的回复
        source: (this.articelId).toString(), // 文章id或者评论id
        offset: null, // 页码
        limit: 10 // 每页大小
      }
    }
  },
  watch: {},
  computed: {},
  created () {
    // bus.$on('add', (newObj) => {
    //   this.list.unshift(newObj)
    //   this.$emit('updata-comment-count', ++this.commentCount)
    // })
  },
  mounted () {},
  methods: {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    async onLoad () {
      // 异步更新数据
      const data = await getComment(this.comments)
      console.log(data)
      const result = data.data.results
      this.list.push(...result)
      this.$emit('updata-comment-count', data.data.total_count)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (result.length) {
        this.comments.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    // 添加评论，修改数据
    addComment (value) {
      this.list.unshift(value)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
