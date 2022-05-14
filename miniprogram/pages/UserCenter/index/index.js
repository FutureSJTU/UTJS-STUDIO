// pages/UserCenter/UserCenter.js

const app = getApp()

Page({

  data: {
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    total_study_time: app.globalData.total_study_time,
    total_come_day: app.globalData.total_come_day,
    total_task_finish: app.globalData.total_task_finish,
    hiddenmodalput: true,
    tempName: ''
  },

  onLoad: function(){
    if(wx.getUserProfile){
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    console.log(this.data.total_come_day,this.data.total_task_finish)
  },

  getUserProfile(e){
    wx,wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  editName: function (e) {
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
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  confirmInput: function () {
    if (this.data.tempName.length == 0) {
      wx.showToast({
        title: '昵称不为空！',
      })
      this.setData({
        // 模态框的隐藏
        hiddenmodalput: !this.data.hiddenmodalput
      })
    } else {
      app.globalData.userInfo.nickName = this.data.tempName;
      this.setData({
        userInfo: app.globalData.userInfo,
        hiddenmodalput: !this.data.hiddenmodalput
      })
      this.onShow()
    }
  },

  onShow: function(){}
})