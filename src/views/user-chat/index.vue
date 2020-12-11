<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      title="小智同学"
      class="app-navBar"
      @click-left ="$router.back()"
    />
    <!-- 聊天内容 -->
    <van-cell-group class="cell-content">
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
    </van-cell-group>
    <!-- 底部输入框 -->
    <van-cell-group class="cell-input">
      <van-field v-model="value" placeholder="请输入信息" />
      <van-button
        type="primary"
        size="small"
        class="cell-btn"
      >发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
// 引入socket.io-client 插件
// import io from 'socket.io-client'

export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      value: '',
      socket: null // websocket 对象
    }
  },
  watch: {},
  computed: {},
  created () {
    // 初始化socket对象
    // const socket = io('http://ttapi.research.itcast.cn/')

    // 连接成功触发
    // socket.on('connect', function () {
    //   console.log(2)
    //   console.log('连接成功')
    // })

    // // 断开连接触发
    // socket.on('disconnect', function () {
    //   console.log('已断开连接')
    // })
  },
  mounted () {},
  methods: {
    // 发送数据
    // postClick () {
    //   this.socket.emit('message', {
    //     msg: this.value,
    //     timestamp: Date.now()
    //   })
    // }
  }
}
</script>
<style lang="less" scoped>
.cell-content{
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow-y: auto;
}
.cell-input{
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  padding: 0 10px;
  align-items: center;
  .cell-btn{
    margin-left: 10px;
    width: 55px;
  }
}
</style>
