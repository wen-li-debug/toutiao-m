/**
 * 将px 转换成rem
 * postcss 配置 
 */
// postcss需要导出一个对象
module.exports = {
  // 配置使用相关的插件
  plugins: {
    // 自动添加浏览器厂商声明前缀，用于兼容不同的浏览器
    // 这个在.browserslistrc 文件中已经配置了
    // autoprefixer: {
    //   // 配置用兼容到系统的浏览器
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    // 将px 转换成 rem
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
}