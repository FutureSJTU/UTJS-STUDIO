// pages/UserCenter/UserCenter.js

const app = getApp()

Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-typewx.getUserInfo'),
    status: {},
    total_study_time: app.globalData.total_study_time
  },

  goAuth: function(e) {
    wx.navigateTo({url: '/pages/app-auth/index'});
  },

  goProfile: function (e) {
    let res = util.loginNow();
    if (res == true) {
        wx.navigateTo({
            url: '/pages/UserCenter/settings/index',
        });
    }
  },

  onLoad: function(){},

  onShow: function(){
    let that=this;
    wx.getStorage({
      key:'UserInfo',

      success(res){
        that.setData({
          userInfo:res.data
        });
        console.log(that.data.userInfo);
      }
    });
    if(Object.keys(this.data.userInfo).length===0){
      this.setData({
        hasUserInfo: 0
      });
    }
    else{
      this.setData({
        hasUserInfo:1
      });
      console.log('success')
    }
  }
})