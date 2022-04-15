const app = getApp()

Page({
    data: {},
    onLoad: function(options){},
    onShow: function () {
        let userInfo = wx.getStorageSync('userInfo');
        if (userInfo != '') {
            wx.navigateBack();
        };
    },

    getUserProfile:function(){
      let code='';
      wx.login({
        success: (res) =>{
            code=res.code;
        }
      })
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '用户登录',
        success: (res) =>{
            let loginParams={
                code:code,
                encryptedData:res.encryptedData,
                iv:res.iv,
                rawData:res.rawData,
                signature:res.signature
            };
            wx.setStorage({
                key:'UserInfo',
                data: res.userInfo
            })
            console.log(loginParams);
            wx.navigateBack()
        },
        fail:()=>{
            wx.navigateBack()
        }
      });
    },

    goBack: function () {
        wx.navigateBack();
    }
})