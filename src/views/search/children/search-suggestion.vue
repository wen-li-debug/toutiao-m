<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestion"
      :key="index"
      @click="$emit('searchs', str)"
    >
      <div slot="title" v-html="higlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'

// 使用lodash第三方插件使用防抖
import { debounce } from 'lodash'

export default {
  name: 'searchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  watch: {
    // 简洁写法
    // searchText () {
    //   console.log('hello')
    // }
    searchText: {
      // handler 监听执行 (debounce 实现防抖作用)
      handler: debounce(async function () {
        // 联想建议获取数据
        const data = await getSearchSuggestion(this.searchText)
        this.suggestion = data.data.options
      }, 500),
      // 在监听开始之后立即执行
      immediate: true
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 实现搜索框关键字高亮使用
    higlight (str) {
      // 正则表达式对象
      // 参数1. 包含的字符串 参数2.匹配模式  返回值是正则对象 (gi 指全局和不区分大小写)
      const reg = new RegExp(this.searchText, 'gi')
      // replace  匹配替换掉 参数1. 正则表达对象， 参数2.替换值
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
