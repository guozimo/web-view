import axios from 'axios'
import { getUrlData } from './getUrlData'

export const request = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 8000
})

// request 拦截器
request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Authorization'] = getUrlData('authorization')
  config.headers['ReqChannel'] = config.ReqChannel || 'MASTER'
  // config.headers['Authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJhIjpudWxsLCJzIjoibzJFSVYwYXVuZkxvdTNwQ3dxMWVSbzJtYzlGNCIsImMiOjE1MjUzMzEwOTE3MTEsImUiOjE1MjY2MjcwOTE3MTEsImkiOjEzfQ.C7wEAutGSJi4gFZraG_HQJNIrVRBPs1DOZCIsmFWLhBSa6ODd1HHs70_7xjxlgCHBSaWBg_TUTULRTb1dvEUKQ'
  if (config.method.toLowerCase() === 'post') {
    config.data = JSON.stringify(config.data)
  } else {
    config.params = config.data
    config.data = null
  }
  return config
}, err => {
  Promise.reject(err)
})

request.interceptors.response.use(
  response => {
    const { data } = response
    return data
  },
  err => {
    return Promise.reject(err)
  }
)
