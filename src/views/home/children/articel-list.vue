<template>
  <div
   class="active-list"
   ref="articelList"
  >
    <van-pull-refresh
     v-model="isRefresh"
     @refresh="onRefresh"
     :success-text="isSuccess"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <articel-item
          v-for="(articel,index) in articels"
          :key="index"
          :articel="articel"
        ></articel-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/home'

import ArticelItem from '@/component/articel-item'

// 防抖第三方插件
import { debounce } from 'lodash'

export default {
  name: 'ActiveList',
  components: {
    ArticelItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articels: [], // 接受数据
      loading: false, // 用于加载中的状态
      finished: false, // 用于数据加载完毕结束状态
      isRefresh: false,
      isSuccess: '',
      articel: {
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      },
      articelHeight: 0
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    // 记录用户滚动的高度
    // 获取list的元素
    const articelList = this.$refs.articelList
    // 绑定滚动事件
    articelList.onscroll = debounce(() => {
      // 使用抖动获取滚动的高度
      this.articelHeight = articelList.scrollTop
    }, 100)
  },
  methods: {
    // 上拉刷新
    async onLoad () {
      try {
        // 异步更新数据
        // 获取相关数据
        const data = await getArticles(this.articel)
        const results = data.data.results
        this.articels.push(...results)
        // 加载状态结束
        this.loading = false
        if (results.length) {
          // 判断results中是否还有值
          // 有值， 再次发送请求
          this.articel.timestamp = data.data.pre_timestamp
        } else {
          // 数据全部加载完成
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 下拉刷新
    async onRefresh () {
      // 获取数据
      this.articel.timestamp = Date.now()
      const data = await getArticles(this.articel)
      const result = data.data.results
      this.articels.unshift(...result)
      // 关闭加载状态
      this.isRefresh = false
      // 显示加载好的信息
      this.isSuccess = `刷新了${result.length}条信息`
    }
  },
  // 组件在缓存中，激活状态触发
  activated () {
    // 保留用户预览的高度
    const articelList = this.$refs.articelList
    articelList.scrollTop = this.articelHeight
    // console.log(articelList.scrollHeight) // 能看到的整个显示的高度
    // console.log(articelList.scrollTop) // 下来被卷上去的高度
  },
  // 组件处于缓存，不活跃状态触发
  deactivated () {}
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
