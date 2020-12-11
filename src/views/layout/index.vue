<template>
  <div class="layout-container">
    <!-- 二级路由出口 keep-alive 实现组件缓存，不会销毁组件-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- 底部框 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qw">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    // 添加组件缓存
    this.$store.commit('addCachePages', 'LayoutIndex')
  },
  methods: {}
}
</script>
<style lang="less" scoped>
</style>
