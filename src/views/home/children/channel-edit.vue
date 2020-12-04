<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isIconEdit = !isIconEdit"
      >{{isIconEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
       :icon="(isIconEdit && index !== 0) ? 'clear' : ''"
       v-for="(item, index) in channel"
       :key="index"
       :text="item.name"
       class="grid-item"
       :class="{'active' : index === actives}"
       @click="onUserChannel(item, index)"
      />
    </van-grid>

     <van-cell
      center
      :border="false"
     >
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
       v-for="(value,index) in editChannel"
       :key="index"
       :text="value.name"
       class="grid-item"
       @click="onAdd(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannels, delhannels } from '@/api/channel'

import { mapState } from 'vuex'

import { setUser } from '@/utils/storeage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channel: {
      type: Array,
      required: true
    },
    actives: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      AllChannel: [],
      isIconEdit: false
    }
  },
  watch: {},
  // 计算属性的好处在于，计算中的值发生变化的时候在再次运行一次计算
  computed: {
    // 计算出剩下的频道列表
    editChannel () {
      // 使用filter筛选出符合的数据
      return this.AllChannel.filter((item) => {
        // 使用find 循环列表找出剩下的频道列表
        return !this.channel.find(ele => {
          return ele.id === item.id
        })
      })
    },
    ...mapState(['users'])
  },
  created () {
    // 获取所以频道数据
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    // 获取所以的频道列表
    async loadAllChannels () {
      const data = await getAllChannels()
      this.AllChannel = data.data.channels
    },
    // 添加数据
    async onAdd (value) {
      // 添加数据
      this.channel.push(value)
      // 数据持久化有两种可能
      if (this.users) {
        // 1.用户登录状态，添加数据提交到后台
        await addChannels({
          channels: [{
            id: value.id,
            seq: this.channel.length
          }]
        })
      } else {
        // 1. 用户未登录，数据保存在本地
        setUser('user-channels', this.channel)
      }
    },
    // 删除或者关闭弹框数据
    onUserChannel (item, id) {
      if (this.isIconEdit && id !== 0) {
        // 点击了删除，删除数据
        this.loaddelChannel(item, id)
      } else {
        // 关闭弹框
        this.$emit('close')
        this.$emit('backClick', id)
      }
    },
    // 删除数据
    async loaddelChannel (item, id) {
      // 更新激活频道的索引
      if (id <= this.actives) {
        this.$emit('backClick', this.actives - 1)
      }
      this.channel.splice(id, 1)

      // 删除数据保持数据持久化
      if (this.users) {
        // 用户登录状态, 提交到后台
        await delhannels(item.id)
      } else {
        // 用户未登录，保持到本地
        setUser('user-channels', this.channel)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333;
  }
  .grid-item{
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content{
      background-color: #f4f5f6;
      .van-grid-item__text{
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
      .van-icon{
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 20px;
        color: #ccc;
      }
    }
  }
  .active{
    /deep/ .van-grid-item__text{
      color: red !important;
    }
  }
}
</style>
