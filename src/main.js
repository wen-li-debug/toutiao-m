import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vant ui库
import Vant from 'vant'
import 'vant/lib/index.css'

// rem 适配html 库
import 'amfe-flexible'

// 全局样式
import './styles/index.less'

// 引入时间Dayjs 插件
import './utils/dayjs.js'

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
