// pages/article/article.js
const dayjs = require("../../dayjs.min.js");
let that = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    content: "",
    createdAt: 1638322680,
    publicTime: "",
    title: "",
    updatedAt: 1638322680,
    _id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log(options.id);
    that.setData({
      id: options.id,
    });
    that.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  loadData() {
    const db = wx.cloud.database();
    db.collection("news")
      .doc(that.data.id)
      .get({
        success: function (res) {
          // res.data 包含该记录的数据
          that.setData({
            title: res.data.title,
            content: res.data.content,
            publicTime: dayjs
              .unix(res.data.publicTime)
              .format("YYYY-MM-DD HH:mm:ss"),
          });
          console.log(res.data);
        },
      });
  },
});
