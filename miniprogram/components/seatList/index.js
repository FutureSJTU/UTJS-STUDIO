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
    selectedNum: 0
  },

  /**
   * Todo List
   */
  goTodoList: function(){
    wx.navigateTo({
      url: '../../list/index',
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selected(e) {
      let index = e.currentTarget.dataset.index;
      if (this.data.selectedIndex.indexOf(index) != -1) {
        let selectedIndex = this.remove(this.data.selectedIndex, index);
        let selectedNum = this.data.selectedNum - 1;
        this.setData({
          selectedIndex,
          selectedNum
        })
      } else {
        if (this.data.selectedNum < 1) {
          let selectedNum = this.data.selectedNum + 1;
          let selectedIndex = this.data.selectedIndex.concat(index);
          this.setData({
            selectedIndex,
            selectedNum
          })
        } else {
          wx.showToast({
            title: '最多选择一个座',
          })
        }
      }
    },
    remove(arr, ele) {
      var index = arr.indexOf(ele);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }
  }
})