// pages/UserCenter/UserCenter.js

const app = getApp()

Page({

    data: {
        userInfo: null,
        hasuserInfo: false,
        hasAccount: false,
        canIUseGetUserProfile: false,
        hour: 0,
        minute: 0,
        total_study_time: 0,
        total_come_day: 0,
        curdate: [0,0,0],
        accdate: [0,0,0],
        hiddenmodalput: true,
        tempName: '',
    },

    formatTime:function(date){
        this.data.curdate[0] = date.getFullYear();
        this.data.curdate[1] = date.getMonth()+1;
        this.data.curdate[2] = date.getDate();
    },

    onPullDownRefresh:function(){
        this.onShow();
    },

    onLoad: function(){
        if(wx.getUserProfile){
        this.setData({
            canIUseGetUserProfile: true
            })
        }
        this.formatTime(new Date())
    },

    getUserProfile:function(){
        let that=this;
        wx.getUserProfile({
            desc: '用于完善用户资料',
            success: (res) => {
                app.globalData.userInfo = res.userInfo;
                that.onShow();
                if(!that.data.hasAccount){
                    wx.cloud.callFunction({ 
                        name:"addUser",
                        data:{
                            name: that.data.userInfo.nickName,
                            gender: that.data.userInfo.gender,
                            date: that.data.curdate,
                            allday: 1
                        }
                    }).then(res=>{
                        console.log("create an account")
                    })
                }else{
                    wx.cloud.callFunction({
                        name:"getUser"
                    }).then(res=>{
                        if(res.result.data[0].name!=undefined){
                            app.globalData.userInfo.nickName=res.result.data[0].name.nickName
                        }
                        let tempdate=res.result.data[0].date
                        app.globalData.total_come_day=res.result.data[0].allday
                        that.setData({
                            userInfo: app.globalData.userInfo,
                            accdate: tempdate,
                            total_come_day: app.globalData.total_come_day
                        })
                        if(that.data.curdate[0]==that.data.accdate[0]&&that.data.curdate[1]==that.data.accdate[1]&&that.data.curdate[2]==that.data.accdate[2]){
                            console.log("same day")
                        }else{
                            console.log("another day")
                            app.globalData.total_come_day += 1;
                            that.setData({
                                accdate:that.data.curdate,
                                total_come_day:app.globalData.total_come_day
                            })
                            wx.cloud.callFunction({
                                name:"updateUser",
                                data:{
                                    allday:1,
                                    date:[that.data.curdate[0],that.data.curdate[1],that.data.curdate[2]]
                                }
                            }).then(res=>{
                                console.log("another day complete")
                            })
                        }
                    })
                    /*console.log("already have an account")
                    wx.cloud.callFunction({
                        name:"delUser"
                    }).then(res=>{
                        console.log("delete")
                    })*/
                }
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
        wx.cloud.callFunction({
            name:"updateStudytime",
            data:{
                addsdt: 0,
                iname: app.globalData.userInfo
            }
        }).then(res=>{
            console.log("edit successfully")
        })
        this.onShow()
        }
    },

    onShow: function(){
        let that=this;
        wx.cloud.callFunction({
            name:"getStudytime"
        }).then(res=>{
            if(res.result.data[0] != undefined){
                app.globalData.total_study_time = res.result.data[0].studytime
                that.setData({
                    total_study_time: app.globalData.total_study_time,
                    hasAccount: true,
                    hour: parseInt((that.data.total_study_time/3600)),
                    minute: parseInt(((that.data.total_study_time/60)%60))
                })
                console.log("update the study time")
            }else{
                console.log("study time undefined")
            }
        })

        if(app.globalData.userInfo != null){
            console.log("update the account information")
            app.globalData.hasuserInfo = true;
            that.setData({
                userInfo:app.globalData.userInfo,
                hasUserInfo: true
            })
        }

        wx.stopPullDownRefresh()
    }
})