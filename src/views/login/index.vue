<template>
  <div class="login-container">
    <!-- nav-tab栏 -->
    <van-nav-bar
      class="app-navBar"
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 输入框 -->
    <van-form
      @submit="onLogin"
      :show-error-message="false"
      :show-error="false"
      @failed="onFailed"
      validate-first
      ref="formRef"
      >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        right-icon="warning-o"
        placeholder="请输入手机号码"
        :rules="formRules.mobile"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        icon-prefix="toutiao"
        clearable
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
        name="code"
      >
        <template #button>
          <!-- 倒计时 format 时间格式 finish 倒计时结束执行-->
          <van-count-down
            v-if="isCountDown"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDown = false"
          />
          <van-button
          v-else
          size="small"
          class="send-btn"
          @click.prevent="sendBtn"
        >发送验证码</van-button>
        </template>
      </van-field>
       <!-- 登录按钮 -->
      <div class="login-btn-warp">
        <van-button class="login-btn" type="primary" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendMs } from '@/api/user'

// import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 规则对象
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号码' },
          { pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, message: '手机格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDown: false // 用于切换验证码和倒计时
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 登录提交
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        // 遮挡层 默认位false, 设置true, 其他无法点击
        forbidClick: true,
        // 设置加载界面一直停留 默认是停留2秒
        duration: 0
      })

      // 发送登录请求
      try {
        const data = await login(this.user)
        this.$store.commit('setUsers', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (error) {
        this.$toast.fail('登录失败,手机或者验证码失败')
        console.log(error)
      }
    },

    // 验证手机号码和验证的提示
    onFailed (err) {
      // err获取到验证的信息
      const errors = err.errors[0]
      console.log(errors)
      if (errors) {
        this.$toast({
          message: errors.message,
          position: 'top'
        })
      }
    },

    // 发送验证码
    async sendBtn () {
      try {
        // 获取手机号码验证的信息根据name获取
        const data = await this.$refs.formRef.validate('mobile')
        console.log(data)
        // 发送验证码成功切换倒计时
        this.isCountDown = true

        // 发送验证码
        const res = await sendMs(this.user.mobile)
        console.log(res)
      } catch (error) {
        // 补抓所以的报错
        let message = ''
        // 判断是否是请求异常报错
        if (error && error.response && error.response.status === 429) {
          message = '短信发送太频繁,请稍后重试'
        } else if (error.name === 'mobile') {
          // 在判断是否手机号码验证成功
          message = error.message
        } else {
          message = '发送失败,请稍后重试'
        }
        console.log(error)
        // 错误提示
        this.$toast({
          message,
          position: 'top'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container{
  .send-btn{
    width: 100px;
    height: 30px;
    background-color: #ededed;
    border-radius: 5px;
    .van-button__text{
      color: #666;
      font-size: 11px;
    }
  }
  .login-btn-warp{
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fd;
      font-size: 16px;
      border: none;
    }
  }
}
</style>
