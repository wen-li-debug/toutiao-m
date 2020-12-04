<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS和安卓 输入法中显示搜索按钮 -->
    <form action="/">
    <van-search
     v-model="searchText"
     placeholder="请输入搜索关键词"
     show-action
     @search="onSearch(searchText)"
     @cancel="$router.back()"
     @focus="isShowResult = false"
    />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isShowResult" :searchText="searchText" />

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" @searchs="onSearch" />

    <!-- 历史记录 -->
    <search-history v-else :history="historys" />

  </div>
</template>

<script>
import SearchSuggestion from './children/search-suggestion'
import SearchHistory from './children/search-history'
import SearchResult from './children/search-result'

import { getUsers, setUser } from '@/utils/storeage'

export default {
  name: 'searchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isShowResult: false,
      historys: getUsers('search-history') || []
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 回车触发搜索数据接口
    onSearch (search) {
      this.searchText = search
      // 收集历史记录值
      const index = this.historys.indexOf(search)
      if (index !== -1) {
        // 去除重复值
        this.historys.splice(index, 1)
      }
      // 赋值
      this.historys.unshift(search)
      console.log(this.historys)

      // 数据持久化
      // 线上和本地
      setUser('search-history', this.historys)

      // 打开数据结构框
      this.isShowResult = true
    }
  }
}
</script>
<style lang="less" scoped>
</style>
