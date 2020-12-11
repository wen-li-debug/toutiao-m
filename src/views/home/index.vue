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
          to="/search"
        >搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs v-model="active" class="channel-warp">
      <van-tab
        v-for="item in channels"
        :key="item.id"
        :title="item.name"
      >
        <articel-list :channel="item" />
      </van-tab>
      <div
       slot="nav-right"
       @click="isChannelShow = true"
       class="nav-icon-warp"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 弹出框 -->
    <van-popup
     v-model="isChannelShow"
     position="bottom"
     :style="{ height: '100%' }"
     closeable
     close-icon-position="top-left"
     get-container="body"
    >
      <channel-edit
       :channel="channels"
       :actives="active"
       @close="isChannelShow = false"
       @backClick="active = $event"
      />
      <!-- $event 指的是事件传过来的参数值 -->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/home'

import ArticelList from './children/articel-list'
import ChannelEdit from './children/channel-edit'

import { mapState } from 'vuex'
import { getUsers } from '@/utils/storeage'

export default {
  name: 'HomeIndex',
  components: {
    ArticelList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelShow: false
    }
  },
  watch: {},
  computed: {
    ...mapState(['users'])
  },
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    // 获取的频道数据
    async loadChannels () {
      let channels = []
      // 有两种情况
      if (this.users) {
        // 1.用户登录状态显示用户的频道数据
        const data = await getUserChannels()
        channels = data.data.channels
      } else {
        // 2.用户未登录，先判断本地是否有存储频道数据，没有在去获取推荐的频道数据
        const locaChannels = getUsers('user-channels')
        if (locaChannels) {
          // 本地存储有，使用本地数据
          channels = locaChannels
        } else {
          // 本地存储没有，使用推荐的数据
          const data = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
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
  .channel-warp{
    padding-right: 33px;
    /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line{
      width: 15px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
    .nav-icon-warp{
      position: fixed;
      right: 0;
      width: 33px;
      text-align: center;
      height: 43px;
      line-height: 44px;
      background-color: #fff;
      opacity: .9;
      .van-icon{
        font-size: 20px;
      }
    }
  }
}
</style>
