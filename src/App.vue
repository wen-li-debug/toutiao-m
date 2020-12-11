<template>
  <div id="app">
    <!-- 使用keep-alive 实现组件的缓存，include实现包含，用于只缓存选中的组件,多个可以用数组来显示 -->
    <keep-alive :include="cachePages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang="less">
</style>
