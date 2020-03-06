/*
 * @Author: 罗圈圈
 * @Date: 2018-04-27 12:14:39
 * @Last Modified by: 罗圈圈
 * @Last Modified time: 2018-05-04 17:51:29
 */

/**
 * 获取url中的参数
 * 获取 url 中的参数并缓存
 * 再次获取相同参数不再求值直接返回
 */
export const getUrlData = name => {
  if (cache[name] !== undefined) return cache[name]
  const search = location.href.substring(location.href.indexOf('?') + 1)
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const ret = search.match(reg)
  cache[name] = ret !== null ? ret[2] : null
  return cache[name]
}

// 数据缓存对象
const cache = {}
