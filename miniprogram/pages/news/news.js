// pages/news.js

const app = getApp(); // 获取全局APP对象
let that = null; // 页面this指针变量
Page({
  /**
   * 页面的初始数据
   */
  data: {
    news: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this; // 设置页面this指针到全局that
    that.getDbCloudPrj();
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
  openArticle(e) {
    console.log(e.currentTarget);
    wx.navigateTo({
      url: "../article/article?id=" + e.currentTarget.dataset.id,
    });
  },
  getDbCloudPrj() {
    const db = wx.cloud.database();
    db.collection("news")
      .orderBy("publicTime", "asc")
      .get({
        success: function (res) {
          // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
          const news = res.data;
          that.setData({
            news,
          });
        },
      });
  },
});
