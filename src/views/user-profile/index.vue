<template>
  <div class="user-profile">
    <van-nav-bar
      left-arrow
      title="个人信息"
      class="app-navBar"
      @click-left ="$router.back()"
    />
    <!-- 使用input file  上传功能 accept 可以设置只能选择的类型 -->
    <input
     type="file"
     hidden ref="file"
     accept="image/*"
     @change="changeFile">
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        round
        :src="userProfile.photo"
        fit="cover"
        width="30"
        height="30"
      />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userProfile.name"
      @click="isUpdtaName = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="userProfile.gender === 0 ? '男' : '女'"
      @click="isUpdtaGender = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="userProfile.birthday"
      @click="isUpdtaBirthday = true"
    ></van-cell>

    <!-- 修改名字的弹框 -->
    <van-popup
      v-model="isUpdtaName"
      position="bottom"
      :style="{height : '100%'}"
      class="updata-name"
    >
      <updata-name
       v-if="isUpdtaName"
       v-model="userProfile.name"
       @close="isUpdtaName = false"
      />
    </van-popup>

    <!-- 修改性别的弹框 -->
    <van-popup
      v-model="isUpdtaGender"
      position="bottom"
    >
      <updata-gender
       v-if="isUpdtaGender"
       v-model="userProfile.gender"
       @close="isUpdtaGender = false"
      />
    </van-popup>

    <!-- 修改生日的弹框 -->
    <van-popup
      v-model="isUpdtaBirthday"
      position="bottom"
    >
      <updata-birthday
       v-if="isUpdtaBirthday"
       v-model="userProfile.birthday"
       @close="isUpdtaBirthday = false"
      />
    </van-popup>

    <!-- 修改头像的弹框 -->
    <van-popup
      v-model="isUpdtaphoto"
      position="bottom"
      style="height: 100%"
    >
      <updata-photo
       v-if="isUpdtaphoto"
       :privewImg="photoFile"
       @close="isUpdtaphoto = false"
       @updata-photo="userProfile.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'

import UpdataName from './children/updata_name'
import UpdataGender from './children/updata_gender'
import UpdataBirthday from './children/updata_birthday'
import UpdataPhoto from './children/updata_photo'

export default {
  name: 'UserProfile',
  components: {
    UpdataName,
    UpdataGender,
    UpdataBirthday,
    UpdataPhoto
  },
  props: {},
  data () {
    return {
      userProfile: {},
      photoFile: null, // 选择好的文件对象
      isUpdtaName: false, // 编辑姓名的显示状态
      isUpdtaGender: false, // 编辑性别的显示状态
      isUpdtaBirthday: false, // 编辑生日的显示状态
      isUpdtaphoto: false // 编辑头像的显示状态
    }
  },
  watch: {},
  computed: {},
  created () {
    this.loadUserProlife()
  },
  mounted () {},
  methods: {
    async loadUserProlife () {
      const data = await getUserProfile()
      this.userProfile = data.data
    },
    // 图片发生变化触发change事件
    changeFile () {
      console.log('va')
      // 获取选择好的文件对象
      const file = this.$refs.file.files[0]
      this.photoFile = file
      // 默认如果选择的是相同图片不会触发change事件，所以需要清楚value
      this.$refs.file.value = ''
      this.isUpdtaphoto = true
    }
  }
}
</script>
<style lang="less" scoped>
.updata-name{
  background-color: #f2f4f6;
}
</style>
