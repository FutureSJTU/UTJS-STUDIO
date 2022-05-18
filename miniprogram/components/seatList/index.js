var app = getApp();
var intt;

Component({
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     * @param {Array} seatings - 座位列表
     * @param {string} buildingName - 地标名称
     */
    properties: {
        seatings: Array,
        buildingName: String
    },

    /**
     * 组件的初始数据
     * 用于组件自定义初始数据
     */
    data: {
        // timer data
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        timecount: '00:00:00',
        // select data
        selectedIndex: [],
        openid: String,
        selectedNum: 0,
        place: "siyuan"
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // *********************** 计时部分开始 ***********************
        //开始
        start: function () {
            var that = this;
            //停止（暂停）
            clearInterval(intt);
            intt = setInterval(function () { that.timer() }, 50);
        },
        //暂停
        stop: function () {
            clearInterval(intt);
        },
        timer: function () {
            var that = this;
            // console.log(that.data.millisecond)
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
                timecount: (that.data.hour < 10 ? '0' + that.data.hour : that.data.hour) + ":" +
                    (that.data.minute < 10 ? '0' + that.data.minute : that.data.minute) + ":" +
                    (that.data.second < 10 ? '0' + that.data.second : that.data.second)
            })
        },
        // **************************** 计时部分结束 ****************************

        /**
         * Todo List
         */
        goTodoList: function () {
            wx.navigateTo({
                url: '../../list/index',
            })
        },

        //选座函数
        selected(e) {
            let index = e.currentTarget.dataset.index;
            let total = 0;
            let buildingName = getApp().globalData.place;
            app.globalData.number = index;
            console.log('当前位置：', app.globalData.number)
            console.log('place：', getApp().globalData.place)
            //调用云函数查询是否有人
            wx.cloud.callFunction({
                name: "isSelected",
                data: {
                    num: index,
                    place: buildingName
                }
            }).then(res => {
                total = res.result.total
                console.log('当前位置总人数：', total)
            })
            //console.log('当前位置总人数：',total)
            if (total > 0) {
                wx.showToast({
                    title: '这个位置有人',
                })
                return 0;
            }

            //自己是否已经选过这个位置
            else if (this.data.selectedIndex.indexOf(index) != -1) {
                let selectedIndex = this.remove(this.data.selectedIndex, index);
                let selectedNum = this.data.selectedNum - 1;
                wx.showToast({
                    title: '离开座位',
                })
                this.setData({
                    selectedIndex,
                    selectedNum
                })
                this.stop();
            }

            //正常选座
            else if (this.data.selectedNum < 1) {
                let selectedNum = this.data.selectedNum + 1;
                let selectedIndex = this.data.selectedIndex.concat(index);
                // 开始计时
                this.start();

                //上传选座数据到数据库
                getApp().getOpenId().then(res => {
                    console.log('openid', res);
                    this.data.openid = res
                })
                wx.cloud.callFunction({
                    name: "addStudyrecord",
                    data: {
                        name: this.data.openid,
                        num: index,

                        place: buildingName
                    }
                })
                    .then(res => {
                        console.log("选座：", res)
                    })
                wx.showToast({
                    title: '开始学习',
                })
                this.setData({
                    selectedIndex,
                    selectedNum
                })
                console.log(this.data.selectedIndex)
            }

            //自己已经选过座了
            else {
                wx.showToast({
                    title: '最多选择一个座',
                })
            }
        },

        //取消选座
        remove(arr, ele) {
            var index = arr.indexOf(ele);
            if (index > -1) {
                arr.splice(index, 1);
            }
            //   this.taskStop();

            wx.cloud.callFunction({
                name: "toLeave",

                data: {

                    num: getApp().globalData.number,

                    place: getApp().globalData.place
                }
            }).then(res => {
                console.log('离开位置：', getApp().globalData.place, getApp().globalData.number)
            })
            return arr;
        },

        chosen(e) {
            wx.showToast({
                title: '这个位置有人',
            })
        },

        updateTime: function () {
            var studyTime = 3600 * this.data.hour + 60 * this.data.minute + this.data.second;
            wx.cloud.callFunction({
                name: "updateStudytime",
                data: {
                    addsdt: studyTime
                }
            })
            console.log('云端同步增加学习时间: ' + studyTime);
        }
    }
})

// function updateTime() {
//     var studyTime = 3600 * this.data.hour + 60 * this.data.minute + this.data.second;

//     wx.cloud.callFunction({
//         name: "updateStudytime",
//         data: {
//             addsdt: studyTime
//         }
//     })
// }

// module.exports = {
//     updateTime: updateTime
// }