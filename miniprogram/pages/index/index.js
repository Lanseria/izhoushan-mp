const app = getApp();
Page({
  tomap() {
    wx.navigateTo({
      url: "../map/map",
    });
  },
  tonews() {
    wx.navigateTo({
      url: "../news/news",
    });
  },
  onShareAppMessage() {
    return {
      title: "快来使用LBS定位小工具",
      imageUrl: "../../asset/logo.png",
    };
  },
});
