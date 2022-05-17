// pages/demo1/demo1.js
const db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataObj:""
    },
    //按ID查找
    getData1(){
        db.collection("user").doc("8f75309d627a23990250e444047a83ea").get({
            success:res=>{
                console.log(res)
                this.setData({
                    dataObj:res.data
                })
            }
        })
        //collection里放表名，doc里只能放id
    
    },

    //查询指令,where里放对象  
    getData2(){
        
        db.collection("user").where({
            name:"张三"
        }).get()
        .then(res=>{
                console.log(res)
                this.setData({
                    dataObj:res.data
                })
            })
    },

    //插入数据
    addData(){
        wx.showLoading({
            title: '数据加载中…',
            mask:true
          })
        db.collection("user").add({
            data:{
                name:"王五",
                gender:"男"
            }
        })
        .then(res=>{
            console.log(res)
            wx.hideLoading({
              success: (res) => {},
            })
        })
    },

    //插入表单
    btnSub(res){
            var {title,gender}=res.detail.value;

            db.collection("user").add({
                data:{
                    name : title,
                    gender : gender
                }
            }).then(res=>{
                console.log(res)
            })
            
    },

    //用id更新一条，把update换成set则是覆盖该id的数据
    updateData(){
        db.collection("user").doc("0ab5303b627a5377028b6f7e26e6d12f").update({
            data:{
                name:"张三三"
            }
        }).then(res=>{
                console.log(res)
            })
        },

    //获取输入内容
    myIpt(res){
        var vlu=res.detail.value;
        myVlu=vlu
    },

    //删除一条记录
    delData(){
        db.collection("user")
        .doc("b69f67c0627a609601fddbf10202a56d")
        .remove()
        .then(res=>{
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