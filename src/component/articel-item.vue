<template>
  <van-cell
   class="articel-item"
   :to="{
     name: 'articel',
     params: {
       articelId: articel.art_id
     }
   }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">{{articel.title}}</div>
    <div slot="label">
      <div
        class="cover-warp"
        v-if="articel.cover.type === 3"
      >
        <van-image
          class="right-cover"
          v-for="(item, index) in articel.cover.images"
          :key="index"
          fit="cover"
          :src="item"
        />
      </div>
      <div class="text-warp">
        <span>{{articel.aut_name}}</span>
        <span>{{articel.comm_count}}</span>
        <!-- 使用Dayjs 时间处理器插件，用全局过滤器来处理时间 -->
        <span>{{articel.pubdate | relativeTime}}</span>
      </div>
    </div>
      <van-image
        v-if="articel.cover.type === 1"
        fit="cover"
        :src="articel.cover.images[0]"
      />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticelItem',
  components: {},
  props: {
    articel: {
      type: Object,
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
.articel-item{
  .title{
    font-size: 16px;
    color: #3a3a3a;
  }
  .cover-warp{
    display: flex;
    padding: 15px 0 ;
    .right-cover{
      flex: 1;
      width: 116px;
      height: 73px;
      &:not(:last-child){
        margin-right: 4px;
      }
    }
  }
  .text-warp{
    font-size: 11px;
    color: #b4b4b4;
    span{
      margin-right: 12px;
    }
  }
  /deep/ .van-cell__value{
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
}
</style>
