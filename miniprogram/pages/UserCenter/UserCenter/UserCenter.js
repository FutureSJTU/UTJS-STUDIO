// pages/UserCenter/UserCenter.js

const app = getApp()

Page({
  data: {
    userInfo: app.globalData.userInfo,
    tempName: null,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    tot_std_hor: app.globalData.tot_std_hor,
    tot_std_day: app.globalData.tot_std_day,
    tot_tsk_don: app.globalData.tot_tsk_don,
    hiddenmodalput: true,
    greeting: "Hi ",
    text: [],
    nowActive: 0
  },

  edit_name: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  nameInput: function (event) {
    this.setData({
      tempName: event.detail.value
    })
  },

  cancelInput: function () {
    this.setData({
      // 模态框的隐藏
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  confirmInput: function () {
    if (this.data.userInfo.nickName.length == 0) {
      wx.showToast({
        title: '姓名不为空！',
      })
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    } else {
      app.globalData.userInfo.nickName = this.data.tempName;
      this.setData({
        userInfo: app.globalData.userInfo,
        greeting: 'Hi '+app.globalData.userInfo.nickName,
        hiddenmodalput: !this.data.hiddenmodalput
      })
      this.onShow();
    }
  },

  onLoad: function(){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile(e) {
    var that=this;
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: app.globalData.userInfo,
          greeting: 'Hi '+app.globalData.userInfo.nickName,
          hasUserInfo: true
        })
        that.onShow();
      }
    })
  },

  onShow: function(){
    var that=this;
    if(that.data.hasUserInfo){
      var words=that.data.greeting.split('');
      for(var i=0;i<words.length;i++){
        (function(j){
          setTimeout(()=>{
            that.setData({
              text:words.slice(0,j+1),
              nowActive:j
            })
          }, 100*j)
          console.log(that.data.text);
        })(i)
      }
    }
  }

})