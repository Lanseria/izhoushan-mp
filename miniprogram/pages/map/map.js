const { n, parseData } = require("../../api/constant");
const { queryList } = require("../../api/query");
const QQMapWX = require('../../api/qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({
  key: "HOWBZ-A4W6R-453WE-WO4JU-2L6SQ-LEBL6" // 必填
});
// pages/map-control/map-control.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusList: [
      {
        color: '#C24740',
        value: 0,
        label: "拥挤"
      },
      {
        color: '#F3AE1A',
        value: 1,
        label: "忙碌"
      },
      {
        color: '#50C240',
        value: 2,
        label: "空闲"
      },
      {
        color: '#BEBEBE',
        value: 3,
        label: "休息"
      },
    ],
    showPosition: true,
    location: {
      latitude: 30.040415,
      longitude: 122.273511
    },
    rawData: [],
    markers: [],
    filter: 'all',
    markerCallbackTxt: '点击标注点触发回调事件',
  },
  // 激活定位控件
  onChangeShowPosition() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const { latitude, longitude } = res;
        this.setData({
          location: {
            latitude,
            longitude
          }
        });
      }
    });
  },
  setFilter(e) {
    console.log(e)
    const { currentTarget } = e
    const { dataset } = currentTarget
    let { filter } = this.data
    filter === dataset.id ? (filter = 'all') : (filter = dataset.id)
    this.setData({
      filter
    })
    this.setMarkers()
  },
  _iconPath(status) {
    if (status !== null) {
      return '../../asset/' + status + '.png'
    } else {
      return '../../asset/3.png'
    }
  },
  setMarkers() {
    const { rawData, filter } = this.data
    let data = []
    if (filter === 'all') {
      data = rawData
    } else {
      data = rawData.filter(i => i.serviceStatus === filter)
    }
    const markers = data.map((item) => {
      return {
        title: item.orgName,
        id: +item.orgId,
        latitude: +item.gisLat,
        longitude: +item.gisLng,
        width: 10,
        height: 10,
        iconPath: this._iconPath(item.serviceStatus)
      }
    })
    this.setData({
      markers: markers
    })
    const mapCtx = wx.createMapContext('map', this);
    const points = this.data.markers.map(m => ({
      latitude: m.latitude,
      longitude: m.longitude
    }))
    mapCtx.includePoints({
      points,
      padding: [36, 36, 10, 36]
    })
  },
  async fetchData() {
    const r = await queryList(n)
    const res = parseData(r)
    this.setData({
      rawData: res.result.t.data
    })
    this.setMarkers()
    // wx.nextTick(() => {
    //   this.initMarkerCluster()
    // })
    // console.log(res)
  },
  initMarkerCluster() {
    const mapCtx = wx.createMapContext('map', this);
    console.log('initMarkerCluster')
    mapCtx.initMarkerCluster({
      gridSize: 10,
      success: (r) => {
        console.log(r)
      },
      fail: (r) => {
        console.log(r)
      },
      complete: (r) => {
        console.log(r)
      },
    });
  },

  // 标注点击回调
  onTapMarker(event) {
    console.log(event)
    const markers = this.data.markers;
    for (let i = 0; i < markers.length; i++) { // 本示例只有一个marker，可用于处理单marker和多marker情况
      if (event.markerId === markers[i].id) {
        console.log(markers[i])
        qqmapsdk.reverseGeocoder({ // 调用逆地址解析
          location: {
            latitude: markers[i].latitude,
            longitude: markers[i].longitude
          },
          success: res => {
            if (res.result && res.result.formatted_addresses) { // 避免名称无数据处理
              this.setData({
                markerCallbackTxt: res.result.formatted_addresses.recommend
              });
            } else {
              this.setData({
                markerCallbackTxt: res.result.address
              });
            }
            const mapCtx = wx.createMapContext('map', this);
            mapCtx.openMapApp({
              latitude: markers[i].latitude,
              longitude: markers[i].longitude,
              destination: this.data.markerCallbackTxt
            })
          }
        });
      }
    }
  },
  onShow() {
    this.fetchData()
    this.onChangeShowPosition()
  },
  onShareAppMessage: function () {
    return {
      title: '腾讯位置服务示例中心'
    };
  }
});
