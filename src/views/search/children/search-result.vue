<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
       v-for="(action, index) in list"
       :key="index"
       :title="action.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      const data = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      const results = data.data.results
      this.list.push(...results)

      // 加载状态结束
      this.loading = false
      if (results.length) {
        // 还有值跟新下一页
        this.page++
      } else {
        // 数据全部加载完成
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
