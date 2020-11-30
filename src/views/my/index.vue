<template>
  <div class="my-container">
    <!-- 单元格数据 -->
    <van-cell-group class="my-banner" v-if="users">
      <van-cell
        class="my-info"
        center
        :border="false"
      >
        <van-image
          class="avtar"
          round
          fit="cover"
          slot="icon"
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{currentUser.name}}</div>
        <van-button size="mini" round type="primary" class="upt-info">编辑信息</van-button>
      </van-cell>

    <!-- 宫格 -->
      <van-grid
        :border="false"
        class="grid-info"
      >
        <van-grid-item class="grid-info-item">
          <div class="span">{{currentUser.art_count}}</div>
          <div class="text">头条</div>
        </van-grid-item>
        <van-grid-item class="grid-info-item">
          <div class="span">{{currentUser.follow_count}}</div>
          <div class="text">关注</div>
        </van-grid-item>
        <van-grid-item class="grid-info-item">
          <div class="span">{{currentUser.fans_count}}</div>
          <div class="text">粉丝</div>
        </van-grid-item>
        <van-grid-item class="grid-info-item">
          <div class="span">{{currentUser.like_count}}</div>
          <div class="text">获赞</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <div class="not-img">
          <img src="@/assets/login/phone.png" alt="">
        </div>
        <div class="not-text">点击登录</div>
      </div>
    </div>

    <!-- 收藏，历史 -->
    <van-grid :column-num="2" class="nav-info">
      <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" class="nav-info-item"/>
      <van-grid-item icon-prefix="toutiao" icon="lishi-" text="历史" class="nav-info-item"/>
    </van-grid>

    <!-- 消息通知 -->
    <!-- 小智同学 -->
    <van-cell title="消息通知" is-link url="/vant/mobile.html" class="message" v-if="users "/>
    <van-cell title="小智同学" is-link to="index" />
    <van-cell title="退出登录" class="loginout-cell" v-if="users" @click="loginOutClick"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUsers } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {}
    }
  },
  watch: {},
  computed: {
    ...mapState(['users'])
  },
  created () {
    this.currentGetUsers()
  },
  mounted () {},
  methods: {
    // 退出登录
    loginOutClick () {
      // 退出提示
      this.$dialog.confirm({
        title: '退出提示',
        message: '是否确认退出登录'
      }).then(() => {
        // 退出成功，将users值改成null
        this.$store.commit('setUsers', null)
      }).catch(() => {
        console.log('取消退出')
      })
    },
    async currentGetUsers () {
      const data = await getUsers()
      this.currentUser = data.data
    }
  }
}
</script>
<style lang="less" scoped>
.my-container{
  .not-login{
    height: 180px;
    background: url('~@/assets/login/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .not-img{
        img{
        width: 66px;
        height: 66px;
      }
    }
    .not-text{
      font-size: 14px;
      color: #fff;
    }
  }
  .my-banner{
    background: url('~@/assets/login/banner.png') no-repeat;
    background-size: cover;
    .my-info{
      box-sizing: border-box;
      background: unset;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avtar{
        width: 66px;
        height: 66px;
        box-sizing: border-box;
        margin-right: 11px;
        border: 1px solid #fff;
      }
      .name{
        color: #fff;
        font-size: 15px;
      }
      .upt-info{
        height: 16px;
        color: #fff;
        font-size: 10xp;
      }
    }
    .grid-info{
        .grid-info-item{
          height: 65px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .span{
            font-size: 18px;
          }
          .text{
            font-size: 11px;
          }
        }
      }
  }
  /deep/.van-grid-item__content{
    background: unset;
  }
  /deep/.nav-info{
    .nav-info-item{
      height: 70px;
    }
    .toutiao{
      font-size: 22px;
    }
    .toutiao-shoucang{
      color: #ed5253;
    }
    .toutiao-lishi-{
      color: #ff9d1d;
    }
    .van-grid-item__text{
      font-size: 14px;
      color: #333;
    }
  }
  .message{
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .loginout-cell{
    text-align: center;
    color: #d86262;
    margin-top: 4px;
  }
}
</style>
