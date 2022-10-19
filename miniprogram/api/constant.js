
const CryptoJS = require('./crypto-js')

const WordArray = 'LP6IRTBX'
const IV = '0102030405060708'

const t = {
  orgName: '',
  pageNum: 1,
  pageSize: 1000,
  areaName: '舟山市',
  levelName: '',
  serviceStatus: '',
  gisLat: '',
  gisLng: '',
  isFree: '',
  isRed: '',
  isYellow: '',
  isNeedHs: '',
  isLive: '0',
}

const w = CryptoJS.enc.Utf8.parse(WordArray)

const O = CryptoJS.enc.Hex.parse(IV)

let n = typeof t == 'string' ? t : JSON.stringify(t)
n = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(n), w, {
  iv: O,
}).toString()


const parseData = (data) => {
  const w = CryptoJS.enc.Utf8.parse('LP6IRTBX')

  const T = CryptoJS.enc.Hex.parse('0102030405060708')

  const i = data.replace(/\s+/g, '')
  const base64 = CryptoJS.enc.Base64.parse(i)
  const res = CryptoJS.DES.decrypt({
    ciphertext: base64,
  }, w, {
    iv: T,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8)
  return JSON.parse(res)
}

module.exports = {
  baseUrl: "https://cors-anywhere.vip.cpolar.cn/https://hsddcx.wsjkw.zj.gov.cn",
  n: n,
  parseData: parseData
}
