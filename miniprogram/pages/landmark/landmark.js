// pages/landmark/landmark.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardCur: 0,
        zhutuNum: null,
        baotuNum: null,
        lituNum: null,
        zhongyuanNum: null,
        dongxiaNum: null,
        siyuanNum: null,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://s3.bmp.ovh/imgs/2022/03/278c8406b400279d.png'
        }, {
            id: 1,
            type: 'image',
            url: 'https://s3.bmp.ovh/imgs/2022/03/656fb158f41ae663.png',
        }, {
            id: 2,
            type: 'image',
            url: 'https://s3.bmp.ovh/imgs/2022/03/7cd0f47681aad3a2.png'
        }],
    },
    gotozhutu: function () {
        wx.navigateTo({
            url: '/pages/study/zhutu/zhutu',
        })
    },
    gotobaotu: function () {
        wx.navigateTo({
            url: '/pages/study/baotu/baotu',
        })
    },
    gotolitu: function () {
        wx.navigateTo({
            url: '/pages/study/litu/litu',
        })
    },
    gotozhongyuan: function () {
        wx.navigateTo({
            url: '/pages/study/zhongyuan/zhongyuan',
        })
    },
    gotodongxia: function () {
        wx.navigateTo({
            url: '/pages/study/dongxia/dongxia',
        })
    },
    gotosiyuan: function () {
        wx.navigateTo({
            url: '/pages/study/siyuan/siyuan',
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.towerSwiper('swiperList');
        
    },

    DotStyle(e) {
        this.setData({
            DotStyle: e.detail.value
        })
    },
    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
        let list = this.data[name];
        for (let i = 0; i < list.length; i++) {
            list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
            list[i].mLeft = i - parseInt(list.length / 2)
        }
        this.setData({
            swiperList: list
        })
    },
    // towerSwiper触摸开始
    towerStart(e) {
        this.setData({
            towerStart: e.touches[0].pageX
        })
    },
    // towerSwiper计算方向
    towerMove(e) {
        this.setData({
            direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
        })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
        let direction = this.data.direction;
        let list = this.data.swiperList;
        if (direction == 'right') {
            let mLeft = list[0].mLeft;
            let zIndex = list[0].zIndex;
            for (let i = 1; i < list.length; i++) {
                list[i - 1].mLeft = list[i].mLeft
                list[i - 1].zIndex = list[i].zIndex
            }
            list[list.length - 1].mLeft = mLeft;
            list[list.length - 1].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        } else {
            let mLeft = list[list.length - 1].mLeft;
            let zIndex = list[list.length - 1].zIndex;
            for (let i = list.length - 1; i > 0; i--) {
                list[i].mLeft = list[i - 1].mLeft
                list[i].zIndex = list[i - 1].zIndex
            }
            list[0].mLeft = mLeft;
            list[0].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})