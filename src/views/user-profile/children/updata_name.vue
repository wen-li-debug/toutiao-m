<template>
  <div class="updata-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="user-field">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/user'

export default {
  name: 'UpdataName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 修改姓名
    async onClickRight () {
      this.$toast({
        message: '保存中',
        forbidClick: true
      })
      try {
        await UpdateUserProfile({ name: this.message })
        this.$toast.success('保存成功')
        this.$emit('input', this.message)
        this.$emit('close')
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user-field{
  padding: 7px;
}
</style>
