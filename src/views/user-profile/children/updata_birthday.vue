<template>
  <div class="updta-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdataBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      // 确定提交
      this.$toast({
        message: '保存中...',
        forbidClick: true
      })
      const data = dayjs(this.currentDate).format('YYYY-MM-DD')
      console.log(data)
      await UpdateUserProfile({
        birthday: data
      })
      this.$toast.success('修改成功')
      this.$emit('close')
      this.$emit('input', data)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
