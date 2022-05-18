//index.js
var app = getApp();

const {
    envList
} = require('../../../envList.js')

Page({
    data: {
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
        defaultst:[0, 1, 1, 0, 1, 1, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 0, 1, 1
            , 0, 0, 0, 0, 0, 0,
            0, 1, 1, 0, 1, 1
            , 0, 0, 0, 0, 0, 0,
            0, 1, 1, 0, 1, 1, 0
            , 0, 0, 0, 0, 0,
            0, 1, 1, 0, 1, 1

        ],
        buildingName: "中院",
        showUploadTip: false,
        timer: null,
        openid: String
    },

    //进入自习室
    onShow: function () {
        app.globalData.place = this.data.buildingName

        const _this = this
        _this.flushed();

        clearInterval(this.data.timer);//关闭此前存在的计时器
        _this.data.timer = setInterval(//定时器  函数赋值给timer  方便clearInterval（）使用
            function () {
                _this.toClock1();
            }, 20000);

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
        that.data.seatings = that.data.defaultst;
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

        setTimeout(()=>
        {
            
            let seatings = that.data.seatings;
            this.setData({
                seatings
            })
        }, 400)

        for(let i =0;i<20;i++){
        setTimeout(()=>
        {
            
            let seatings = that.data.seatings;
            this.setData({
                seatings
            })
        }, 1000)}
        console.log(that.data.seatings)
    },

    onUnload: function () {
        //关闭clearInterval定时函数
        clearInterval(this.data.timer);
        this.setData({
            timer: null
        });
        console.log('关闭clearInterval定时函数');

        // 离开自习室时云端同步学习时长
        this.seat = this.selectComponent('#seat');
        this.seat.updateTime();

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