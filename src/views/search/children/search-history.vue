<template>
  <div class="search-history">
    <van-cell>
      <div slot="title">搜索历史</div>
      <div>
        <span>全部删除</span>
        &nbsp;
        <span>完成</span>
      </div>
      <!-- <van-icon name="delete" /> -->
    </van-cell>
    <van-cell
      v-for="(item, index) in history"
      :key="index"
    >
      <div slot="title">{{item}}</div>
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
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
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
</style>
