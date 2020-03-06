'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_URL: '"http://niubishanshan.top:3000/api"'
  BASE_URL: '"https://exam.zmgongzuoshi.top/api/v1"',
  LIVE_URL:'"https://exam.zmgongzuoshi.top/commodity/api/v1"'
})
