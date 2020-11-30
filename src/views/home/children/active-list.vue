<template>
  <div class="active-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/home'

export default {
  name: 'ActiveList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 接受数据
      loading: false, // 用于加载中的状态
      finished: false, // 用于数据加载完毕结束状态
      articel: {
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      }
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 加载状态结束
      // 数据全部加载完成
      const data = await getArticles(this.articel)
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>
.active-list{
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
</style>
