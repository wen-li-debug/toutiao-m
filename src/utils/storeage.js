/**
 * 本地存储公用的方法
 */
// 获取本地存储信息
export const getUsers = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 将data数据转化成JSON对象
    return JSON.parse(data)
  } catch (error) {
    // 当data不是JSON数据报错的时候补抓处理
    return data
  }
}

// 设置本地存储数据
export const setUser = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

// 删除本地存储数据
export const removeUsers = name => {
  window.localStorage.removeItem(name)
}
