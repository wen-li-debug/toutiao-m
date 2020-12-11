/**
 *  对时间进行处理的第三方插件 Dayjs.js
 */
import Vue from 'vue'
import dayjs from 'dayjs'
// 引入国际语言
import 'dayjs/locale/zh-cn'
// 引入处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'

// 处理到现在的相对时间
dayjs.extend(relativeTime)

// 配置国际语言
dayjs.locale('zh-cn')

// 把相对时间包装成全局过滤器使用
Vue.filter('relativeTime', value => {
  // value是接收过来的时间然后进行处理返回回去
  return dayjs(value).from(dayjs())
})

// 过滤时间格式
Vue.filter('dataTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  // 返回过滤好的时间
  return dayjs(value).format(format)
})

// 案例
// 1. 将当时间转化成相应格式(dayjs() 获取当前时间)
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// 2.获取一段时间到现在的距离
console.log(dayjs('2020-12-01 11:15').from(dayjs()))
