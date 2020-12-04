<template>
  <div class="search-history">
    <van-cell>
      <div slot="title">搜索历史</div>
      <div v-if="isDelShow">
        <span
         @click="$emit('all-del-history', [])"
        >全部删除</span>
        &nbsp;
        <span @click="isDelShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDelShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in history"
      :key="index"
      @click="delHistory(item,index)"
    >
      <div slot="title">{{item}}</div>
      <van-icon name="close" v-show="isDelShow" />
    </van-cell>
  </div>
</template>

<script>
import { setUser } from '@/utils/storeage'

export default {
  name: 'SearchHistory',
  components: {},
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelShow: false
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 删除历史记录
    delHistory (history, index) {
      // 判断是否在删除状态
      if (this.isDelShow) {
        this.history.splice(index, 1)
        // 在数据持久化
        // 因为这里没有提供删除一个的数据接口，所以只删除本地存储
        setUser('search-history', this.history)
      } else {
        // 不在删除状态点击跳转搜索S
        this.$emit('search-history', history)
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
