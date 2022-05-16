//index.js
var app = getApp();

const {
  envList
} = require('../../../envList.js')

Page({
  data: {
    isPositionPermited: true,
    pics: ["a", "b"],
    seatings: [0,1,1,0,1,1,0,
      0,0,0,0,0,
      0,1,1,0,1,1
      ,0,0,0,0,0,0,
      0,1,1,0,1,1
      ,0,0,0,0,0,0,
      0,1,1,0,1,1,0
      ,0,0,0,0,0,
      0,1,1,0,1,1

    ],
    buildingName: "思源湖",
    showUploadTip: false,
    timer: null,
    chosen:[]
  } ,

  //进入自习室
  onShow: function () {
    app.globalData.place = this.data.buildingName
    
    const _this = this
    //定时器  函数赋值给timer  方便clearInterval（）使用
    _this.data.timer = setInterval(
     function () {
    _this.toClock1();        
    }, 1000);

	_this.setData({
	    timer:_this.data.timer
	});
    
  },

  //刷新函数
  toClock1(){
    console.log('计时开始');
    var that = this;
    wx.cloud.callFunction({
        name:"placeCount",
        data:{
            place:this.data.buildingName
        }
        }).then(res=>{
            console.log(res.result.data);
            // that.data.chosen = res.result.data
        })
    // for (let i=0; i<that.data.chosen.lenth; i++){
    //     let temp = that.data.chosen.i.num;
    //     this.setData({
    //         seatings:3
    //     })
        
    //    }
    
  },

  onUnload: function () {
  //关闭clearInterval定时函数
     clearInterval(this.data.timer);
     this.setData({
       timer: null
     });
     console.log('关闭clearInterval定时函数');
  //离开自习室

    wx.cloud.callFunction({
        name:"toLeave",
        data:{

            num:getApp().globalData.number,
 
            place:this.data.buildingName
        }
        }).then(res=>{
            console.log('退出自习室，位置为：',this.data.buildingName,getApp().globalData.number)
        })
  },


})