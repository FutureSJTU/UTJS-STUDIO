// pages/study/baotu/baotu.js
var intt;
var app = getApp();

const {
  envList
} = require('../../../envList.js')

Page({
  data: {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    timecount: '00:00:00',
    cost: 0,
    flag: 1,
    endtime: "",
    isPositionPermited: true,
    pics: ["a", "b"],
    seatings: [0, 1, 1, 0, 1, 1, 0,
      0, 0, 0, 0, 0,
      0, 1, 1, 0, 1, 1
      , 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0, 1, 1
      , 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0, 1, 1, 0
      , 0, 0, 0, 0, 0,
      0, 1, 1, 0, 1, 1

    ],
    buildingName: "包图",
    showUploadTip: false,
    timer: null,
    openid: String
  },

  start: function () {
    var that = this;
    //停止（暂停）
    clearInterval(intt);
    //时间重置
    that.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    intt = setInterval(function () { that.timer() }, 50);
  },
  //暂停
  stop: function () {
    clearInterval(intt);
  },
  //停止
  Reset: function () {
    var that = this
    clearInterval(intt);
    that.setData({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      timecount: '00:00:00',
    })
  },
  timer: function () {
    var that = this;
    console.log(that.data.millisecond)
    that.setData({
      millisecond: that.data.millisecond + 5
    })
    if (that.data.millisecond >= 100) {
      that.setData({
        millisecond: 0,
        second: that.data.second + 1
      })
    }
    if (that.data.second >= 60) {
      that.setData({
        second: 0,
        minute: that.data.minute + 1
      })
    }

    if (that.data.minute >= 60) {
      that.setData({
        minute: 0,
        hour: that.data.hour + 1
      })
    }
    that.setData({
      timecount: that.data.hour + ":" + that.data.minute + ":" + that.data.second
    })
  },

  //进入自习室
  onShow: function () {
    app.globalData.place = this.data.buildingName

    const _this = this
    _this.flushed();
    //定时器  函数赋值给timer  方便clearInterval（）使用
    _this.data.timer = setInterval(
      function () {
        _this.toClock1();
      }, 1000);

    _this.setData({
      timer: _this.data.timer
    });

  },

  //计时循环
  toClock1() {
    var that = this;
    console.log('计时开始');
    that.flushed();
  },

  //刷新函数
  flushed() {
    var that = this;
    getApp().getOpenId().then(res => {
      console.log('openid', res);
      this.data.openid = res
    })

    wx.cloud.callFunction({
      name: "placeCount",
      data: {
        place: this.data.buildingName
      }
    }).then(res => {
      console.log(res);
      console.log(res.result.data);
      for (let i = 0; i < res.result.data.length; i++) {
        let temp = 0;
        let id = 'string'
        try {
          temp = res.result.data[i].num;
          id = res.result.data[i].user_id;
        } catch (error) {
          temp = null; // num为空
          id = null; // id为空
        };

        console.log(temp);
        if (id != that.data.openid) { that.data.seatings[temp] = 3 }

      }

    })

    console.log(that.data.seatings)
    let seatings = that.data.seatings;
    this.setData({
      seatings
    })
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
      name: "toLeave",
      data: {

        num: getApp().globalData.number,

        place: this.data.buildingName
      }
    }).then(res => {
      console.log('退出自习室，位置为：', this.data.buildingName, getApp().globalData.number)
    })
  },


})