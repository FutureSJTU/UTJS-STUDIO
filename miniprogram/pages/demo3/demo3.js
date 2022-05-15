// pages/demo3/demo3.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    addStuRec(){
        wx.cloud.callFunction({
            name:"addStudyrecord",
            data:{
                name:"张三",
                row:1,
                column:3,
                place:"思源湖"
            }
        })
        .then(res=>{
            console.log(res)
        })
    },

    isSelec(){
        wx.cloud.callFunction({
            name:"isSelected",
            data:{
                row:1,
                column:3,
                place:"思源湖"
            }
        }).then(res=>{
            console.log(res)
        })
        
    },

    leave(){
        wx.cloud.callFunction({
        name:"toLeave",
        data:{
            row:1,
            column:3,
            place:"思源湖"
        }
        }).then(res=>{
            console.log(res)
        })
    },

    count(){
        wx.cloud.callFunction({
            name:"sscount",
            data:{
                 place:"思源湖"           
            }
        }).then(res=>{
                console.log(res)
            
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})