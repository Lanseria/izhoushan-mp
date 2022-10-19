
var Abi = require('wx-axios-promise');
var { baseUrl } = require('./constant');


// console.log(baseUrl)
let api = Abi({
  url: baseUrl,//默认的接口后缀
  dataType: 'json',//默认的返回类型
  header: {
    'content-type': "application/json"
  }
})
let urlPrefix = ""
api.interceptors.response.use((config) => {
  wx.hideLoading()
  return config.data || config
}, function (error) {
  return error
})

api.interceptors.request.use(function (config) {
  urlPrefix = config.url
  wx.showLoading({
    title: api.req || '加载中'
  })
  return config;
}, function (error) {
  return error
})
module.exports = {
  api
}
