<template>
  <div class="updata-gender">
    <van-picker
      show-toolbar
      title="修改性别"
      :default-index="localGender"
      :columns="gender"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="changeGender"
    />
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/user'

export default {
  name: 'UpdataGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      gender: ['男', '女'],
      localGender: this.value
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 确定提交
    async onConfirm () {
      this.$toast({
        message: '保存中...',
        forbidClick: true
      })
      await UpdateUserProfile({
        gender: this.localGender
      })
      this.$toast.success('修改成功')
      this.$emit('close')
      this.$emit('input', this.localGender)
    },
    // 选择值时候触发 参数1，所选组件 ， 参数2， 所选值， 参数3， 所选索引
    changeGender (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>
<style lang="less" scoped>
</style>
