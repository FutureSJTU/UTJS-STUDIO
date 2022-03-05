Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        "pagePath": "/pages/studio/studio",
        "text": "自习",
        "iconPath": "/img/studio.png",
        "selectedIconPath": "/img/studio_select.png"
      },
      {
        "pagePath": "/pages/community/community",
        "text": "问答",
        "iconPath": "/img/community.png",
        "selectedIconPath": "/img/community_select.png"
      },
      {
        "pagePath": "/pages/share/share",
        "text": "分享",
        "iconPath": "/img/share.png",
        "selectedIconPath": "/img/share_select.png"
      },
      {
        "pagePath": "/pages/me/me",
        "text": "我的",
        "iconPath": "/img/me.png",
        "selectedIconPath": "/img/me_select.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})