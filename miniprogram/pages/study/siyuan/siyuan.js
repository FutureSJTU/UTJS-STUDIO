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
    buildingName: "思源湖畔",
    showUploadTip: false
  } ,

  //离开自习室
  onUnload: function () {

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