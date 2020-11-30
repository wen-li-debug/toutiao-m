<template>
  <div class="home-container">
    <!-- 标题栏 -->
    <van-nav-bar
      class="app-navBar"
    >
        <van-button
          slot="title"
          class="search-info"
          type="info"
          icon="search"
          round
        >搜索</van-button>
    </van-nav-bar>

    <!-- 导航栏 -->
    <van-tabs v-model="active">
      <van-tab
        v-for="item in channels"
        :key="item.id"
        :title="item.name"
      >
        <active-list :channel="item" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/home'

import ActiveList from './children/active-list'

export default {
  name: 'HomeIndex',
  components: {
    ActiveList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  watch: {},
  computed: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      const data = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>
<style lang="less" scoped>
.home-container{
  .search-info{
    width: 277px;
    height: 32px;
    .van-icon{
      font-size: 16px;
    }
    .van-button__text{
      font-size: 14px;
    }
  }
  /deep/.van-nav-bar__title{
    max-width: none;
  }
}
</style>
