var app = getApp();
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
    selectedIndex: [],
    openid:String,
    selectedNum: 0,
    place:"siyuan"
  },
  
  
  /**
   * 组件的方法列表
   */
  methods: {
      /**
   * Todo List
   */
    goTodoList: function(){
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
    console.log('当前位置：',app.globalData.number)
    console.log('place：',getApp().globalData.place)
    //调用云函数查询是否有人
    wx.cloud.callFunction({
        name:"isSelected",
        data:{
            num:index,
            
            place:buildingName
        }
    }).then(res=>{
        total=res.result.total
        console.log('当前位置总人数：',total)
    })
    //console.log('当前位置总人数：',total)
      if(total > 0){wx.showToast({
        title: '这个位置有人',
      })
      return 0;
      } 

      //自己是否已经选过这个位置
      else if (this.data.selectedIndex.indexOf(index) != -1) {
        let selectedIndex = this.remove(this.data.selectedIndex, index);
        let selectedNum = this.data.selectedNum - 1;
        this.setData({
          selectedIndex,
          selectedNum
        })}

       //正常选座
       else if (this.data.selectedNum < 1) {
          let selectedNum = this.data.selectedNum + 1;
          let selectedIndex = this.data.selectedIndex.concat(index);
          
          //上传选座数据到数据库
        getApp().getOpenId().then(res => {
            console.log('openid', res);
            this.data.openid=res
        })
          wx.cloud.callFunction({
            name:"addStudyrecord",
            data:{
                name:this.data.openid,
                num:index,
                
                place:buildingName
            }
          })
          .then(res=>{
              console.log("选座：",res)
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
      
      wx.cloud.callFunction({
        name:"toLeave",

        data:{

            num:getApp().globalData.number,
 
            place:getApp().globalData.place
        }
        }).then(res=>{
            console.log('离开位置：',getApp().globalData.place,getApp().globalData.number)
        })
      return arr;
    }
  }
})